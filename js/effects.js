/* ==========================================================================
   effects.js — hiệu ứng trang trí dùng chung (trái tim bay, confetti, ripple...)
   Mọi hiệu ứng đều tự tắt/giảm khi người dùng bật "Reduce Motion".
   ========================================================================== */
(function () {
  "use strict";
  var App = window.LoveApp;
  if (!App) return;

  var html = document.documentElement;
  var isCoarse = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
  var isSmall = window.matchMedia && window.matchMedia("(max-width: 640px)").matches;

  var PALETTE = ["#ff7fa8", "#ffa6c4", "#f5578a", "#ffc9dc", "#d9b8ff", "#b399f0", "#ffb8d1", "#ff9ec2"];
  var CONFETTI_GLYPHS = ["heart", "heart", "heart", "star", "dot"];

  /* ---------- Trái tim bay nền ---------- */
  function floatingHearts(container, count) {
    if (!container || App.prefersReducedMotion()) return;
    var n = isSmall ? Math.ceil(count * 0.6) : count;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < n; i++) {
      var h = document.createElement("i");
      h.className = "fx-heart heart-shape";
      var size = App.rand(10, 26);
      h.style.cssText =
        "left:" + App.rand(2, 98).toFixed(1) + "%;" +
        "width:" + size.toFixed(1) + "px;height:" + size.toFixed(1) + "px;" +
        "--c:" + App.pick(PALETTE) + ";" +
        "--dur:" + App.rand(11, 22).toFixed(1) + "s;" +
        "--delay:" + (-App.rand(0, 22)).toFixed(1) + "s;" +
        "--drift:" + App.rand(-40, 40).toFixed(0) + "px;" +
        "--op:" + App.rand(0.35, 0.75).toFixed(2) + ";";
      frag.appendChild(h);
    }
    container.appendChild(frag);
  }

  /* ---------- Sao lấp lánh ---------- */
  function twinkles(container, count) {
    if (!container || App.prefersReducedMotion()) return;
    var n = isSmall ? Math.ceil(count * 0.6) : count;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < n; i++) {
      var s = document.createElement("i");
      s.className = "fx-twinkle";
      var size = App.rand(5, 12);
      s.style.cssText =
        "left:" + App.rand(0, 100).toFixed(1) + "%;top:" + App.rand(0, 100).toFixed(1) + "%;" +
        "width:" + size.toFixed(1) + "px;height:" + size.toFixed(1) + "px;" +
        "--dur:" + App.rand(2.2, 5).toFixed(1) + "s;--delay:" + (-App.rand(0, 5)).toFixed(1) + "s;";
      frag.appendChild(s);
    }
    container.appendChild(frag);
  }

  /* ---------- Confetti (trái tim / sao) bằng Web Animations API ---------- */
  function burst(x, y, opts) {
    if (App.prefersReducedMotion() || !document.body.animate) return;
    opts = opts || {};
    var count = opts.count || (isSmall ? 18 : 28);
    var spread = opts.spread || 180;
    var frag = document.createDocumentFragment();
    var items = [];
    for (var i = 0; i < count; i++) {
      var p = document.createElement("i");
      var kind = App.pick(CONFETTI_GLYPHS);
      p.className = "fx-confetti " + (kind === "heart" ? "heart-shape" : kind === "star" ? "star-shape" : "dot-shape");
      var size = kind === "dot" ? App.rand(5, 9) : App.rand(10, 20);
      p.style.cssText = "left:" + x + "px;top:" + y + "px;width:" + size + "px;height:" + size + "px;--c:" + App.pick(PALETTE) + ";";
      frag.appendChild(p);
      items.push({ node: p, size: size });
    }
    document.body.appendChild(frag);

    items.forEach(function (it) {
      var angle = App.rand(-Math.PI, 0) + App.rand(-0.4, 0.4); // bắn lên trên là chính
      var dist = App.rand(spread * 0.4, spread);
      var dx = Math.cos(angle) * dist;
      var dy = Math.sin(angle) * dist;
      var fall = App.rand(60, 160);
      var rot = App.rand(-260, 260);
      var dur = App.rand(900, 1700);
      var anim = it.node.animate(
        [
          { transform: "translate(-50%,-50%) scale(.2) rotate(0deg)", opacity: 1 },
          { transform: "translate(calc(-50% + " + dx * 0.7 + "px),calc(-50% + " + dy * 0.85 + "px)) scale(1) rotate(" + rot * 0.5 + "deg)", opacity: 1, offset: 0.45 },
          { transform: "translate(calc(-50% + " + dx + "px),calc(-50% + " + (dy + fall) + "px)) scale(.6) rotate(" + rot + "deg)", opacity: 0 }
        ],
        { duration: dur, easing: "cubic-bezier(.2,.7,.3,1)", fill: "forwards" }
      );
      anim.onfinish = function () { if (it.node.parentNode) it.node.parentNode.removeChild(it.node); };
    });
  }

  function burstFromElement(elm, opts) {
    if (!elm) return;
    var r = elm.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2, opts);
  }

  // Mưa confetti toàn màn hình (khi đạt quiz, mở thư bí mật...)
  function rain(durationMs) {
    if (App.prefersReducedMotion()) return;
    var end = Date.now() + (durationMs || 1600);
    (function tick() {
      burst(App.rand(window.innerWidth * 0.1, window.innerWidth * 0.9), App.rand(window.innerHeight * 0.15, window.innerHeight * 0.5), { count: 10, spread: 140 });
      if (Date.now() < end) window.setTimeout(tick, 220);
    })();
  }

  /* ---------- Ripple cho nút .btn ---------- */
  function initRipple() {
    document.addEventListener("pointerdown", function (e) {
      var btn = e.target.closest ? e.target.closest(".btn") : null;
      if (!btn || btn.disabled || App.prefersReducedMotion()) return;
      var rect = btn.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height) * 1.6;
      var r = document.createElement("span");
      r.className = "ripple";
      r.style.cssText =
        "width:" + size + "px;height:" + size + "px;" +
        "left:" + (e.clientX - rect.left - size / 2) + "px;top:" + (e.clientY - rect.top - size / 2) + "px;";
      btn.appendChild(r);
      window.setTimeout(function () { if (r.parentNode) r.parentNode.removeChild(r); }, 650);
    }, { passive: true });
  }

  /* ---------- Vệt trái tim theo con trỏ (chỉ desktop) ---------- */
  function cursorTrail() {
    if (isCoarse || App.prefersReducedMotion() || !document.body.animate) return;
    var last = 0;
    document.addEventListener("pointermove", function (e) {
      var now = performance.now();
      if (e.pointerType === "touch" || now - last < 70) return;
      last = now;
      var p = document.createElement("i");
      var size = App.rand(7, 14);
      p.className = "fx-confetti heart-shape";
      p.style.cssText = "left:" + e.clientX + "px;top:" + e.clientY + "px;width:" + size + "px;height:" + size + "px;--c:" + App.pick(PALETTE) + ";";
      document.body.appendChild(p);
      var a = p.animate(
        [
          { transform: "translate(-50%,-50%) scale(1)", opacity: 0.9 },
          { transform: "translate(calc(-50% + " + App.rand(-14, 14) + "px),calc(-50% + 34px)) scale(.2)", opacity: 0 }
        ],
        { duration: 900, easing: "ease-out", fill: "forwards" }
      );
      a.onfinish = function () { if (p.parentNode) p.parentNode.removeChild(p); };
    }, { passive: true });
  }

  /* ---------- Toast ---------- */
  var toastTimer = null;
  function toast(message) {
    var t = document.querySelector(".toast");
    if (!t) {
      t = document.createElement("div");
      t.className = "toast";
      t.setAttribute("role", "status");
      t.setAttribute("aria-live", "polite");
      document.body.appendChild(t);
    }
    t.textContent = message;
    t.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () { t.classList.remove("is-visible"); }, 2600);
  }

  /* ---------- Khởi tạo tự động theo thuộc tính data- ---------- */
  function init() {
    var scene = document.querySelector(".bg-scene");
    if (scene) {
      floatingHearts(scene, parseInt(scene.getAttribute("data-hearts"), 10) || 0);
      twinkles(scene, parseInt(scene.getAttribute("data-twinkles"), 10) || 0);
    }
    initRipple();
    if (document.body.hasAttribute("data-cursor-trail")) cursorTrail();
    document.addEventListener("visibilitychange", function () {
      html.classList.toggle("is-hidden", document.hidden);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  window.LoveFX = {
    floatingHearts: floatingHearts,
    twinkles: twinkles,
    burst: burst,
    burstFromElement: burstFromElement,
    rain: rain,
    toast: toast
  };
})();
