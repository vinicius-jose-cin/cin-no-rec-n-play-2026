(function () {
  "use strict";

  var N = window.CIN26.N, L = window.CIN26.L, CSS = window.CIN26.CSS, T = window.CIN26.T;

  function init() {
    if (document.getElementById("cin26")) return;
    var h = document.createElement("div");
    h.id = "cin26";
    var r = h.attachShadow({ mode: "open" });
    r.innerHTML = "<style>" + CSS + "</style>" + T;
    document.body.appendChild(h);
    document.body.style.cssText += "margin:0;background:#050505";

    var NT = r.getElementById("noticias"), TP = r.getElementById("tab-prog"), TN = r.getElementById("tab-news"), SP = r.getElementById("programa");
    function RN() {
      NT.innerHTML = N.length ? N.map(function (n) {
        var im = n.img ? '<a class=news-img href="' + n.url + '"><img src="' + n.img + '" alt="' + n.t + '" loading=lazy></a>' : '';
        return '<article class="news' + (n.img ? '' : ' noimg') + '">' + im + '<div><div class=news-date>' + n.dt + '</div><h3><a href="' + n.url + '">' + n.t + '</a></h3>' + (n.by ? '<p class=news-by>Texto: ' + n.by + '</p>' : '') + '<p class=news-sub>' + n.s + '</p><p class=news-text>' + n.x + '</p><a class=news-link href="' + n.url + '">Ler notícia →</a></div></article>';
      }).join("") : '<div class=empty><b>Nenhuma notícia ainda</b><span>As novidades aparecerão aqui.</span></div>';
    }
    function SV(v) {
      SP.hidden = v;
      NT.hidden = !v;
      TP.setAttribute("aria-pressed", !v);
      TN.setAttribute("aria-pressed", v);
    }
    TP.onclick = function () { SV(false); };
    TN.onclick = function () { SV(true); };
    var ART = document.documentElement.getAttribute("data-news");
    function RA(n) {
      return '<article class=article><a class=back href="/">← Voltar para a programação</a>' + (n.img ? '<img class=article-img src="' + n.img + '" alt="' + n.t + '">' : '') + '<div class=article-meta>' + n.dt + '</div><h1 class=article-title>' + n.t + '</h1>' + (n.by ? '<p class=article-by>Texto: ' + n.by + '</p>' : '') + '<p class=article-sub>' + n.s + '</p><div class=article-body>' + n.html + '</div></article>';
    }
    if (ART) {
      var aa = N.filter(function (n) { return n.slug === ART; })[0];
      r.querySelector(".w").classList.add("art");
      SP.hidden = true;
      NT.hidden = false;
      NT.innerHTML = aa ? RA(aa) : '<div class=empty><b>Notícia não encontrada</b><span>Volte para a programação.</span></div>';
    } else {
      RN();
    }

    var MB = r.getElementById("mapbtn"), MD = r.getElementById("mapa"), MI = r.getElementById("mapa-img"), MC = r.getElementById("mapa-close");
    function closeMap() {
      MD.hidden = true;
      document.body.style.overflow = "";
      MB.setAttribute("aria-expanded", "false");
      MB.focus();
    }
    MB.onclick = function () {
      if (!MI.getAttribute("src")) MI.src = MI.getAttribute("data-src");
      MD.hidden = false;
      document.body.style.overflow = "hidden";
      MB.setAttribute("aria-expanded", "true");
      MC.focus();
    };
    MC.onclick = closeMap;
    MD.onclick = function (e) { if (e.target === MD) closeMap(); };
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !MD.hidden) closeMap(); });
    r.getElementById("up").textContent = "13/11/2026, 10:06";
    r.getElementById("topbtn").onclick = function () { window.scrollTo({ top: 0, behavior: "smooth" }); };
    // Atualização dinâmica das notícias sem refresh: busca o arquivo de dados
    // com cache-busting e re-renderiza quando o conteúdo muda.
    var dataBase = "";
    var sc = document.querySelector('script[src*="atividades.js"]');
    if (sc) dataBase = sc.getAttribute("src").replace(/[^/]*$/, "");
    var lastTxt = {};
    function copyArr(dst, src) {
      dst.length = 0;
      for (var i = 0; i < src.length; i++) dst.push(src[i]);
    }
    function loadData(name, apply, redraw) {
      if (!dataBase) return;
      fetch(dataBase + name + ".js?cb=" + Date.now(), { cache: "no-store" })
        .then(function (r) { return r.ok ? r.text() : null; })
        .then(function (txt) {
          if (!txt || txt === lastTxt[name]) return;
          lastTxt[name] = txt;
          try { new Function(txt)(); } catch (e) { return; }
          apply();
          redraw();
        })
        .catch(function () {});
    }
    var newsCount = 0;
    function poll() {
      // Notícias: prioridade baixa, verifica a cada 5 ciclos (5 min).
      if (++newsCount % 5 === 0) loadData("noticias", function () { copyArr(N, window.CIN26.N); }, function () { if (!ART) RN(); });
    }
    setInterval(poll, 60000);
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible") poll();
    });
    poll();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
