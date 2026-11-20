/* login.js — cổng đăng nhập "cho vui" (không phải bảo mật thật) */
(function () {
  "use strict";
  var App = window.LoveApp;
  if (!App) return;

  var C = App.cfg.login;
  var $ = App.$;

  var card = $(".login-card");
  var form = $("#login-form");
  var userInput = $("#login-user");
  var passInput = $("#login-pass");
  var errorEl = $("#login-error");
  var submitBtn = $("#login-submit");
  var toggleBtn = $("#login-toggle");

  /* ----- Đổ nội dung từ config ----- */
  $("#login-eyebrow").textContent = C.eyebrow;
  $("#login-title").textContent = C.title;
  $("#login-message").textContent = C.message;
  $("#login-user-label").textContent = C.usernameLabel;
  $("#login-pass-label").textContent = C.passwordLabel;
  $("#login-hint").textContent = C.hint;
  submitBtn.textContent = C.buttonText;
  document.title = "Đăng nhập · " + App.cfg.site.title;

  /* ----- Xử lý ----- */
  var failCount = 0;
  var busy = false;

  function normalizeUser(v) { return String(v || "").trim().toLowerCase(); }

  function isValid(username, password) {
    var u = normalizeUser(username);
    var p = String(password || "");
    return C.accounts.some(function (acc) {
      return normalizeUser(acc.username) === u && String(acc.password) === p;
    });
  }

  function showError(message) {
    errorEl.textContent = message;
    errorEl.classList.add("is-visible");
  }
  function clearError() {
    errorEl.classList.remove("is-visible");
    userInput.classList.remove("is-error");
    passInput.classList.remove("is-error");
  }

  function fail(emptyField) {
    failCount++;
    var msg = emptyField
      ? "Em chưa điền đủ thông tin nè 🥺"
      : C.errorMessages[(failCount - 1) % C.errorMessages.length];
    showError(msg);
    (emptyField || passInput).classList.add("is-error");
    card.classList.remove("is-shaking");
    void card.offsetWidth; // restart animation
    card.classList.add("is-shaking");
    (emptyField || passInput).focus();
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (busy) return;
    clearError();

    if (!userInput.value.trim()) { fail(userInput); return; }
    if (!passInput.value) { fail(passInput); return; }

    if (!isValid(userInput.value, passInput.value)) { fail(null); return; }

    busy = true;
    card.classList.add("is-success");
    submitBtn.disabled = true;
    submitBtn.textContent = C.successText;
    showError(C.successText);
    if (window.LoveFX) window.LoveFX.burstFromElement(submitBtn, { count: 26 });

    App.advance(1);
    window.setTimeout(function () { App.go("question"); }, 1000);
  });

  [userInput, passInput].forEach(function (inp) {
    inp.addEventListener("input", clearError);
  });

  /* ----- Hiện / ẩn mật khẩu ----- */
  toggleBtn.addEventListener("click", function () {
    var show = passInput.type === "password";
    passInput.type = show ? "text" : "password";
    toggleBtn.textContent = show ? "🙈" : "👁️";
    toggleBtn.setAttribute("aria-pressed", String(show));
    toggleBtn.setAttribute("aria-label", show ? "Ẩn mật khẩu" : "Hiện mật khẩu");
    passInput.focus();
  });
})();
