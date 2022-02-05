# 単一始点最短パス(BFS)
全ての辺の重みが\\(1\\)の場合の単一始点最短路(**単一始点最短パス**)は，BFSで\\(O(|V|)\\)で求められる．

## 説明
単一始点最短パスを**Dijkstra法**で求めることを考える．Dijkstra法では，始点からの最短路長が小さいノードから順に最短路が求まっていった．**全ての辺の重みが\\(1\\)の場合，最短路長が小さい順というのはすなわち，始点からBFSをした時に訪れる順番である**ため，単に始点からBFSをすることで単一始点最短パスを求めることができる．BFSで全てのノードを1回ずつ訪れるので，計算量は\\(O(|V|)\\)．

## コード
[![](https://img.shields.io/badge/verify-passing-brightgreen)](https://onlinejudge.u-aizu.ac.jp/solutions/problem/ALDS1_11_C/review/6237791/Coordinator/C++17)

```cpp
vector<int> bfs(int node, int n, vector<vector<int>> &g) {
  queue<pair<int, int>> q;
  vector<bool> visited(n, false);
  vector<int> ret(n, -1);

  visited[node] = true;
  q.push({node, 0});
  while (q.size()) {
    pair<int, int> v = q.front();
    q.pop();
    ret[v.first] = v.second;
    for (int &e: g[v.first]) {
      if (visited[e]) continue;
      visited[e] = true;
      q.push({e, v.second+1});
    }
  }
  return move(ret);
}
```
