# imos法
配列の長さを\\(N\\)とする．**imos法**により，区間更新を複数回行った後の，配列の各要素の値を得ることができる．操作の時間計算量は以下．
- 区間更新: \\(O(1)\\)
- 配列の各要素の値の取得\\(O(N)\\)

配列の各要素は**群**を成す集合の要素である必要がある．

## 説明
群における2項演算を仮に和として考える．

imos法でいう区間更新とは，配列のある区間の全要素に同じ値を足す操作のことである．これは，愚直に行うと\\(O(N)\\)かかってしまう．

imos法は，どの区間に何の値を足す必要があるかという情報を覚えておき，配列の要素を最後に取得する時に，それまでの区間更新をまとめて処理するという方法である．より具体的に説明すると，区間更新操作では，左から**累積和**(\\(O(N)\\))を取った時に，配列の各要素の値を得られるように値の更新を行う．

最後に左から累積和を取ることを前提として考えると，配列のある要素にある値を足すことは，その要素以降の全要素にその値を足すことを意味する．

|Index|0|1|2|3|4|5|6|7|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|クエリ1|-|\\(+1\\)|\\(+1\\)|\\(+1\\)|\\(+1\\)|\\(+1\\)|\\(+1\\)|\\(+1\\)|
|更新1|\\(0\\)|\\(+1\\)|\\(0\\)|\\(0\\)|\\(0\\)|\\(0\\)|\\(0\\)|\\(0\\)|
|**累積和**|\\(0\\)|\\(1\\)|\\(1\\)|\\(1\\)|\\(1\\)|\\(1\\)|\\(1\\)|\\(1\\)|

よって，例えばある区間に値\\(x\\)を足す場合，区間クエリの先頭に\\(x\\)を足し，終わりに\\(-x\\)を足すことで，最後に累積和を取った時にその区間の要素のみに\\(x\\)を足すことができる．

|Index|0|1|2|3|4|5|6|7|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|クエリ1|-|\\(+x\\)|\\(+x\\)|\\(+x\\)|\\(+x\\)|-|-|-|
|更新1|\\(0\\)|\\(+x\\)|\\(0\\)|\\(0\\)|\\(0\\)|\\(-x\\)|\\(0\\)|\\(0\\)|
|**累積和**|\\(0\\)|\\(x\\)|\\(x\\)|\\(x\\)|\\(x\\)|\\(0\\)|\\(0\\)|\\(0\\)|

区間更新が複数あっても操作は変わらない．

|Index|0|1|2|3|4|5|6|7|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|クエリ1|-|\\(+x\\)|\\(+x\\)|\\(+x\\)|\\(+x\\)|-|-|-|
|更新1|\\(0\\)|\\(+x\\)|\\(0\\)|\\(0\\)|\\(0\\)|\\(-x\\)|\\(0\\)|\\(0\\)|
|クエリ2|-|-|\\(+y\\)|\\(+y\\)|\\(+y\\)|\\(+y\\)|-|-|
|更新2|\\(0\\)|\\(+x\\)|\\(+y\\)|\\(0\\)|\\(0\\)|\\(-x\\)|\\(-y\\)|\\(0\\)|
|クエリ3|-|-|-|\\(+z\\)|\\(+z\\)|-|-|-|
|更新3|\\(0\\)|\\(+x\\)|\\(+y\\)|\\(+z\\)|\\(0\\)|\\(-x-z\\)|\\(-y\\)|\\(0\\)|
|**累積和**|\\(0\\)|\\(x\\)|\\(x+y\\)|\\(x+y+z\\)|\\(x+y+z\\)|\\(y\\)|\\(0\\)|\\(0\\)|

扱う代数系を群一般としてまとめると，区間\\([l, r))に値\\(x\\)を作用させる場合，配列の\\(l\\)番目に\\(x\\)を作用させ，\\(r\\)番目に\\(x\\)の逆元を作用させる．実際の値を得るには，左から累積値を取れば良い．

## コード
[![](https://img.shields.io/badge/verify-passing-brightgreen)](https://atcoder.jp/contests/abc183/submissions/29194550)

```cpp
template <class S, S (*op)(S, S), S (*e)(), S (*inv)(S)> struct Imos {
private:
  vector<S> v;
public:
  Imos(int size) { v.assign(size, e()); }
  void query(int l, int r, S x) { // [l, r)
    v[l] = op(v[l], x);
    v[r] = op(v[r], inv(x));
  }
  vector<S> get_values() {
    rep (i, 1, v.size()) v[i] = op(v[i-1], v[i]);
    return move(v);
  }
};
```