# 巡回セールスマン問題

\\(N\\)個のノード\\(1, 2, ..., N\\)を持つ重み付き有向グラフ\\(G(V, E)\\)について，ノード\\(1\\)から出発し，各ノードをちょうど1度ずつ通りノード\\(1\\)へ戻る閉路の中で最短の経路の距離を求めよ．

この問題はNP困難というクラスに属する有名な問題で，多項式時間で解くアルゴリズムが存在しないとされている．bitDPというアルゴリズムを使うと，\\(O(|V|^22^{|V|})\\)で解くことができる．

具体的には以下の漸化式が成立する．

$$
dp[\mathbb{S}][v] = min_{u \in (\mathbb{S}\backslash \lbrace v \rbrace)}(dp[S\backslash \lbrace v \rbrace][u] + dist[u][v])
$$

自然言語でいうなら，「今まで訪れたノードの集合が\\(\mathbb{S}\\)で最後に訪れたノードが\\(v\\)になるような最短経路は，今までノードの集合が\\(\mathbb{S}\backslash \lbrace v \rbrace\\)で最後に訪れたノードが\\(\mathbb{S}\backslash \lbrace v \rbrace\\)に含まれるいずれかのノードであるような最短経路にそのノードから\\(v\\)への距離を足した値の最小値」．

この訪れたノードの集合をbitで持つ．この集合の状態数は\\(2^|V|\\)となり，最後に訪れたノードの状態数は\\(|V|\\)である．各状態から，次に通る都市を\\(|V|\\)通り探索するので，全体の計算量は\\(O(|V|^22^{|V|})\\)となる．

## コード
[![](https://img.shields.io/badge/verify-passing-brightgreen)](https://atcoder.jp/contests/typical-algorithm/submissions/28659236)

```cpp
i64 tsp(int n, vector<vector<int>> &dist) {
  vector<vector<i64>> dp(1<<n, vector(n, inf));
  dp[0][0] = 0;
  rep (bit, 1<<n) {
    rep (u, n) {
      if (!((bit >> u)&1) and bit + u != 0) continue;
      rep (v, n) {
        if ((bit >> v)&1) continue;
        chmin(dp[bit|(1<<v)][v], dp[bit][u] + dist[u][v]);
      }
    }
  }
  return dp[(1<<n)-1][0];
}
```
