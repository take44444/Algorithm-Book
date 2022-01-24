# splay木
splay木は平衡2分探索木の1つである．splay木の各操作と時間計算量は以下．
- 値(大小関係が定義されている必要がある)の挿入: 償却計算量\\(O(\log N)\\)
- 値の削除: 償却計算量\\(O(\log N)\\)
- 値の検索/取得: 償却計算量\\(O(\log N)\\)

償却計算量についてはこの章の後半で説明する．

## 平衡2分探索木
まず，splay木固有の話ではなく，**平衡2分探索木**の基本的な説明をする．

平衡2分探索木は，追加された値を各ノードとした**2分木**を形成する．また，形成された根付き木の，任意のノードについて以下の条件が成り立つようにする．

- 左の子を根とする部分木に含まれる値は全て親より小さい
- 右の子を根とする部分木に含まれる値は全ては親より大きい

平衡2分探索木で，扱う**値に大小関係が定義されている必要がある**理由は，このように大小関係に基づいて内部の木を形成するからである．では，例えば，値10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150が追加された場合，平衡2分探索木はどのようになるだろうか．

実は，**形成される木は複数あり得る**．例えば，左下のように**偏りがない**綺麗な2分木になることもあれば，右下のような木もちゃんと条件を満たしている．

```mermaid
%%{init: {"flowchart" : { "curve" : "basis" } } }%%
graph TD
80((80)) --- 40((40))
80 --- 120((120))
40 --- 20((20))
40 --- 60((60))
120 --- 100((100))
120 --- 140((140))
20 --- 10((10))
20 --- 30((30))
60 --- 50((50))
60 --- 70((70))
100 --- 90((90))
100 --- 110((110))
140 --- 130((130))
140 --- 150((150))

14000((140)) --- 12000((120))
14000 --- 15000((150))
12000 --- 10000((100))
12000 --- 13000((130))
10000 --- 8000((80))
10000 --- 11000((110))
8000 --- 2000((20))
8000 --- 9000((90))
2000 --- 1000((10))
2000 --- 6000((60))
6000 --- 4000((40))
6000 --- 7000((70))
4000 --- 3000((30))
4000 --- 5000((50))
```

ページが大きくなるので描かないが，もちろん，最も小さい値から，昇順に右の子に次の値が来るような1本道の木も条件を満たしている．では，このように大小関係に基づいて木を形成すると何が嬉しいかというと，値を検索する際，根ノードから始めて，**今見ているノードより探索しているノードが大きいか小さいかで左の子と右の子に降りるかを選択**して降りるというのを続けるだけで必ず目的のノードにたどり着くことができるということである．

では，ここで木の形について触れる．**偏った木**と，**偏りがない木**と，どちらが嬉しいだろうか．偏りがあるということは，その分，深さが深いノードが存在するということ．探索するノードの深さが深いほど，探索する時間は増えてしまう．よって，偏りがない木ほどより嬉しい．そのため，平衡2分探索木には，形成する2分木をなるべく**平衡**に保つという機能があるのである．より平衡になると，木の高さが，扱っているデータ数を\\(N\\)として\\(O(\log N)\\)になるため，各種操作の計算量が全て\\(O(\log N)\\)になるというわけだ．

ここでもう1つ触れておきたいのは，平衡2分探索木における`lower_bound`，および`upper_bound`という操作について．`lower_bound`は，指定した値**以上**の最小の値を探索するというもので，`upper_bound`は，指定した値**より大きい**最小の値を探索するというもの．これらの操作の実装は，2分探索木で共通していて，AVL木であってもsplay木であってもその他であっても基本的には同じである．それぞれ，下のようなコードで目的のノードを探索することができる．

```cpp
Node* bound(T k, bool lower) {
  Node *left = root, *right = nullptr;
  while (left) {
    if ((lower && !(k > left->k)) || (!lower && (k < left->k))) {
      right = left;
      left = left->l;
    } else left = left->r;
  }
  return right;
}
```

