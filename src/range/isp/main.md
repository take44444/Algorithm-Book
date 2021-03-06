# 区間スケジューリング問題
**区間スケジューリング問題**とは以下のような問題である．

\\(N\\)個のタスクの集合が与えられる．各タスク\\(i\\)について開始時刻\\(s[i]\\)と終了時刻\\(f[i]\\)が定められている．任意の時刻において重複がないようにタスクを選ぶ場合，最大でいくつのタスクを選ぶことができるか．

この問題は，**貪欲法**により，\\(O(N \log N)\\)で解くことができる．

## 説明
**終了時刻の早いものから順に重複しない限り選ぶことを繰り返す**という貪欲法によってこの問題を解くことができる．

## 証明
この問題に対する解に含まれる集合を\\(OPT\\)とし，以降，\\(OPT\\)に含まれるタスクを終了時刻でソートして\\(OPT = \lbrace i\_1, i\_2, ..., i\_o \rbrace\\)と表現する．

また，貪欲法により選んだタスクの集合も同様に\\(G = \lbrace j\_1, j\_2, ..., j\_g \rbrace\\)と表現する．まず，

### 補題 1
$$\forall k \leq o: f[j\_k] \leq f[i\_k]$$

を数学的帰納法により示す．

### 補題1の証明
\\(k = 1\\)について，貪欲法が最も終了時刻の早いタスクを選択することから，\\(f[j\_1] \leq f[i\_1]\\)となることは自明である．

\\(k = m\\)について，\\(f[j\_m] \leq f[i\_m]\\)が成り立つと仮定する．ここで，\\(f[j\_m] \leq f[i\_m] \leq s[i\_{m+1}]\\)が成り立つ．仮に\\(f[i\_{m+1}] < f[j\_{m+1}]\\)なら，貪欲法で\\(i\_{m+1}\\)が選択されるため，\\(f[j\_{m+1}] \leq f[i\_{m+1}]\\)が成り立つ．

したがって，数学的帰納法より，補題1が示された．最後に，

### 定理
**上記貪欲法がこの問題に対する解である．**

を背理法により示す．

上記貪欲法で選択したタスクの集合が解でないと仮定する．

\\(G\\)に最後に追加されたタスク\\(j\_g\\)について，補題1より，

$$f[j\_g] \leq f[i\_g]$$

が成り立つ．ここで，仮定より\\(|G| < |OPT|\\)であるが，

$$f[j\_g] \leq f[i\_g] \leq s[i\_{g+1}]$$

となり，これは，貪欲法のアルゴリズムで最後にタスク\\(j\_g\\)を加えた後もタスク\\(i\_{g+1}\\)が残っていることを示しているが，上記貪欲法のアルゴリズムと矛盾する．

よって，背理法より，上記貪欲法で選択したタスクの集合がこの問題の解であることが示された．

## コード
[![](https://img.shields.io/badge/verify-passing-brightgreen)](https://atcoder.jp/contests/typical-algorithm/submissions/29212752)

```cpp
int interval_scheduling_problem(vector<pair<i64, i64>> &tasks) {
  sort(all(tasks), [](pair<i64, i64> &a, pair<i64, i64> &b) {
    return a.second < b.second;
  });
  int ret = 0;
  i64 now = 0;
  for (pair<i64, i64> &e: tasks) {
    if (e.first > now) {
      ret++;
      now = e.second;
    }
  }
  return ret;
}
```