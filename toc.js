// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="index.html">はじめに</a></li><li class="chapter-item expanded "><a href="graph/main.html"><strong aria-hidden="true">1.</strong> グラフ問題</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="graph/dijkstra/main.html"><strong aria-hidden="true">1.1.</strong> 単一始点（終点）最短路（Dijkstra法）</a></li><li class="chapter-item expanded "><a href="graph/bfs/main.html"><strong aria-hidden="true">1.2.</strong> 単一始点最短パス（BFS）</a></li><li class="chapter-item expanded "><a href="graph/bellman-ford/main.html"><strong aria-hidden="true">1.3.</strong> 単一始点最短路（Bellman Ford法）</a></li><li class="chapter-item expanded "><a href="graph/spfa/main.html"><strong aria-hidden="true">1.4.</strong> 単一始点最短路（SPFA）</a></li><li class="chapter-item expanded "><a href="graph/warshall-floyd/main.html"><strong aria-hidden="true">1.5.</strong> 全点対最短路（Warshall Floyd法）</a></li><li class="chapter-item expanded "><a href="graph/johnson/main.html"><strong aria-hidden="true">1.6.</strong> 全点対最短路（Johnson法）</a></li><li class="chapter-item expanded "><a href="graph/longest-path/main.html"><strong aria-hidden="true">1.7.</strong> 単一始点最長路</a></li><li class="chapter-item expanded "><a href="graph/kruskal/main.html"><strong aria-hidden="true">1.8.</strong> 最小全域木（Kruskal法）</a></li><li class="chapter-item expanded "><a href="graph/connectivity/main.html"><strong aria-hidden="true">1.9.</strong> 連結性</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="graph/connectivity/dfs/main.html"><strong aria-hidden="true">1.9.1.</strong> DFS</a></li><li class="chapter-item expanded "><a href="graph/connectivity/union-find/main.html"><strong aria-hidden="true">1.9.2.</strong> Union Find</a></li><li class="chapter-item expanded "><a href="graph/connectivity/low-link/main.html"><strong aria-hidden="true">1.9.3.</strong> Low Link</a></li><li class="chapter-item expanded "><a href="graph/connectivity/dynamic-connectivity/main.html"><strong aria-hidden="true">1.9.4.</strong> Dynamic Connectivity Algorithm</a></li></ol></li><li class="chapter-item expanded "><a href="graph/tree/main.html"><strong aria-hidden="true">1.10.</strong> 木</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="graph/tree/dfs/main.html"><strong aria-hidden="true">1.10.1.</strong> DFS</a></li><li class="chapter-item expanded "><a href="graph/tree/diameter/main.html"><strong aria-hidden="true">1.10.2.</strong> 直径</a></li><li class="chapter-item expanded "><a href="graph/tree/euler-tour/main.html"><strong aria-hidden="true">1.10.3.</strong> Euler Tour</a></li><li class="chapter-item expanded "><a href="graph/tree/euler-tour-tree/main.html"><strong aria-hidden="true">1.10.4.</strong> Euler Tour Tree</a></li><li class="chapter-item expanded "><a href="graph/tree/hld/main.html"><strong aria-hidden="true">1.10.5.</strong> HL分解</a></li><li class="chapter-item expanded "><a href="graph/tree/link-cut-tree/main.html"><strong aria-hidden="true">1.10.6.</strong> Link Cut Tree</a></li></ol></li><li class="chapter-item expanded "><a href="graph/tsp/main.html"><strong aria-hidden="true">1.11.</strong> 巡回セールスマン問題</a></li></ol></li><li class="chapter-item expanded "><a href="range/main.html"><strong aria-hidden="true">2.</strong> 区間問題</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="range/imos/main.html"><strong aria-hidden="true">2.1.</strong> imos法</a></li><li class="chapter-item expanded "><a href="range/segtree/main.html"><strong aria-hidden="true">2.2.</strong> セグメント木</a></li><li class="chapter-item expanded "><a href="range/bit/main.html"><strong aria-hidden="true">2.3.</strong> Binary Indexed Tree（フェニック木）</a></li><li class="chapter-item expanded "><a href="range/bbst/main.html"><strong aria-hidden="true">2.4.</strong> 平衡2分探索木</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="range/bbst/splay-tree/main.html"><strong aria-hidden="true">2.4.1.</strong> splay木</a></li></ol></li><li class="chapter-item expanded "><a href="range/rbst/main.html"><strong aria-hidden="true">2.5.</strong> RangeBST</a></li><li class="chapter-item expanded "><a href="range/imos2d/main.html"><strong aria-hidden="true">2.6.</strong> 2次元imos法</a></li><li class="chapter-item expanded "><a href="range/mo/main.html"><strong aria-hidden="true">2.7.</strong> Mo&#39;s algorithm</a></li><li class="chapter-item expanded "><a href="range/wavelet-matrix/main.html"><strong aria-hidden="true">2.8.</strong> ウェーブレット行列</a></li><li class="chapter-item expanded "><a href="range/isp/main.html"><strong aria-hidden="true">2.9.</strong> 区間スケジューリング問題</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="range/isp/overlap/main.html"><strong aria-hidden="true">2.9.1.</strong> 重複あり区間スケジューリング問題</a></li><li class="chapter-item expanded "><a href="range/isp/weighted/main.html"><strong aria-hidden="true">2.9.2.</strong> 重み付き区間スケジューリング問題</a></li></ol></li></ol></li><li class="chapter-item expanded "><a href="dp/main.html"><strong aria-hidden="true">3.</strong> DP</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="dp/ddp/main.html"><strong aria-hidden="true">3.1.</strong> 桁DP</a></li><li class="chapter-item expanded "><a href="dp/pdp/main.html"><strong aria-hidden="true">3.2.</strong> 確率DP</a></li><li class="chapter-item expanded "><a href="dp/edp/main.html"><strong aria-hidden="true">3.3.</strong> 期待値DP</a></li><li class="chapter-item expanded "><a href="dp/bitdp/main.html"><strong aria-hidden="true">3.4.</strong> bitDP</a></li><li class="chapter-item expanded "><a href="dp/rangedp/main.html"><strong aria-hidden="true">3.5.</strong> 区間DP</a></li><li class="chapter-item expanded "><a href="dp/eardp/main.html"><strong aria-hidden="true">3.6.</strong> 耳DP</a></li><li class="chapter-item expanded "><a href="dp/DFAdp/main.html"><strong aria-hidden="true">3.7.</strong> オートマトンDP</a></li><li class="chapter-item expanded "><a href="dp/lcs/main.html"><strong aria-hidden="true">3.8.</strong> LCS</a></li><li class="chapter-item expanded "><a href="dp/lis/main.html"><strong aria-hidden="true">3.9.</strong> LIS</a></li></ol></li><li class="chapter-item expanded "><a href="flow/main.html"><strong aria-hidden="true">4.</strong> フロー</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="flow/mfp/main.html"><strong aria-hidden="true">4.1.</strong> 最大フロー問題</a></li><li class="chapter-item expanded "><a href="flow/bipartitemm/main.html"><strong aria-hidden="true">4.2.</strong> 2部グラフの最大マッチング</a></li><li class="chapter-item expanded "><a href="flow/mcfp/main.html"><strong aria-hidden="true">4.3.</strong> 最小費用流問題</a></li></ol></li><li class="chapter-item expanded "><a href="game/main.html"><strong aria-hidden="true">5.</strong> ゲーム系問題</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="game/backtrack/main.html"><strong aria-hidden="true">5.1.</strong> 後退解析</a></li><li class="chapter-item expanded "><a href="game/nim/main.html"><strong aria-hidden="true">5.2.</strong> Nim</a></li><li class="chapter-item expanded "><a href="game/grundy/main.html"><strong aria-hidden="true">5.3.</strong> Grundy数</a></li></ol></li><li class="chapter-item expanded "><a href="group-theory/main.html"><strong aria-hidden="true">6.</strong> 群論</a></li><li class="chapter-item expanded "><a href="dc/main.html"><strong aria-hidden="true">7.</strong> 分割統治法</a></li><li class="chapter-item expanded "><a href="binary-search/main.html"><strong aria-hidden="true">8.</strong> 2分探索</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