// TODO : このコードの説明を追記予定

**値の挿入でも検索でも削除でも，内部で`lower_bound`を実行することで目的のノードを探索する**ため，これは平衡2分探索木の**最も基本的かつ重要な操作**と言える．`lower_bound`の計算量は，<br>\\(O(\\)探索しているノードが存在する深さ\\()\\)である．平衡2分探索木の全ての操作の計算量は`lower_bound`の計算量になると考えてよい．

## splay木
splay木では，値の検索，削除など全ての操作の中で**splay**という特殊な操作を行う．上で，平衡2分探索木の各操作は内部で全て`lower_bound`を行うと述べた．**splay操作は，`lower_bound`の計算量を\\(O(\log N)\\)に保証するための操作**であると考えるとわかりやすい．**splay木では，全ての操作の計算量はsplay操作の計算量となる**．

上で，`lower/upper_bound`については既に説明したので，検索，削除等の細かい実装については説明しない(このページの1番下に載せたコードを参照して欲しい)．というわけで，ここからは，**splay**操作について説明する．

## splay操作
splay操作は，簡単に言うと，**あるノードを根にする**という操作である．splay木では，アクセスしたノードをsplayして根に持っていくということをする．何のためにするかというと，`lower_bound`の計算量を抑えるためである．まずは，splayをするとなぜ計算量が抑えられるのかということは説明せずに，単にsplay操作とは何かを説明する．

splay操作は，**zig**，**zig-zag**，**zig-zig**の3つの操作によってノードを根まで持っていく操作である．

### zig
zigは，**splayしたいノードの親が根ノードである時**に行われる操作である．

```mermaid
%%{init: {"flowchart" : { "curve" : "basis" } } }%%
graph TD
P((Par)):::p --- S((Spl)):::splay
P --- C(部分木C)
S --- A(部分木A)
S --- B(部分木B)

classDef p stroke-width:4px,stroke:green;
classDef splay stroke-width:4px,stroke:slateblue;
```

上のような木を下のように変形する．変形した後も，平衡2分探索木の大小関係の条件をちゃんと満たしている．

```mermaid
%%{init: {"flowchart" : { "curve" : "basis" } } }%%
graph TD
SS((Spl)):::splay --- AA(部分木A)
SS --- PP((Par)):::p
PP --- BB(部分木B)
PP --- CC(部分木C)

classDef p stroke-width:4px,stroke:green;
classDef splay stroke-width:4px,stroke:slateblue;
```

この例は，splayしたいノードが根ノードの左の子である場合のzigだが，右の子である場合も左右対称の同様の操作になる．

### zig-zag

zig-zagは，**splayしたいノードと親ノードの関係が，親ノードと親の親ノードの関係と逆の時**に行われる操作である．**これは実質，splayしたいノードに対してzigを2回行うことと同じである**．なのになぜzigと区別してここに示しているかは，後半の計算量解析の時にわかるので今は考えなくてよい．

```mermaid
%%{init: {"flowchart" : { "curve" : "basis" } } }%%
graph TD
G((GPar)):::p --- P((Par)):::p
G --- D(部分木D)
P --- A(部分木A)
P --- S((Spl)):::splay
S --- B(部分木B)
S --- C(部分木C)

classDef p stroke-width:4px,stroke:green;
classDef splay stroke-width:4px,stroke:slateblue;
```

上のような木を下のように変形する．

```mermaid
%%{init: {"flowchart" : { "curve" : "basis" } } }%%
graph TD
SS((Spl)):::splay --- PP((Par)):::p
SS --- GG((GPar)):::p
PP --- AA(部分木A)
PP --- BB(部分木B)
GG --- CC(部分木C)
GG --- DD(部分木D)

classDef p stroke-width:4px,stroke:green;
classDef splay stroke-width:4px,stroke:slateblue;
```

