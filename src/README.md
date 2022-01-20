# はじめに
このドキュメントは，主に競技プログラミングで出題される問題を解く際に利用できるアルゴリズムやデータ構造をまとめたものです．特定の問題にはあまりフォーカスしないため，問題を解く際の考察の仕方等の内容はありません．**詳しく，正確に，分かりやすく**書いていこうと思っています．

このドキュメントは**執筆途中**です．

## 想定する読者
C++を用いたプログラミングに慣れている方を読者として想定しており，C++言語の仕様や，文法にはあまり触れません．また，計算量という用語についても説明しなません．ただし，償却計算量など，計算量の見積もりが複雑なものについては必要に応じて説明します．

## コードについて
このドキュメントで登場するコードは，可読性向上のため，以下のようなコードがファイルの先頭に記述してあることを前提としています．また，適切な問題を用いてコードの検証がなされている場合は，コード周辺に[![](https://img.shields.io/badge/verify-passing-brightgreen)]()のように，検証に用いた問題の提出ページへのリンクを表示します．
```cpp
#include <bits/stdc++.h>
#include <atcoder/all>
using namespace std;
using namespace atcoder;
#define i64 int64_t
#define f64 double
const i64 inf = 1e18;
const int dx[] = {0, 1, 0, -1, 1, 1, -1, -1};
const int dy[] = {1, 0, -1, 0, 1, -1, 1, -1};
#define all(a) a.begin(),a.end()
#define overload(_1,_2,_3,_4,name,...) name
#define _rep1(n) for(int i = 0; i < (n); i++)
#define _rep2(i,n) for(int i = 0; i < (n); i++)
#define _rep3(i,a,b) for(int i = (a); i < (b); i++)
#define _rep4(i,a,b,c) for(int i = (a); i < (b); i += (c))
#define rep(...) overload(__VA_ARGS__,_rep4,_rep3,_rep2,_rep1)(__VA_ARGS__)
#define _rrep1(n) for(int i = (n) - 1; i >= 0; i--)
#define _rrep2(i,n) for(int i = (n) - 1; i >= 0; i--)
#define _rrep3(i,a,b) for(int i = (b) - 1; i >= (a); i--)
#define _rrep4(i,a,b,c) for(int i = (b) - 1; i >= (a); i -= (c))
#define rrep(...) overload(__VA_ARGS__,_rrep4,_rrep3,_rrep2,_rrep1)(__VA_ARGS__)
template <class T> bool chmin(T& a, T b){ if(a > b){ a = b; return 1; } return 0; }
template <class T> bool chmax(T& a, T b){ if(a < b){ a = b; return 1; } return 0; }
struct Edge { int to; i64 cost; Edge(int to, i64 cost) : to(to), cost(cost) {} };
using Graph = vector<vector<Edge>>;
```

## フィードバック
もし誤植や，内容に誤りを発見した場合は，是非[Twitter](https://twitter.com/__take4)などでフィードバックしていただけると幸いです．