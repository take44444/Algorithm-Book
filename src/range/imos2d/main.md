# 2次元imos法
imos法は，高次元に拡張することができる．ここでは，**2次元imos法**を説明する．2次元配列の横の長さを\\(W\\)，縦の長さを\\(H\\)とする．

- 矩形範囲更新: \\(O(1)\\)
- 2次元配列上の各要素の値の取得\\(O(HW)\\)

2次元配列の各要素は**可換群**を成す集合の要素である必要がある．

## 説明
考え方は1次元のimos法と同じである．2次元imos法では，\\((l\_x, l\_y)\\)を左上の座標，\\((r\_x, r\_y)\\)を右下とするような矩形(\\((l\_x, l\_y)\\)は矩形内，\\((r\_x, r\_y)\\)は矩形外の座標)に値\\(x\\)を作用させる場合，\\(l\_x, l\_y\\)に\\(x\\)を，\\(r\_x, l\_y\\)に\\(x^{-1}\\)を，\\(l\_x, r\_y\\)に\\(x^{-1}\\)を，\\(r\_x, r\_y\\)に\\(x\\)を作用させる．実際の値を得るには，各行ごとに左から累積値を取った後に，各列ごとに上から累積値を取れば良い．

## コード
[![](https://img.shields.io/badge/verify-passing-brightgreen)](https://atcoder.jp/contests/typical90/submissions/29194902)

```cpp
template <class S, S (*op)(S, S), S (*e)(), S (*inv)(S)> struct Imos2D {
private:
  vector<vector<S>> v;
public:
  Imos2D(int h, int w) { v.assign(h+1, vector<S>(w+1, e())); }
  void query(int lx, int ly, int rx, int ry, S x) { // [(lx, ly), (rx, ry))
    v[lx][ly] = op(v[lx][ly], x);
    v[rx][ly] = op(v[rx][ly], inv(x));
    v[lx][ry] = op(v[lx][ry], inv(x));
    v[rx][ry] = op(v[rx][ry], x);
  }
  vector<vector<S>> get_values() {
    for (vector<S> &vv: v) rep (i, 1, vv.size())
      vv[i] = op(vv[i-1], vv[i]);
    rep (j, v[0].size()) rep (i, 1, v.size())
      v[i][j] = op(v[i-1][j], v[i][j]);
    return move(v);
  }
};
```