/* love-question.js — nút "Không" né tránh + thu nhỏ, nút "Có" to dần */
(function () {
  "use strict";
  var App = window.LoveApp;
  if (!App) return;

  var C = App.cfg.question;
  var $ = App.$;

  var yesBtn = $("#lq-yes");
  var noBtn = $("#lq-no");
  var actions = $("#lq-actions");
  var mascot = $("#lq-mascot");
  var bubble = $("#lq-bubble");

  /* ----- Nội dung từ config ----- */
  $("#lq-eyebrow").textContent = C.eyebrow;
  $("#lq-title").textContent = C.text;
  yesBtn.textContent = C.yesText;
  noBtn.textContent = C.noText;
  mascot.textContent = C.defaultEmoji;
  document.title = C.text + " · " + App.cfg.site.title;

  /* ----- Trạng thái ----- */
  var MAX = Math.max(1, C.noMaxClicks | 0);
  var noClicks = 0;       // số lần đã cố bấm "Không"
  var noGone = false;
  var fleeing = false;    // nút Không đã chuyển sang fixed chưa
  var slot = null;        // chỗ giữ vị trí ban đầu của nút Không
  var noBaseW = 0, noBaseH = 0;
  var noPos = { x: 0, y: 0 };
  var lastAttempt = 0;
  var bubbleTimer = null;
  var finished = false;

  function yesScale(n) { return 1 + n * C.yesGrowStep; }
  function noScale(n) { return Math.max(0, 1 - n / MAX); }

  /* ----- Bong bóng + mascot ----- */
  function say(emoji, text) {
    mascot.textContent = emoji;
    mascot.classList.remove("is-pop");
    void mascot.offsetWidth;
    mascot.classList.add("is-pop");
    bubble.textContent = text;
    bubble.classList.add("is-visible");
    window.clearTimeout(bubbleTimer);
    bubbleTimer = window.setTimeout(function () { bubble.classList.remove("is-visible"); }, 3200);
  }

  /* ----- Tìm vị trí ngẫu nhiên hợp lệ cho nút Không ----- */
  function rectsOverlap(a, b, margin) {
    return !(a.right + margin < b.left || a.left - margin > b.right || a.bottom + margin < b.top || a.top - margin > b.bottom);
  }
  function overlapArea(a, b, margin) {
    var w = Math.min(a.right + margin, b.right) - Math.max(a.left - margin, b.left);
    var h = Math.min(a.bottom + margin, b.bottom) - Math.max(a.top - margin, b.top);
    return w > 0 && h > 0 ? w * h : 0;
  }

  // Vùng cần tránh: nút Có (đã tính cả cỡ SẼ to ra), câu hỏi, mascot
  function avoidRects(growRatio) {
    var list = [];
    var y = yesBtn.getBoundingClientRect();
    var cx = y.left + y.width / 2, cy = y.top + y.height / 2;
    var w = y.width * growRatio, h = y.height * growRatio;
    list.push({ left: cx - w / 2, right: cx + w / 2, top: cy - h / 2, bottom: cy + h / 2 });
    [$("#lq-title"), mascot].forEach(function (n) {
      var r = n.getBoundingClientRect();
      list.push({ left: r.left, right: r.right, top: r.top, bottom: r.bottom });
    });
    return list;
  }

  function pickSpot(scale, growRatio) {
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var pad = 10;
    var w = noBaseW * scale;
    var h = noBaseH * scale;
    var minX = pad, maxX = Math.max(minX, vw - w - pad);
    var minY = pad, maxY = Math.max(minY, vh - h - pad);
    var avoid = avoidRects(growRatio);
    var minTravel = Math.min(vw, vh) * 0.28;

    var best = null;
    var bestScore = Infinity;
    for (var i = 0; i < 80; i++) {
      var x = App.rand(minX, maxX);
      var y = App.rand(minY, maxY);
      var box = { left: x, top: y, right: x + w, bottom: y + h };
      var overlap = 0;
      for (var k = 0; k < avoid.length; k++) overlap += overlapArea(box, avoid[k], 14);
      var travel = Math.hypot(x - noPos.x, y - noPos.y);
      // ưu tiên: không đè lên gì + chạy đủ xa chỗ cũ
      var score = overlap * 1000 + (travel < minTravel ? (minTravel - travel) * 4 : 0);
      if (score < bestScore) { bestScore = score; best = { x: x, y: y }; }
      if (score === 0) break;
    }
    return best || { x: minX, y: minY };
  }

  /* ----- Chuyển nút Không sang position:fixed (lần đầu) ----- */
  function startFleeing() {
    if (fleeing) return;
    var r = noBtn.getBoundingClientRect();
    noBaseW = r.width;
    noBaseH = r.height;
    noPos = { x: r.left, y: r.top };

    slot = document.createElement("span");
    slot.className = "lq-no-slot";
    slot.style.width = r.width + "px";
    slot.style.height = r.height + "px";
    actions.appendChild(slot);

    // Đưa ra <body> để không bị ảnh hưởng bởi transform/filter của phần tử cha
    document.body.appendChild(noBtn);
    noBtn.classList.add("is-fleeing");
    noBtn.style.width = noBaseW + "px";
    noBtn.style.height = noBaseH + "px";
    applyNoTransform(noPos.x, noPos.y, 1);
    void noBtn.offsetWidth;
    fleeing = true;

    // thu chỗ trống ở frame kế tiếp để nút Có "trượt" về giữa mượt mà
    window.requestAnimationFrame(function () { slot.classList.add("is-collapsed"); });
  }

  function applyNoTransform(x, y, scale) {
    noPos = { x: x, y: y };
    noBtn.style.transform = "translate3d(" + x + "px," + y + "px,0) scale(" + scale + ")";
  }

  /* ----- Một lần "cố bấm Không" ----- */
  function attempt(countIt) {
    if (noGone || finished) return;
    var now = performance.now();
    if (countIt && now - lastAttempt < 220) return;
    if (countIt) lastAttempt = now;

    startFleeing();

    if (countIt) {
      noClicks++;
      var ratio = yesScale(noClicks) / yesScale(noClicks - 1);
      yesBtn.style.setProperty("--yes-scale", yesScale(noClicks).toFixed(3));
      yesBtn.setAttribute("data-yes-scale", yesScale(noClicks).toFixed(2));
      noBtn.setAttribute("data-no-clicks", String(noClicks));
      yesBtn.classList.remove("is-pulse");
      void yesBtn.offsetWidth;
      yesBtn.classList.add("is-pulse");

      var reaction = C.noReactions[Math.min(noClicks - 1, C.noReactions.length - 1)];
      if (reaction) say(reaction.emoji, reaction.text);

      var s = noScale(noClicks);
      if (noClicks >= MAX) {
        // Biến mất hoàn toàn
        noGone = true;
        var spot0 = pickSpot(Math.max(s, 0.05), ratio);
        applyNoTransform(spot0.x, spot0.y, 0.01);
        noBtn.classList.add("is-gone");
        noBtn.setAttribute("aria-hidden", "true");
        noBtn.tabIndex = -1;
        window.setTimeout(function () { if (noBtn.parentNode) noBtn.parentNode.removeChild(noBtn); }, 700);
        window.setTimeout(function () {
          say("😘", C.noGoneText);
          yesBtn.classList.add("btn--glow");
          yesBtn.focus({ preventScroll: true });
        }, 650);
        return;
      }
      var spot = pickSpot(s, ratio);
      applyNoTransform(spot.x, spot.y, s);
    } else {
      // chỉ né (hover) – giữ nguyên cỡ hiện tại
      var cur = noScale(noClicks);
      var sp = pickSpot(cur, 1);
      applyNoTransform(sp.x, sp.y, cur);
    }
  }

  // pointerdown: bắt cả chuột lẫn cảm ứng TRƯỚC khi click kịp xảy ra (nút đã chạy mất)
  noBtn.addEventListener("pointerdown", function (e) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.preventDefault();
    attempt(true);
  });
  // click không có chuột (bàn phím: Enter/Space) => detail === 0
  noBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.detail === 0) attempt(true);
  });
  if (C.dodgeOnHover) {
    noBtn.addEventListener("pointerenter", function (e) {
      if (e.pointerType === "mouse" && fleeing && !noGone) attempt(false);
    });
  }

  // Giữ nút Không trong vùng nhìn thấy khi xoay màn hình / đổi kích thước
  window.addEventListener("resize", function () {
    if (!fleeing || noGone) return;
    var s = noScale(noClicks);
    var maxX = Math.max(10, window.innerWidth - noBaseW * s - 10);
    var maxY = Math.max(10, window.innerHeight - noBaseH * s - 10);
    applyNoTransform(App.clamp(noPos.x, 10, maxX), App.clamp(noPos.y, 10, maxY), s);
  });

  /* ----- Nút Có ----- */
  yesBtn.addEventListener("click", function () {
    if (finished) return;
    finished = true;
    yesBtn.classList.add("is-done");
    if (noBtn.parentNode && !noGone) noBtn.classList.add("is-gone");
    say("😍", "Anh biết mà! Yêu em nhất trên đời 💖");
    if (window.LoveFX) {
      window.LoveFX.burstFromElement(yesBtn, { count: 36, spread: 240 });
      window.LoveFX.rain(1400);
    }
    App.advance(2);
    window.setTimeout(function () { App.go("quiz"); }, 1300);
  });
})();
