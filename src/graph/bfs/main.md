# 単一始点最短パス(BFS)
自明だが，辺に重みがない場合の単一始点最短路(単一始点最短パス)は，BFSで求められる．全てのノードを1回ずつ訪れるので，計算量は\\(O(|V|)\\)

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
