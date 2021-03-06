# 直径
2ノード間距離のうち最大のものを，そのグラフの直径という．ここでいう距離は，辺の重みは考慮しない．

木の直径は，2回のDFSで求めることができる．具体的には，任意のノードについて，最も遠いノードを求め，そのノードからまた最も遠いノードを求めると，後者の距離が木の直径である．以下に証明を示す．

## 証明

任意に選択したノード\\(r\\)から最も遠いノード\\(x\\)は直径の端点にならないと仮定する．直径(複数ありうる)の端点の集合を\\(\mathbb{E}\\)とする．\\(r\\)->\\(x\\)パスが直径と最初に交わる点が存在すればそれを\\(h\\)とする．
1. \\(h\\)が存在する時

\\(r\\)->\\(h\\)->\\(x\\)となるパスが存在する．この時，\\(h\\)は直径上にあるので，\\(h\\)から最も遠いノードは\\(\mathbb{E}\\)に属するノードである．ここで，\\(r\\)から最も遠いノードは\\(x\\)なので\\(x\\)は\\(\mathbb{E}\\)に属する．これは\\(x\\)が直径の端点にならないことに⽭盾する．

2. \\(h\\)が存在しない時

以下の式から，\\(x\\)を端点とする直径を構成することができるため，\\(x\\)が直径の端点にならないことに⽭盾する．

\\(dist(r, x) \geq dist(r, h) + max_{u \in \mathbb{E}}(dist(h, u))\\)

よって\\(dist(h, x) \geq + max_{u \in \mathbb{E}}(dist(h, u))\\) 

以上から，背理法より，任意に選択したノード\\(r\\)から最も遠いノード\\(x\\)は直径の端点になる．したがって，任意のノードについて，最も遠いノードを求め，そのノードのから最も遠いノードまでの距離が直径となる．

## コード
[![](https://img.shields.io/badge/verify-passing-brightgreen)](https://atcoder.jp/contests/typical90/submissions/28658034)

```cpp
pair<int, int> dfs(int node, int parent, vector<vector<int>> &g) {
  pair<int, int> ret = {0, node};
  for (int &e: g[node]) {
    if (e == parent) continue;
    pair<int, int> tmp = dfs(e, node, g);
    tmp.first++;
    chmax(ret, tmp);
  }
  return move(ret);
}

int diameter(vector<vector<int>> &g) {
  pair<int, int> d = dfs(0, -1, g);
  d = dfs(d.second, -1, g);
  return d.first;
}
```