この例は，splayしたいノードは右の子であり親ノードは左の子であるが，逆の，splayしたいノードが左の子で，親ノードが右の子である場合も左右対称の同様の操作になる．

### zig-zig

zig-aigは，**splayしたいノードと親ノードの関係が，親ノードと親の親ノードの関係と同じ時**に行われる操作である．**これは実質，親ノードに対してzigを1回行った後にsplayしたいノードにzigを1回行うことと同じである**．

```mermaid
%%{init: {"flowchart" : { "curve" : "basis" } } }%%
graph TD
G((GPar)):::p --- P((Par)):::p
G --- D(部分木D)
P --- S((Spl)):::splay
P --- C(部分木C)
S --- A(部分木A)
S --- B(部分木B)

classDef p stroke-width:4px,stroke:green;
classDef splay stroke-width:4px,stroke:slateblue;
```

上のような木を下のように変形する．

```mermaid
%%{init: {"flowchart" : { "curve" : "basis" } } }%%
graph TD
SS((Spl)):::splay --- AA(部分木A)
SS --- PP((Par)):::p
PP --- BB(部分木B)
PP --- GG((GPar)):::p
GG --- CC(部分木C)
GG --- DD(部分木D)

classDef p stroke-width:4px,stroke:green;
classDef splay stroke-width:4px,stroke:slateblue;
```

この例は，splayしたいノードは左の子であり親ノードも左の子であるが，逆の，splayしたいノードが右の子で，親ノードも右の子である場合も左右対称の同様の操作になる．

splay操作は，splayしたいノードとその親ノード，親の親ノードとの関係から，zig，zig-zag，zig-zigの内適切なものを選んで木を変形することを繰り返して，そのノードを根まで持っていく操作である．

## splay操作の計算量と各操作の計算量との関係
話の流れを切らさないために結論から述べると，splay操作の**償却計算量**は\\(O(\log N)\\)である．償却計算量についてはこの後に説明するが，簡単に言うと，**一連の操作を行なった時，その1回あたりの計算量の平均を取ると\\(O(\log N)\\)になるということが保証される**ということである．もっと噛み砕いて言うと，バランスの取れていない木で深さの深いノードをsplayすると，それはその操作単体で見ると時間がかかっているかもしれない．しかし，**連続して**何回もsplay操作を行なった時，**全体の計算量が，splay操作回数を\\(k\\)として\\(O(k \log N)\\)になることを保証できる**ということ．これが償却計算量の意味である．splay操作の償却計算量がなぜ\\(O(\log N)\\)になるかはひとまず置いといて，もしそうなるとしたら何が嬉しいのかを考えよう．

冒頭で，**splay操作は，`lower_bound`の計算量を\\(O(\log N)\\)に保証するための操作**であると述べた．`lower_bound`の計算量は，<br>\\(O(\\)探索しているノードが存在する深さ\\()\\)<br>であった．ではsplay操作はどうだろうか．zig1回の操作でそのノードが1つ上に上がり，zig-zagやzig-zigのようにzigを2回行う操作でそのノードが2つ上がるため，**splay操作の計算量は<br>\\(O(\\)splayしたいノードが存在する深さ\\()\\)**<br>である．splayするノードと，探索したノードが等しければ，これらは当然同じである．つまり，**`lower_bound`でアクセスしたノードをsplayする**ことで，**`lower_bound`の計算量をsplay操作の計算量で保証することができるのである**．

## splay操作の償却計算量

// TODO : 後日加筆

## 実装におけるその他の注意事項
- `lower_bound`でアクセスしたノードをsplayするのを忘れてはいけない．それを**splayするから\\(O(\log N)\\)になるのであって，余分な操作と思ってsplayを省略すると，計算量がおかしくなる**．
- `lower_bound`以外の方法で，\\(O(1)\\)以外の方法でノードにアクセスする際は，それが`lower_bound`と同等のアクセス方法かをよく考えること．また，その後のsplay操作も忘れないこと．

以上！

