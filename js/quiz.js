/* quiz.js — Quiz thấu hiểu: chấm điểm theo config, cần ≥ passPercent mới qua */
(function () {
  "use strict";
  var App = window.LoveApp;
  if (!App) return;

  var C = App.cfg.quiz;
  var $ = App.$;
  var el = App.el;

  var screens = { intro: $("#quiz-intro"), play: $("#quiz-play"), result: $("#quiz-result") };
  var startBtn = $("#quiz-start");
  var prevBtn = $("#quiz-prev");
  var nextBtn = $("#quiz-next");
  var bodyEl = $("#quiz-body");
  var questionEl = $("#quiz-question");
  var optionsEl = $("#quiz-options");
  var stepEl = $("#quiz-step");
  var topicEl = $("#quiz-topic");
  var progressEl = $("#quiz-progress");
  var progressBar = $("#quiz-progress-bar");

  /* ----- Chuẩn hoá dữ liệu câu hỏi từ config ----- */
  var QUESTIONS = (C.questions || []).map(function (q, qi) {
    var options = (q.options || []).map(function (o) {
      return typeof o === "string" ? { text: o, icon: "" } : { text: String(o.text), icon: o.icon || "" };
    });
    var correct = Array.isArray(q.answer) ? q.answer : [q.answer];
    correct = correct.filter(function (n) { return Number.isInteger(n) && n >= 0 && n < options.length; });
    if (!correct.length) console.warn("[quiz] Câu " + (qi + 1) + " chưa có đáp án đúng hợp lệ trong config.js");
    return { topic: q.topic || "", question: String(q.question), options: options, correct: correct };
  });
  var N = QUESTIONS.length;

  /* ----- Trạng thái ----- */
  var answers = [];      // answers[i] = chỉ số GỐC của đáp án được chọn (null = chưa chọn)
  var orders = [];       // orders[i] = thứ tự hiển thị các đáp án (mảng chỉ số gốc)
  var current = 0;
  var finished = false;

  function shuffled(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  // Xoá sạch lựa chọn + kết quả của lần làm trước
  function resetState() {
    answers = QUESTIONS.map(function () { return null; });
    orders = QUESTIONS.map(function (q) {
      var idx = q.options.map(function (_, i) { return i; });
      return C.shuffleOptions ? shuffled(idx) : idx;
    });
    current = 0;
    finished = false;
  }

  /* ----- Chuyển màn ----- */
  function showScreen(name) {
    Object.keys(screens).forEach(function (k) {
      var on = k === name;
      screens[k].hidden = !on;
      screens[k].classList.remove("is-in");
      if (on) { void screens[k].offsetWidth; screens[k].classList.add("is-in"); }
    });
  }

  /* ----- Vẽ câu hỏi ----- */
  function render(direction) {
    var q = QUESTIONS[current];
    stepEl.textContent = "Câu " + (current + 1) + "/" + N;
    topicEl.textContent = q.topic;
    var pct = Math.round(((current + 1) / N) * 100);
    progressBar.style.width = pct + "%";
    progressEl.setAttribute("aria-valuenow", String(pct));
    questionEl.textContent = q.question;

    optionsEl.textContent = "";
    orders[current].forEach(function (origIdx, pos) {
      var opt = q.options[origIdx];
      var btn = el("button", "quiz-option");
      btn.type = "button";
      btn.setAttribute("role", "radio");
      btn.setAttribute("data-index", String(origIdx));
      var selected = answers[current] === origIdx;
      btn.setAttribute("aria-checked", String(selected));
      if (selected) btn.classList.add("is-selected");

      var icon = el("span", "quiz-option__icon", opt.icon || String.fromCharCode(65 + pos));
      icon.setAttribute("aria-hidden", "true");
      btn.appendChild(icon);
      btn.appendChild(el("span", "quiz-option__text", opt.text));
      var check = el("span", "quiz-option__check", "✓");
      check.setAttribute("aria-hidden", "true");
      btn.appendChild(check);
      optionsEl.appendChild(btn);
    });

    var last = current === N - 1;
    nextBtn.textContent = last ? "Xem kết quả 💖" : "Tiếp theo →";
    nextBtn.disabled = answers[current] === null;
    prevBtn.classList.toggle("is-invisible", current === 0);
    prevBtn.tabIndex = current === 0 ? -1 : 0;

    bodyEl.classList.remove("is-next", "is-prev");
    if (direction) { void bodyEl.offsetWidth; bodyEl.classList.add(direction === "next" ? "is-next" : "is-prev"); }
  }

  function select(origIdx, btn) {
    if (finished) return;
    answers[current] = origIdx;
    $$all(".quiz-option").forEach(function (b) {
      var on = b === btn;
      b.classList.toggle("is-selected", on);
      b.setAttribute("aria-checked", String(on));
    });
    nextBtn.disabled = false;
    if (window.LoveFX) window.LoveFX.burstFromElement(btn.querySelector(".quiz-option__check"), { count: 8, spread: 70 });
  }
  function $$all(sel) { return App.$$(sel, optionsEl); }

  optionsEl.addEventListener("click", function (e) {
    var btn = e.target.closest(".quiz-option");
    if (!btn) return;
    select(parseInt(btn.getAttribute("data-index"), 10), btn);
  });

  nextBtn.addEventListener("click", function () {
    if (answers[current] === null || finished) return;
    if (current < N - 1) { current++; render("next"); questionEl.focus({ preventScroll: true }); }
    else showResult();
  });
  prevBtn.addEventListener("click", function () {
    if (current > 0 && !finished) { current--; render("prev"); questionEl.focus({ preventScroll: true }); }
  });

  // Phím tắt: 1-9 chọn đáp án, Enter = tiếp
  document.addEventListener("keydown", function (e) {
    if (screens.play.hidden || finished) return;
    if (e.key >= "1" && e.key <= "9") {
      var btn = optionsEl.children[parseInt(e.key, 10) - 1];
      if (btn) btn.click();
    } else if (e.key === "Enter" && !nextBtn.disabled && document.activeElement && !document.activeElement.classList.contains("quiz-option") && document.activeElement !== prevBtn) {
      nextBtn.click();
    }
  });

  /* ----- Chấm điểm ----- */
  function grade() {
    var correct = 0;
    QUESTIONS.forEach(function (q, i) {
      if (answers[i] !== null && q.correct.indexOf(answers[i]) !== -1) correct++;
    });
    var percent = N ? (correct / N) * 100 : 0;
    var passed = N > 0 && correct * 100 >= C.passPercent * N; // so sánh số nguyên, tránh sai số float
    return { correct: correct, total: N, percent: percent, passed: passed };
  }

  var RING_LEN = 326.73;
  function showResult() {
    finished = true;
    var r = grade();
    var M = C.messages;
    var ring = $("#quiz-ring");
    var bar = $("#quiz-ring-bar");

    ring.classList.toggle("is-fail", !r.passed);
    $("#quiz-score").textContent = r.correct + "/" + r.total + " câu đúng";
    $("#quiz-result-title").textContent = r.passed ? M.passTitle : M.failTitle;
    $("#quiz-result-text").textContent = r.passed ? M.passText : M.failText;
    var btn = $("#quiz-result-btn");
    btn.textContent = r.passed ? M.continueButton : M.retryButton;
    btn.className = "btn btn--lg" + (r.passed ? " btn--glow" : " btn--soft");
    btn.setAttribute("data-result", r.passed ? "pass" : "fail");

    showScreen("result");

    // Vòng tròn + số % chạy
    bar.style.transition = "none";
    bar.style.strokeDashoffset = String(RING_LEN);
    void bar.getBoundingClientRect();
    bar.style.transition = "";
    var shown = Math.round(r.percent);
    window.requestAnimationFrame(function () {
      bar.style.strokeDashoffset = String(RING_LEN * (1 - r.percent / 100));
    });
    countUp($("#quiz-percent"), shown, 1100);

    if (r.passed) {
      App.advance(3); // mở khoá trang loading ngay khi đạt
      window.setTimeout(function () { if (window.LoveFX) window.LoveFX.rain(1800); }, 350);
    }
  }

  function countUp(node, to, ms) {
    if (App.prefersReducedMotion() || to === 0) { node.textContent = to + "%"; return; }
    var t0 = performance.now();
    (function step(now) {
      var k = Math.min(1, (now - t0) / ms);
      node.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))) + "%";
      if (k < 1) window.requestAnimationFrame(step);
    })(t0);
  }

  $("#quiz-result-btn").addEventListener("click", function () {
    var passed = this.getAttribute("data-result") === "pass";
    if (passed) {
      this.disabled = true;
      App.go("loading");
    } else {
      startQuiz(); // làm lại TOÀN BỘ từ câu đầu, xoá mọi lựa chọn cũ
    }
  });

  /* ----- Bắt đầu / làm lại ----- */
  function startQuiz() {
    resetState();
    showScreen("play");
    render(null);
    questionEl.focus({ preventScroll: true });
  }

  /* ----- Khởi tạo ----- */
  $("#quiz-eyebrow").textContent = C.eyebrow;
  $("#quiz-title").textContent = C.title;
  $("#quiz-intro-text").textContent = C.intro;
  document.title = C.eyebrow + " · " + App.cfg.site.title;

  resetState();
  if (!N) {
    $("#quiz-intro-text").textContent = "Chưa có câu hỏi nào. Hãy thêm câu hỏi trong js/config.js nhé!";
    startBtn.disabled = true;
  }
  startBtn.addEventListener("click", startQuiz);

  // Hook nhỏ để kiểm thử / debug
  window.__quiz = { grade: grade, get answers() { return answers.slice(); }, get current() { return current; } };
})();
