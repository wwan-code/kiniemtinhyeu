/* ==========================================================================
   navigation.js — lõi dùng chung: tiến trình, khoá luồng trang, chuyển cảnh
   Phải được nạp ĐỒNG BỘ trong <head> (sau config.js) để chặn nhảy trang sớm.

   Luồng:  0 login → 1 question → 2 quiz → 3 loading → 4 memories (+ love-days)
   Tiến trình (stage) = chỉ số trang mà người dùng đang được phép ở.
   ========================================================================== */
(function () {
  "use strict";

  var CFG = window.LOVE_CONFIG;
  var html = document.documentElement;
  html.classList.add("js");

  /* ---------- Lưu trữ an toàn (có fallback khi bị chặn storage) ---------- */
  var memoryStore = {};
  function makeStore(kind) {
    try {
      var s = window[kind];
      var t = "__love_test__";
      s.setItem(t, "1");
      s.removeItem(t);
      return s;
    } catch (e) {
      return {
        getItem: function (k) { return Object.prototype.hasOwnProperty.call(memoryStore, k) ? memoryStore[k] : null; },
        setItem: function (k, v) { memoryStore[k] = String(v); },
        removeItem: function (k) { delete memoryStore[k]; }
      };
    }
  }
  var progressStore = makeStore(CFG.site.rememberProgress ? "localStorage" : "sessionStorage");
  var sessionStore = makeStore("sessionStorage");

  var PROGRESS_KEY = "loveAnniversary.progress";
  var TRANSITION_KEY = "loveAnniversary.transition";
  var ORDER = ["login", "question", "quiz", "loading", "memories"];
  var LAST_STAGE = ORDER.length - 1;
  var LEAVE_MS = 480;

  var reduceMotionQuery = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
  function prefersReducedMotion() { return !!(reduceMotionQuery && reduceMotionQuery.matches); }

  /* ---------- Tiến trình ---------- */
  function getStage() {
    var n = parseInt(progressStore.getItem(PROGRESS_KEY), 10);
    if (isNaN(n) || n < 0) return 0;
    return Math.min(n, LAST_STAGE);
  }
  function setStage(n) { progressStore.setItem(PROGRESS_KEY, String(Math.max(0, Math.min(n, LAST_STAGE)))); }
  // Chỉ tiến lên, không bao giờ lùi
  function advance(n) { if (n > getStage()) setStage(n); }
  function reset() { progressStore.removeItem(PROGRESS_KEY); }

  /* ---------- Đường dẫn ---------- */
  var base = html.getAttribute("data-base") || "";
  function href(routeName) {
    var file = CFG.routes[routeName];
    if (!file) throw new Error("Không có route: " + routeName);
    return base + file;
  }

  /* ---------- Chuyển cảnh ---------- */
  var leaving = false;
  function go(routeName) {
    if (leaving) return;
    leaving = true;
    var target = href(routeName);
    if (prefersReducedMotion()) { window.location.href = target; return; }
    try { sessionStore.setItem(TRANSITION_KEY, "1"); } catch (e) {}
    html.classList.add("is-leaving");
    window.setTimeout(function () { window.location.href = target; }, LEAVE_MS);
  }

  /* ---------- Khoá luồng ---------- */
  function guard() {
    var params = new URLSearchParams(window.location.search);
    if (params.has("reset")) {
      reset();
      window.location.replace(href("login"));
      return false;
    }
    var pageName = html.getAttribute("data-page");
    var pageStage = parseInt(html.getAttribute("data-stage"), 10);
    if (CFG.site.devMode || isNaN(pageStage) || pageName === "index") return true;

    var s = getStage();
    var tooEarly = s < pageStage;                         // chưa mở khoá trang này
    var tooLate = pageStage < LAST_STAGE && s > pageStage; // trang thuộc luồng đã qua rồi
    if (tooEarly || tooLate) {
      html.style.visibility = "hidden";
      window.location.replace(href(ORDER[s]));
      return false;
    }
    return true;
  }

  if (!guard()) { return; }

  /* ---------- Hiệu ứng vào trang ---------- */
  var cameFromTransition = false;
  try {
    cameFromTransition = sessionStore.getItem(TRANSITION_KEY) === "1";
    sessionStore.removeItem(TRANSITION_KEY);
  } catch (e) {}
  if (cameFromTransition && !prefersReducedMotion()) html.classList.add("is-entering");

  function ready() {
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        html.classList.remove("is-entering");
        html.classList.add("is-ready");
      });
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ready);
  else ready();

  // Quay lại bằng nút Back (bfcache) – bỏ trạng thái "đang rời trang"
  window.addEventListener("pageshow", function (e) {
    if (e.persisted) {
      leaving = false;
      html.classList.remove("is-leaving", "is-entering");
      html.classList.add("is-ready");
    }
  });

  /* ---------- Tiện ích nhỏ dùng chung ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function rand(min, max) { return Math.random() * (max - min) + min; }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function sleep(ms) { return new Promise(function (r) { window.setTimeout(r, ms); }); }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function pad2(n) { return n < 10 ? "0" + n : String(n); }

  // Đặt text an toàn (tránh chèn HTML từ config)
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  window.LoveApp = {
    cfg: CFG,
    stages: ORDER,
    getStage: getStage,
    advance: advance,
    reset: reset,
    href: href,
    go: go,
    prefersReducedMotion: prefersReducedMotion,
    store: sessionStore,
    $: $, $$: $$, el: el,
    rand: rand, clamp: clamp, sleep: sleep, pick: pick, pad2: pad2
  };
})();