## コード

```cpp
template <class T> struct Node {
  Node<T> *l, *r, *p;
  T k;
  Node(T k_) : l(nullptr), r(nullptr), p(nullptr), k(k_) {}
  int state() {
    if (p && p->l == this) return -1;
    if (p && p->r == this) return 1;
    return 0;
  }
  void rotate() {
    Node<T> *par = p;
    Node<T> *mid;
    if (p->l == this) {
      mid = r; r = par;
      par->l = mid;
    } else {
      mid = l; l = par;
      par->r = mid;
    }
    if (mid) mid->p = par;
    p = par->p; par->p = this;
    if (p && p->l == par) p->l = this;
    if (p && p->r == par) p->r = this;
  }
  void splay() {
    while(state()) {
      int st = state() * p->state();
      if (st == 0) {
        rotate();
      } else if (st == 1) {
        p->rotate();
        rotate();
      } else {
        rotate();
        rotate();
      }
    }
  }
};

template <class T> struct SplayTree {
private:
  using NC = Node<T>;
  NC *root, *min_, *max_;
  int sz;
  void splay(NC *node) { node->splay(), root = node; }
  NC* bound(T k, bool lower) {
    NC *valid = nullptr, *left = root, *right = nullptr;
    while (left) {
      valid = left;
      if ((lower && !(k > left->k)) || (!lower && (k < left->k))) {
        right = left;
        left = left->l;
      } else left = left->r;
    }
    if (!right && valid) splay(valid);
    return right;
  }
public:
  SplayTree() : root(nullptr), min_(nullptr), max_(nullptr), sz(0) {}
  int size() { return sz; }
  NC *begin() { return min_; }
  NC *rbegin() { return max_; }
  NC* lower_bound(T k) {
    NC *ret = bound(k, true);
    if (ret) splay(ret);
    return ret;
  }
  NC* upper_bound(T k) {
    NC *ret = bound(k, false);
    if (ret) splay(ret);
    return ret;
  }
  NC* entry(T k) {
    lower_bound(k);
    if (!root || root->k != k) return nullptr;
    return root;
  }
  pair<NC*, bool> insert(T k) {
    NC *nn = new NC(k);
    if (!root) { // if no nodes in tree
      min_ = nn, max_ = nn, root = nn;
    } else if (min_->k > k) { // if k become min k in tree
      min_->l = nn, nn->p = min_, min_ = nn;
      splay(nn);
    } else if (max_->k < k) { // if k become max k in tree
      max_->r = nn, nn->p = max_, max_ = nn;
      splay(nn);
    } else {
      NC *node = bound(k, true); // assert node is not null
      if (node->k == k) { // if tree already has k k
        splay(node); delete nn; return {root, false};
      }
      // now node is first node whose k is larger than k
      nn->l = node->l; node->l = nn;
      nn->p = node; if (nn->l) nn->l->p = nn;
      splay(nn);
    }
    sz++; return {root, true};
  }
  void erase(NC *node) {
    assert(node); splay(node); sz--;
    if (!root->l) { // it means this node is min_
      // if no nodes remain
      if (!root->r) root = nullptr, min_ = nullptr, max_ = nullptr;
      else {
        root = root->r; root->p = nullptr;
        for (min_ = root; min_->l; min_ = min_->l);
        splay(min_);
      }
    } else if (!root->r) {
      root = root->l; root->p = nullptr;
      for (max_ = root; max_->r; max_ = max_->r);
      splay(max_);
    } else {
      root->l->p = nullptr; // cut left tree
      NC *nx_root = root->l; // next root
      for (;nx_root->r; nx_root = nx_root->r);
      splay(nx_root);
      // now nx_root doesn't have right child
      nx_root->r = node->r; nx_root->r->p = nx_root;
      root->p = nullptr;
    }
    delete node;
  }
  bool erase(T k) {
    if (!entry(k)) return false;
    erase(root);
    return true;
  }
};
```