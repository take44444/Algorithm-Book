# 重複あり区間スケジューリング問題
**区間スケジューリング問題**の一般化として，以下のような問題を考える．

\\(N\\)個のタスクの集合が与えられる．各タスク\\(i\\)について開始時刻\\(s[i]\\)と終了時刻\\(f[i]\\)が定められている．任意の時刻において**重複が\\(K\\)以下になるように**タスクを選ぶ場合，最大でいくつのタスクを選ぶことができるか．

区間スケジューリング問題は，これの\\(K=1\\)のケースだが，\\(K=1\\)ではない場合でも解くことができるように，一般化して考える．

この問題は，**貪欲法**により，\\(O(N \log N)\\)で解くことができる．

## 説明
この問題は，**全タスクの集合を\\(K\\)個の集合に分割し，それぞれの集合ごとに独立に\\(K=1\\)の区間スケジューリング問題を解く**というように言い換えることができる．しかし，分割方法は\\(O(K^N)\\)通りあり，全探索することはできないので，**次のタスクをどの集合に割り当てるかを考えながら\\(K\\)個の区間スケジューリング問題を同時に解く**ことを考える．

つまり，**\\(K\\)個の終了時刻を管理しながら，次のタスクをどの集合に割り当てるかを選び，選んだものの貪欲法を進めればよい**．しかしここで，そのタスクを選ぶことができる状態にあるものが複数ある場合は，どれに割り当てるのが最適かを考える必要があるが，明らかに，**終了時刻が最も遅いものを選ぶのが最適**である(証明省略)．したがって，\\(K\\)個の重複を許す区間スケジューリングもまた，貪欲法で解くことが可能である．

計算量は，まず最初に，タスクを終了時刻でソートするのに\\(O(N \log N)\\)かかる．次に，貪欲法では，**\\(K\\)個の終了時刻の内，次のタスクの開始時刻より小さいものの中で最大のものを選ぶ**ことを\\(N\\)回繰り返すので，**multiset(平衡2分探索木)** 等を使って\\(O(N \log K)\\)かかる．よって，最終的な計算量は\\(O(N (\log N + \log K))\\)だが，問題文から\\(K \leq N\\)としてよいので\\(O(N \log N)\\)となる．

## コード
[![](https://img.shields.io/badge/verify-passing-brightgreen)](https://yukicoder.me/submissions/738874)

```cpp
int overlapping_interval_scheduling_problem(vector<pair<i64, i64>> &tasks, int k) {
  sort(all(tasks), [](pair<i64, i64> &a, pair<i64, i64> &b) {
    return a.second < b.second;
  });
  multiset<i64> now;
  rep (k) now.insert(0);
  int ret = 0;
  for (pair<i64, i64> &e: tasks) {
    auto itr = now.lower_bound(e.first);
    if (itr != now.begin()) {
      itr--;
      ret++;
      now.erase(itr);
      now.insert(e.second);
    }
  }
  return ret;
}
```