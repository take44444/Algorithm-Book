# 単一始点最短路(Dijkstra法)
重みが全て\\(0\\)以上である任意の重み付きグラフ\\(G\\)における**単一始点最短路**は，**Dijkstra法**によって\\(O(E \log V)\\)で求めることができる．

単一始点最短路とは，あるノード\\(s \in G\\)から，\\(G\\)に含まれる任意のノードまでの最短路である．以降始点を\\(s\\)と呼ぶ．

## 説明
Dijkstra法の説明と正当性の証明を同時にするような形で説明を書く．

以下の説明では，あるノード\\(i\\)について，\\(s\\)から\\(i\\)までの最短路長を\\(d\_{s→i}\\)と表記する．また，あるノード\\(i\\)から出てあるノード\\(j\\)に入る(有向)辺の重みを\\(e\_{i→j}\\)と表記する．

Dijkstra法では，\\(s\\)からの最短路を，最短路長が小さいノードから順に求めていく．つまり，**任意の時点で，最短路が求まっているノードの集合を\\(X\\)，最短路が求まっていないノードの集合を\\(Y\\)とすると，\\(s\\)から，\\(Y\\)に含まれる任意のノードへの最短路長は，\\(s\\)から，\\(X\\)に含まれる任意のノードへの最短路長以上であることが成り立つ**．明らかに\\(d\_{s→s} = 0\\)であるため，初期状態では，\\(X = {s}\\)である．

全ての辺の重みが\\(0\\)以上であるため，\\(Y\\)に含まれるノードの中で最も\\(s\\)からの最短路長が小さいノードへの最短路は，(そのノード自身と)\\(X\\)に含まれるノードのみから構成される．ここで，

$$min\_{x \in X}(d\_{s→x} + min\_{y \in Y}(e\_{x→y}))$$

が最小値を取るような\\(x \in X, y \in Y\\)のペアについて，以下の式が成り立つ．

$$d\_{s→y} = d\_{s→x} + e\_{x→y}$$

また，明らかに

$$d\_{s→y} \leq min\_{p \in Y \backslash \lbrace y \rbrace}(d\_{s→p})$$

が成り立つため，この\\(y\\)を\\(X\\)に含めることができる．

これを\\(Y\\)が空になるまで繰り返すことで，\\(s\\)を始点とする単一始点最短路を求めることができる．

## 実装
普通のキューの代わりに**プライオリティキュー**を用いたBFSをすることで求められる．計算量は，取り出しに\\(O(\log V)\\)かかるキューを用いていることから，\\(O(E \log V)\\)となる．

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