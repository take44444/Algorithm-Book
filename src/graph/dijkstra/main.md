# 単一始点最短路（Dijkstra法）
重みが全て\\(0\\)以上である任意の重み付きグラフ\\(G\\)における**単一始点最短路**は，**Dijkstra法**によって\\(O(|E| \log |V|)\\)で求めることができる．

単一始点最短路とは，あるノード\\(s \in G\\)から，\\(G\\)に含まれる任意のノードまでの最短路である．以降始点を\\(s\\)と呼ぶ．

## 説明
以下では，あるノード\\(i\\)について，\\(s\\)から\\(i\\)までの最短路長を\\(d\_{s→i}\\)とする．また，あるノード\\(i\\)から出てあるノード\\(j\\)に入る(有向)辺の重みを\\(e\_{i→j}\\)とする．

前提条件から全ての辺の重みが\\(0\\)以上であるため，\\(s\\)から到達可能な任意の\\(y\\)について以下の式が成り立つ．

$$d\_{s→y} = min(d\_{s→x} + e\_{x→y}) \quad ただし \quad d_{s→x} \geq d\_{s→y} \quad とする．$$

よって，\\(d\_{s→y}\\)を小さい方から求めていくことで\\(s\\)を始点とする単一始点最短路を求めることができる．

# 単一終点最短路
\\(G\\)に含まれる辺の向きを全て逆向きにしたグラフを\\(\hat{G}\\)とし，\\(i \in G\\)に対応する\\(\hat{G}\\)のノードを\\(\hat{i}\\)と表す．

任意のノードについて\\(s\\)を終点とする最短路を求めるには，\\(\hat{G}\\)について\\(\hat{s}\\)を始点とした最短路を求めればよい．

## 説明
以下では，あるノード\\(i\\)について，\\(i\\)から\\(s\\)までの全経路の集合を\\(P\_{i→s}\\)と表す．

任意のノード\\(x \in G\\)について，\\(P\_{x→s}\\)の辺の向きを全て逆向きにした経路の集合は\\(P\_{\hat{s}→\hat{x}}\\)と明らかに等しいため，\\(s\\)を終点とする最短路を求めることは\\(\hat{s}\\)を始点とする最短路を求めることと同義である．

## 実装
**プライオリティキュー**を用いて，路長優先探索（造語）をすることで求められる．計算量は，取り出しに\\(O(\log |V|)\\)かかるキューを用いていることから，\\(O(|E| \log |V|)\\)となる．

## コード

[![](https://img.shields.io/badge/verify-passing-brightgreen)](https://judge.yosupo.jp/submission/77112)

```cpp
pair<vector<i64>, vector<int>> dijkstra(int s, i64 n, Graph &g) {
  vector<int> prev(n, -1);
  vector<i64> d(n, inf);
  d[s] = 0;
  priority_queue<pair<i64, int>, vector<pair<i64, int>>, greater<pair<i64, int>>> que;
  que.push({0, s});
  while (!que.empty()) {
    pair<i64, i64> p = que.top();que.pop();
    int v = p.second;
    if (d[v] < p.first) continue;
    for (Edge &e: g[v]) {
      if (d[e.to] > d[v] + e.cost) {
        d[e.to] = d[v] + e.cost;
        prev[e.to] = v;
        que.push({d[e.to], e.to});
      }
    }
  }
  return {d, prev};
}

// 経路復元
vector<pair<int, int>> get_path(int t, vector<int> &prev) {
  vector<pair<int, int>> path;
  for (; prev[t] != -1; t = prev[t]) path.push_back({prev[t], t});
  reverse(all(path));
  return move(path);
}
```