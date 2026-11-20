/* loading.js — thanh "LOADING LOVE"; chỉ hiện nút Click Me khi chạy xong */
(function () {
  "use strict";
  var App = window.LoveApp;
  if (!App) return;

  var C = App.cfg.loading;
  var $ = App.$;

  var root = $(".ld");
  var track = $("#ld-track");
  var bar = $("#ld-bar");
  var fill = $("#ld-fill");
  var textBase = $("#ld-text");
  var textOn = $("#ld-text-on");
  var like = $("#ld-like");
  var msgEl = $("#ld-message");
  var cta = $("#ld-cta");
  var clickBtn = $("#ld-click");
  var balloons = App.$$(".ld-balloon");

  $("#ld-title").textContent = C.title;
  clickBtn.textContent = C.buttonText;
  msgEl.textContent = C.messages[0] || "";
  document.title = C.title + " · " + App.cfg.site.title;

  /* ----- Đo chiều rộng thanh (để chữ trắng / bong bóng like căn đúng) ----- */
  function measure() {
    var w = bar.clientWidth;
    root.style.setProperty("--bar-w", w + "px");
  }
  measure();
  window.addEventListener("resize", measure);

  /* ----- Đường tiến trình có "khựng" ngẫu nhiên cho tự nhiên (luôn kết thúc ở 100) ----- */
  function buildCurve() {
    var segs = 6;
    var times = [0], values = [0];
    var tSum = 0, vSum = 0, tw = [], vw = [];
    for (var i = 0; i < segs; i++) { tw.push(App.rand(0.6, 1.6)); vw.push(App.rand(0.5, 1.5)); }
    tw.forEach(function (x) { tSum += x; });
    vw.forEach(function (x) { vSum += x; });
    var t = 0, v = 0;
    for (var j = 0; j < segs; j++) {
      t += tw[j] / tSum;
      v += vw[j] / vSum;
      times.push(j === segs - 1 ? 1 : t);
      values.push(j === segs - 1 ? 100 : v * 100);
    }
    return { times: times, values: values };
  }
  var curve = buildCurve();
  function smooth(k) { return k * k * (3 - 2 * k); }
  function progressAt(t) {
    if (t >= 1) return 100;
    for (var i = 1; i < curve.times.length; i++) {
      if (t <= curve.times[i]) {
        var k = (t - curve.times[i - 1]) / (curve.times[i] - curve.times[i - 1]);
        return curve.values[i - 1] + (curve.values[i] - curve.values[i - 1]) * smooth(k);
      }
    }
    return 100;
  }

  /* ----- Cập nhật UI ----- */
  var lastMsgIdx = 0;
  function setMessage(text) {
    msgEl.classList.add("is-swapping");
    window.setTimeout(function () { msgEl.textContent = text; msgEl.classList.remove("is-swapping"); }, 220);
  }

  function paint(p) {
    var pct = Math.floor(p);
    fill.style.width = p + "%";
    root.style.setProperty("--p", (p / 100).toFixed(4));
    var label = pct + "%";
    if (textBase.textContent !== label) { textBase.textContent = label; textOn.textContent = label; }
    bar.setAttribute("aria-valuenow", String(pct));
    balloons.forEach(function (b) {
      var at = parseFloat(b.getAttribute("data-at"));
      b.classList.toggle("is-active", p >= at && p < 100 && at > 0 ? true : (at === 0 && p < 100));
    });
    var idx = Math.min(C.messages.length - 1, Math.floor((p / 100) * C.messages.length));
    if (idx !== lastMsgIdx && p < 100) { lastMsgIdx = idx; setMessage(C.messages[idx]); }
  }

  /* ----- Hoàn tất ----- */
  var done = false;
  function finish() {
    if (done) return;
    done = true;
    paint(100);
    root.classList.add("is-done");
    textBase.textContent = C.doneBarText;
    textOn.textContent = C.doneBarText;
    bar.setAttribute("aria-valuenow", "100");
    balloons.forEach(function (b, i) {
      b.classList.remove("is-active");
      b.classList.add("is-big");
      b.style.transitionDelay = i * 90 + "ms";
    });
    setMessage(C.doneMessage);
    if (window.LoveFX) window.LoveFX.burstFromElement(bar, { count: 30, spread: 220 });
    window.setTimeout(function () {
      cta.hidden = false;
      clickBtn.focus({ preventScroll: true });
    }, 450);
  }

  /* ----- Vòng lặp ----- */
  var start = null;
  var lastBurst = 0;
  function frame(now) {
    if (done) return;
    if (start === null) start = now;
    var t = (now - start) / C.durationMs;
    var p = progressAt(t);
    paint(p);

    // thỉnh thoảng rắc vài trái tim nhỏ ở đầu thanh
    if (window.LoveFX && now - lastBurst > 900 && p > 3 && p < 97) {
      lastBurst = now;
      var br = bar.getBoundingClientRect();
      window.LoveFX.burst(br.left + br.width * (p / 100), br.top, { count: 4, spread: 60 });
    }
    if (t >= 1) finish();
    else window.requestAnimationFrame(frame);
  }
  paint(0);
  window.requestAnimationFrame(frame);

  /* ----- Click Me → trang kỷ niệm ----- */
  clickBtn.addEventListener("click", function () {
    if (!done) return;
    clickBtn.disabled = true;
    if (window.LoveFX) {
      window.LoveFX.burstFromElement(clickBtn, { count: 34, spread: 240 });
      window.LoveFX.rain(900);
    }
    App.advance(4);
    window.setTimeout(function () { App.go("memories"); }, 900);
  });
})();
