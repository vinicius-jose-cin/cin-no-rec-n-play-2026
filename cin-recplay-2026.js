(function () {
  "use strict";

  var DIAS = window.CIN26.DIAS, A = window.CIN26.A, N = window.CIN26.N,
      L = window.CIN26.L, CSS = window.CIN26.CSS, T = window.CIN26.T;

  function init() {
    if (document.getElementById("cin26")) return;
    var h = document.createElement("div");
    h.id = "cin26";
    var r = h.attachShadow({ mode: "open" });
    r.innerHTML = "<style>" + CSS + "</style>" + T;
    document.body.appendChild(h);
    document.body.style.cssText += "margin:0;background:#050505";

    var P = r.getElementById("panel"), F = r.querySelector(".filters");
    var Ds = [...r.querySelectorAll(".day")], Fs = [...r.querySelectorAll(".f")];
    var s = null, f = "all";

    var C = function (a) {
      var href = a.u || ("https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(a.q || a.l));
      return '<article class=card><div class=tags>' + a.g.map(function (g) { return "<span>" + g + "</span>"; }).join("") +
        "</div><h4>" + a.n + "</h4>" + (a.p.length ? '<p class=who><span class="mic u" role=img aria-label="Palestrantes"><svg aria-hidden="true"><use href="#i-u"/></svg></span><span class=pt>' + a.p.join(" · ") + "</span></p>" : "") +
        '<div class=meta><span class="mic c" role=img aria-label="Horário"><svg aria-hidden="true"><use href="#i-c"/></svg></span>' + (a.h || "A confirmar") + '</div>' +
        '<div class=meta><span class="mic p" role=img aria-label="Local"><svg aria-hidden="true"><use href="#i-p"/></svg></span><a class=map href="' + href + '" target=_blank rel=noopener>' + a.l + ' ↗</a></div></article>';
    };
    var G = function (t, l) {
      return '<section class=grp><div class=gh><h3>' + (t ? "Stand do CIn" : "Atividades") + '</h3></div><div class=cards>' + l.map(C).join("") + "</div></section>";
    };
    function R() {
      if (!s) {
        F.hidden = true;
        P.innerHTML = '<div class=thanks><h2>Obrigado por participar!</h2><p>Esperamos que você tenha aproveitado as palestras e atividades do CIn no REC\'n\'Play! Contamos com sua presença novamente no ano que vem.</p></div>';
        return;
      }
      F.hidden = false;
      var m = function (x) {
        var b = String(x.h || "").split("–")[0].split("-")[0].replace(/\D/g, "");
        return b ? parseInt(b, 10) : 9999;
      };
      var a = A.filter(function (x) { return x.d.indexOf(s) > -1; }).sort(function (x, y) { return (x.t ? 1 : 0) - (y.t ? 1 : 0) || m(x) - m(y); });
      var l = f == "all" ? a : a.filter(function (x) { return f == "a" ? !x.t : !!x.t; });
      var h = "";
      if (l.some(function (x) { return !x.t; })) h += G(0, l.filter(function (x) { return !x.t; }));
      if (l.some(function (x) { return x.t; })) h += G(1, l.filter(function (x) { return x.t; }));
      P.innerHTML = h || '<div class=empty><b>Nada por aqui</b><span>Nada neste filtro.</span></div>';
    }

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

    Ds.forEach(function (b) {
      b.onclick = function () {
        s = s == b.dataset.d ? null : b.dataset.d;
        Ds.forEach(function (x) { x.setAttribute("aria-selected", x.dataset.d == s); });
        R();
      };
    });
    Fs.forEach(function (b) {
      b.onclick = function () {
        f = b.dataset.f;
        Fs.forEach(function (x) { x.setAttribute("aria-pressed", x.dataset.f == f); });
        R();
      };
    });
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
    setInterval(R, 60000);
    R();

    // Atualização dinâmica dos dados sem refresh: busca os arquivos de dados
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
      loadData("dias", function () { copyArr(DIAS, window.CIN26.DIAS); }, R);
      loadData("atividades", function () { copyArr(A, window.CIN26.A); }, R);
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
