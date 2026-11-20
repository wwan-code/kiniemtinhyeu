/* love-days.js — bộ đếm ngày yêu nhau (realtime). Ngày bắt đầu lấy từ config.loveDays.startDate */
(function () {
  "use strict";
  var App = window.LoveApp;
  if (!App) return;

  var C = App.cfg.loveDays;
  var $ = App.$;
  var pad2 = App.pad2;

  document.title = C.title + " · " + App.cfg.site.title;
  $("#days-title").textContent = C.title;
  $("#days-thanks").textContent = C.thankYou;
  $("#days-back").textContent = C.backButton;

  /* ----- Phân tích ngày bắt đầu (giờ địa phương; chấp nhận cả "YYYY-MM-DD") ----- */
  function parseStart(str) {
    var m = /^(\d{4})-(\d{1,2})-(\d{1,2})(?:[T\s](\d{1,2}):(\d{2})(?::(\d{2}))?)?$/.exec(String(str).trim());
    if (!m) return null;
    var d = new Date(+m[1], +m[2] - 1, +m[3], +(m[4] || 0), +(m[5] || 0), +(m[6] || 0), 0);
    // Từ chối ngày không tồn tại (VD 2024-02-31)
    if (d.getFullYear() !== +m[1] || d.getMonth() !== +m[2] - 1 || d.getDate() !== +m[3]) return null;
    return d;
  }

  var start = parseStart(C.startDate);
  if (!start) {
    console.warn("[love-days] startDate không hợp lệ:", C.startDate, "→ dùng ngày hôm nay");
    start = new Date();
  }

  /* ----- Tính khoảng thời gian theo LỊCH (tháng/ngày/giờ/phút/giây chính xác) ----- */
  function daysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }

  function diff(from, to) {
    if (to < from) to = from;
    var y = to.getFullYear() - from.getFullYear();
    var mo = to.getMonth() - from.getMonth();
    var d = to.getDate() - from.getDate();
    var h = to.getHours() - from.getHours();
    var mi = to.getMinutes() - from.getMinutes();
    var s = to.getSeconds() - from.getSeconds();

    if (s < 0) { s += 60; mi--; }
    if (mi < 0) { mi += 60; h--; }
    if (h < 0) { h += 24; d--; }
    // mượn số ngày của các tháng liền trước tháng "to" cho tới khi hợp lệ
    // (vd 31/01 → 01/03: tháng 2 chỉ có 28/29 ngày nên phải mượn thêm 1 tháng nữa)
    var pm = to.getMonth(), py = to.getFullYear();
    while (d < 0) {
      pm--;
      if (pm < 0) { pm = 11; py--; }
      d += daysInMonth(py, pm);
      mo--;
    }
    if (mo < 0) { mo += 12; y--; }

    var totalMs = to.getTime() - from.getTime();
    return {
      months: y * 12 + mo,
      days: d,
      hours: h, minutes: mi, seconds: s,
      // tổng số ngày (làm tròn xuống) theo giờ địa phương, an toàn khi đổi giờ DST
      totalDays: Math.floor(totalMs / 86400000),
      // phần giờ:phút:giây của "ngày hiện tại" (kể từ thời điểm bắt đầu)
      clockH: h, clockM: mi, clockS: s
    };
  }

  /* ----- Hiển thị tĩnh ----- */
  var startLabel = pad2(start.getDate()) + "-" + pad2(start.getMonth() + 1) + "-" + start.getFullYear();
  $("#days-start").textContent = startLabel;
  $("#days-start").setAttribute("datetime", start.toISOString());

  function setAvatar(prefix, who) {
    $("#" + prefix + "-name").textContent = who.name || "";
    var box = $("#" + prefix + "-img");
    box.textContent = "";
    if (who.src) {
      var img = App.el("img");
      img.src = who.src;
      img.alt = who.name || "Ảnh đại diện";
      img.decoding = "async";
      img.addEventListener("error", function () { box.textContent = prefix.indexOf("her") !== -1 ? "👩" : "👨"; });
      box.appendChild(img);
    } else {
      box.textContent = prefix.indexOf("her") !== -1 ? "👩" : "👨";
      box.setAttribute("role", "img");
      box.setAttribute("aria-label", who.name || "");
    }
  }
  setAvatar("avatar-her", C.avatars.her);
  setAvatar("avatar-him", C.avatars.him);

  /* ----- Cập nhật realtime ----- */
  var refs = {
    total: $("#d-total"), totalLabel: $("#d-total-label"), clock: $("#days-clock"),
    months: $("#u-months"), days: $("#u-days"), hours: $("#u-hours"), minutes: $("#u-minutes"), seconds: $("#u-seconds")
  };
  var prev = {};
  function put(key, value) {
    if (prev[key] === value) return;
    prev[key] = value;
    var node = refs[key];
    node.textContent = value;
    if (key !== "clock" && !App.prefersReducedMotion()) {
      node.classList.remove("is-tick");
      void node.offsetWidth;
      node.classList.add("is-tick");
    }
  }

  var future = false;
  function update() {
    var now = new Date();
    future = now < start;
    var r = diff(start, now);
    put("total", String(r.totalDays));
    refs.totalLabel.textContent = r.totalDays === 1 ? "DAY" : "DAYS";
    put("clock", pad2(r.hours) + ":" + pad2(r.minutes) + ":" + pad2(r.seconds));
    put("months", String(r.months));
    put("days", String(r.days));
    put("hours", pad2(r.hours));
    put("minutes", pad2(r.minutes));
    put("seconds", pad2(r.seconds));
  }

  // Căn đúng nhịp giây để số nhảy đều, không trôi
  var timer = null;
  function schedule() {
    update();
    var wait = 1000 - (Date.now() % 1000) + 5;
    timer = window.setTimeout(schedule, wait);
  }
  schedule();
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) { window.clearTimeout(timer); schedule(); }
  });

  /* ----- Điều hướng ----- */
  var back = $("#days-back");
  back.addEventListener("click", function (e) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();
    App.go("memories");
  });
  // fix đường dẫn thẻ <a> theo config.routes (nếu bạn đổi tên file)
  back.setAttribute("href", App.href("memories"));

    /* ----- Trình phát video kỷ niệm (thay thế nhạc) ----- */
    var V = C.video || C.music || {};
    var videoSrc = (V.src || "").replace(/\\/g, "/");
    var fallbackSrc = (V.fallbackSrc || "").replace(/\\/g, "/");

      if (videoSrc || fallbackSrc) {
        var videoCard = $("#video-card");
        var videoBox = $("#video-box");
        var video = $("#video-player");
        var soundBtn = $("#video-sound-btn");
        var soundIcon = $("#sound-icon");
        var fsBtn = $("#video-fs-btn");
        var tapHint = $("#video-tap-hint");
        var videoTitle = $("#video-title");

        if (videoTitle) videoTitle.textContent = V.title || "Khoảnh khắc của chúng mình 💕";

        // Xoá source cũ nếu có và thêm các source video
        while (video.firstChild) video.removeChild(video.firstChild);

        function addSource(src, type) {
          if (!src) return;
          var s = document.createElement("source");
          s.src = src;
          if (type) s.type = type;
          video.appendChild(s);
        }

          if (videoSrc.toLowerCase().endsWith(".mp4") || (!videoSrc.toLowerCase().endsWith(".mov") && videoSrc)) {
            addSource(videoSrc, "video/mp4");
            addSource(fallbackSrc, "video/quicktime");
          } else {
            addSource(videoSrc, "video/quicktime");
            addSource(fallbackSrc, "video/mp4");
          }

          // Tự động phát ở chế độ tắt tiếng (muted) theo chuẩn autoplay của mọi trình duyệt
          video.muted = true;
          video.setAttribute("muted", "");
          video.playsInline = true;
          video.setAttribute("playsinline", "");
          video.setAttribute("webkit-playsinline", "");
          videoCard.hidden = false;

          var playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(function () {
              // Nếu autoplay bị chặn, đợi tương tác người dùng
              console.log("[love-days] Video autoplay was prevented, waiting for interaction");
            });
          }

          // Toggle âm thanh
          function toggleSound() {
            if (video.muted) {
              video.muted = false;
              soundIcon.textContent = "🔊";
              tapHint.textContent = "Đang bật âm thanh 💖";
              if (video.paused) video.play();
              if (window.LoveFX && window.LoveFX.toast) window.LoveFX.toast("Đã bật âm thanh video 🎶");
            } else {
              video.muted = true;
              soundIcon.textContent = "🔇";
              tapHint.textContent = "Chạm để nghe tiếng 🎵";
            }
          }

          soundBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            toggleSound();
          });

            videoBox.addEventListener("click", function (e) {
              if (e.target.closest("#video-fs-btn")) return;
              toggleSound();
            });

              // Toàn màn hình
              fsBtn.addEventListener("click", function (e) {
                e.stopPropagation();
                if (video.requestFullscreen) {
                  video.requestFullscreen();
                } else if (video.webkitRequestFullscreen) {
                  video.webkitRequestFullscreen();
                } else if (video.webkitEnterFullscreen) {
                  video.webkitEnterFullscreen(); // iOS Safari native
                }
              });

              video.addEventListener("error", function () {
                console.warn("[love-days] Không tải được video");
                videoCard.hidden = true;
              });
            }

  // Hook nhỏ để kiểm thử
  window.__loveDays = { diff: diff, parseStart: parseStart, start: start };
          })();
