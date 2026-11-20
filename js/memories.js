/* memories.js — trang kỷ niệm hoàn chỉnh: Lời nhắn nhủ, Hành trình (Timeline), Album 3D Parallax 63 ảnh xếp hình Trái Tim, Thư bí mật & CTA */
(function () {
  "use strict";

  var App = window.LoveApp;
  var CFG = window.LOVE_CONFIG || {};
  var M = CFG.memories || {};
  var $ = App ? App.$ : function (s) { return document.querySelector(s); };
  var el = App ? App.el : function (tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  };
  var FX = window.LoveFX;

  document.title = (M.title || "Những Kỷ Niệm") + " · " + (CFG.site ? CFG.site.title : "Gửi em");

  /* ---------- 1. Hero ---------- */
  if ($("#hero-eyebrow")) $("#hero-eyebrow").textContent = M.eyebrow || "I LOVE YOU";
  if ($("#hero-title")) $("#hero-title").textContent = M.title || "Những Kỷ Niệm";
  if ($("#hero-greeting")) $("#hero-greeting").textContent = M.greeting || "Gửi em, cô gái bé nhỏ của anh 🌸";
  if ($("#hero-sub")) $("#hero-sub").textContent = M.subGreeting || "Mỗi ngày bên em đều là một ngày đáng nhớ.";
  if ($("#hero-scroll-text")) $("#hero-scroll-text").textContent = M.scrollHint || "Cuộn xuống nhé";

  var heroScroll = $("#hero-scroll");
  if (heroScroll) {
    heroScroll.addEventListener("click", function (e) {
      e.preventDefault();
      var target = $("#letter");
      if (target) target.scrollIntoView({ behavior: (App && App.prefersReducedMotion()) ? "auto" : "smooth" });
    });
  }

  /* ---------- 2. Lời nhắn nhủ ---------- */
  if (M.letter) {
    if ($("#letter-title")) $("#letter-title").textContent = M.letter.heading || "Lời nhắn nhủ";
    var letterCard = $("#letter-card");
    if (letterCard && M.letter.paragraphs) {
      letterCard.textContent = "";
      M.letter.paragraphs.forEach(function (text, i) {
        var p = el("p", "reveal", text);
        p.style.setProperty("--reveal-delay", (i * 140) + "ms");
        letterCard.appendChild(p);
      });
      if (M.letter.signature) {
        letterCard.appendChild(el("p", "letter__sign reveal", M.letter.signature));
      }
    }
  }

  /* ---------- 3. Hành trình của chúng mình (Timeline) ---------- */
  if (M.timeline) {
    if ($("#timeline-title")) $("#timeline-title").textContent = M.timelineHeading || "Hành trình của chúng mình";
    var tl = $("#tl");
    if (tl) {
      tl.textContent = "";
      M.timeline.forEach(function (item) {
        var li = el("li", "tl-item reveal");
        var dot = el("span", "tl-item__dot", item.icon || "💗");
        dot.setAttribute("aria-hidden", "true");
        var card = el("div", "tl-item__card glass-card");
        card.appendChild(el("p", "tl-item__date", item.date));
        card.appendChild(el("h3", "tl-item__title", item.title));
        card.appendChild(el("p", "tl-item__text", item.text));
        li.appendChild(dot);
        li.appendChild(card);
        tl.appendChild(li);
      });
    }
  }

  /* ---------- 4. Album 3D Parallax & Xếp Trái Tim 63 ảnh ---------- */
  if ($("#album-title")) $("#album-title").textContent = M.albumHeading || "Khoảnh khắc của chúng mình";
  if ($("#album-hint")) $("#album-hint").textContent = M.albumHint || "Cuộn chuột hoặc Kéo thả để ngắm nhìn 63 khoảnh khắc bay lơ lửng, kéo hết sẽ xếp thành hình trái tim 💖";

  // Lấy danh sách 63 ảnh (từ M.photos hoặc M.album hoặc fallback)
  var photos = [];
  if (M.photos && M.photos.length) {
    photos = M.photos;
  } else if (M.album && M.album.length) {
    photos = M.album.map(function (item) { return typeof item === "string" ? item : item.src; });
  }

  if (!photos || photos.length === 0) {
    photos = [
      "../assets/images/voiu/090cb338-9211-41be-b691-8308d132f803.jpg",
      "../assets/images/voiu/096f3b3f-0765-4a74-84fb-712210acd3b3.jpg",
      "../assets/images/voiu/1e584458-c1bc-4903-827a-6d40141b5407.jpg",
      "../assets/images/voiu/1f4ee383-ae72-44c2-85f2-61ca04b60134.jpg",
      "../assets/images/voiu/346ac7db-1d8c-47d8-b953-2fe9bcfdf3c4.jpg",
      "../assets/images/voiu/3e401712-d42d-4a17-b0be-8830e5d95db5.jpg",
      "../assets/images/voiu/3fcc9028-cc6f-4e9a-b9d0-ef7b51c48b82.jpg",
      "../assets/images/voiu/4216f646-cb84-404c-a15f-a8cef7c80fc0.jpg",
      "../assets/images/voiu/4a8c6e65-3c8f-4913-944f-93744e645756.jpg",
      "../assets/images/voiu/5062cfc4-29a2-47af-b9a4-4176dc5dbdc0.jpg",
      "../assets/images/voiu/50e90052-db18-45e5-8cc4-4b141072ed9c.jpg",
      "../assets/images/voiu/5ffa3685-e5f3-43a0-9a59-94bc2b936583.jpg",
      "../assets/images/voiu/61636646-0048-461c-9751-e517d7858926.jpg",
      "../assets/images/voiu/6cd3c6ac-c57f-41cf-8e0c-5064192deb75.jpg",
      "../assets/images/voiu/6d6b5c09-2bf3-4305-884d-ef0869840352.jpg",
      "../assets/images/voiu/70729e85-7c1e-401b-a5f9-135f6876b379.jpg",
      "../assets/images/voiu/77145f5c-a24f-45cf-8264-5e62a77b0ffc.jpg",
      "../assets/images/voiu/7810ecd4-e751-4e12-bc9f-946e4dc8ec1c.jpg",
      "../assets/images/voiu/84ae8ac8-c428-4c29-ad7a-e4e281157aff.jpg",
      "../assets/images/voiu/861c9ec5-8131-4bd8-9302-94d091811c2e.jpg",
      "../assets/images/voiu/8b39bf84-c3b7-44aa-a019-19859063b115.jpg",
      "../assets/images/voiu/8dd31a63-1bb7-4cca-967f-b49d777d6cf4.jpg",
      "../assets/images/voiu/913911706_4757997561192640_3393465828015302039_n.jpg",
      "../assets/images/voiu/914709153_1036706792777774_2868359018357626688_n.jpg",
      "../assets/images/voiu/915007073_2114761182740525_735811725523718558_n.jpg",
      "../assets/images/voiu/915059309_1823858748833096_1557772640476995724_n.jpg",
      "../assets/images/voiu/915352737_1163070413324287_763802893583993701_n.jpg",
      "../assets/images/voiu/915492542_2433793890488827_9087440231976219577_n.jpg",
      "../assets/images/voiu/915546851_2058912958101836_1874329536924106457_n.jpg",
      "../assets/images/voiu/915603466_1485212390165248_4169490110662167187_n.jpg",
      "../assets/images/voiu/916072638_1950420862588006_4943050798826931551_n.jpg",
      "../assets/images/voiu/916580362_1601795085036288_2104418932695940737_n.jpg",
      "../assets/images/voiu/918196228_1144771121273419_3039577222127014083_n.jpg",
      "../assets/images/voiu/918647683_2499873907501157_250215051798342597_n.jpg",
      "../assets/images/voiu/918683932_29081235638172254_4797523679789236872_n.jpg",
      "../assets/images/voiu/919268526_4573675699616168_4728770523053294478_n.jpg",
      "../assets/images/voiu/919631213_2882111572170719_2193950947650346622_n.jpg",
      "../assets/images/voiu/920862328_1158707733180556_3784505003203116986_n.jpg",
      "../assets/images/voiu/921225266_1149925694307091_4182102668825203509_n.jpg",
      "../assets/images/voiu/921225280_2241455850050125_8877037846890062884_n.jpg",
      "../assets/images/voiu/921707729_1013683437746937_3497025888948136990_n.jpg",
      "../assets/images/voiu/921707729_1155349176949898_7308698609856276049_n.jpg",
      "../assets/images/voiu/987af69c-45ac-44f4-94fd-51b4d6216abc.jpg",
      "../assets/images/voiu/99d91970-9f78-4661-a5a2-93a35a01a55c.jpg",
      "../assets/images/voiu/a6fe88e5-9666-4acb-b34b-3c53af96e014.jpg",
      "../assets/images/voiu/a8637282-1616-40cb-a4c3-c1522c360a10.jpg",
      "../assets/images/voiu/att.M61g6HIqg3T6YCFhtzUdHkzRk3kjrCh3PW6Lg0r_hmI - Copy.JPG",
      "../assets/images/voiu/att.M61g6HIqg3T6YCFhtzUdHkzRk3kjrCh3PW6Lg0r_hmI.JPG",
      "../assets/images/voiu/b526ccd1-238e-4087-bc1e-3f0ee4ec4f5d.jpg",
      "../assets/images/voiu/b6ee196a-90de-40d9-9cd0-93db0e50ce29.jpg",
      "../assets/images/voiu/b7365720-9060-4f10-9ca9-59b6e8da021a.jpg",
      "../assets/images/voiu/bab65f5a-9585-446f-bc44-05ba393534ef.jpg",
      "../assets/images/voiu/bb2dbbab-cf49-4527-bf44-7d3c9894e103.jpg",
      "../assets/images/voiu/ce9451a0-7923-431f-acd5-f49d8ddf0934.jpg",
      "../assets/images/voiu/db039a43-cad4-4d8c-89a9-f46094230b1f.jpg",
      "../assets/images/voiu/dbecfb48-9521-4f32-b87b-3e4c20f52d47.jpg",
      "../assets/images/voiu/e2125cf2-150f-41a4-a95e-cbe27a00ccc3.jpg",
      "../assets/images/voiu/e58013e4-7537-4820-8001-54723abeee12.jpg",
      "../assets/images/voiu/ed53dd25-25b5-4c77-a6f2-3d1af2da23f6.jpg",
      "../assets/images/voiu/f955cb52-247e-4d23-b9fa-306fe6634209.jpg",
      "../assets/images/voiu/faf95ed7-0213-416f-9439-6461773be145.jpg",
      "../assets/images/voiu/fe4f8e5b-96a5-4909-bebd-7e97f0fb8907.jpg",
      "../assets/images/voiu/fefa9974-2da6-4a07-a868-4f4e3c4293fd.jpg"
    ];
  }

  var TOTAL_PHOTOS = photos.length;
  var box3D = $("#mem-3d-box");
  var viewport = $("#mem-viewport");
  var world = $("#mem-world");
  var hint3D = $("#mem-3d-hint");
  var dockFill = $("#dock-fill");
  var dockLabel = $("#dock-label");
  var dockSkipBtn = $("#dock-skip-btn");
  var heartCard = $("#mem-heart-card");
  var heartReplayBtn = $("#heart-replay-btn");

  if (CFG.couple && CFG.couple.her && $("#heart-card-title")) {
    $("#heart-card-title").textContent = "Gửi " + (CFG.couple.her.name || "Vợ Yêu") + " ❤️";
  }

  /* Toạ độ hình Trái Tim (63 điểm) */
  function heartEquation(t) {
    var x = 16 * Math.pow(Math.sin(t), 3);
    var y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    return { x: x, y: y };
  }

  var rawHeartPoints = [];
  // 38 điểm ở vành ngoài cùng
  for (var i = 0; i < 38; i++) {
    var t1 = (i / 38) * 2 * Math.PI;
    var p1 = heartEquation(t1);
    rawHeartPoints.push({ x: p1.x * 1.0, y: p1.y * 1.0 });
  }
  // 18 điểm ở vành giữa
  for (var j = 0; j < 18; j++) {
    var t2 = (j / 18) * 2 * Math.PI + 0.14;
    var p2 = heartEquation(t2);
    rawHeartPoints.push({ x: p2.x * 0.70, y: p2.y * 0.70 + 0.6 });
  }
  // 7 điểm ở lớp trong cùng
  for (var k = 0; k < 7; k++) {
    var t3 = (k / 7) * 2 * Math.PI;
    var p3 = heartEquation(t3);
    rawHeartPoints.push({ x: p3.x * 0.38, y: p3.y * 0.38 + 1.2 });
  }

  var heartScreenCoords = [];
  function updateHeartCoords() {
    if (!box3D) return;
    var bw = box3D.clientWidth || window.innerWidth;
    var bh = box3D.clientHeight || 600;
    var isMobile = bw < 600;

    var heartW = isMobile ? Math.min(bw * 0.94, 380) : Math.min(bw * 0.86, 740);
    var heartH = isMobile ? Math.min(bh * 0.72, 460) : Math.min(bh * 0.76, 580);

    var scaleX = heartW / 33;
    var scaleY = heartH / 35;

    heartScreenCoords = rawHeartPoints.map(function (p) {
      return {
        x: p.x * scaleX,
        y: (p.y + 1.8) * scaleY
      };
    });
  }
  updateHeartCoords();
  window.addEventListener("resize", updateHeartCoords);

  function pseudoRand(seed) {
    var s = Math.sin(seed) * 10000;
    return s - Math.floor(s);
  }

  var cardData = [];
  var TUNNEL_DEPTH = 4600;

  for (var n = 0; n < TOTAL_PHOTOS; n++) {
    var initialZ = -TUNNEL_DEPTH + (n / (TOTAL_PHOTOS - 1)) * (TUNNEL_DEPTH - 200);
    cardData.push({
      initialZ: initialZ,
      randX: (pseudoRand(n * 19.3 + 1) - 0.5) * 1.5,
      randY: (pseudoRand(n * 27.7 + 5) - 0.5) * 1.3,
      randRot: (pseudoRand(n * 13.1 + 9) - 0.5) * 26
    });
  }

  var cardElements = [];
  if (world) {
    world.textContent = "";
    photos.forEach(function (src, idx) {
      var card = document.createElement("div");
      card.className = "photo-card";
      card.setAttribute("data-index", idx);

      var inner = document.createElement("div");
      inner.className = "photo-card__inner";

      var img = document.createElement("img");
      img.src = src;
      img.alt = "Kỷ niệm " + (idx + 1);
      img.loading = idx < 12 ? "eager" : "lazy";
      img.decoding = "async";
      img.className = "photo-card__img";

      var num = document.createElement("span");
      num.className = "photo-card__num";
      num.textContent = (idx + 1 < 10 ? "0" : "") + (idx + 1);

      inner.appendChild(img);
      inner.appendChild(num);
      card.appendChild(inner);

      card.addEventListener("click", function () {
        openLightbox(idx);
      });

      world.appendChild(card);
      cardElements.push(card);
    });
  }

  /* Kéo thả & Cuộn chuột cho không gian 3D */
  var targetProgress = 0;
  var currentProgress = 0;
  var isDragging = false;
  var lastY = 0;
  var dragDistance = 0;
  var currentTiltX = 0;
  var currentTiltY = 0;
  var targetTiltX = 0;
  var targetTiltY = 0;

  if (viewport) {
    viewport.addEventListener("wheel", function (e) {
      e.preventDefault();
      var delta = e.deltaY;
      if (Math.abs(delta) < 4) delta = Math.sign(delta) * 4;
      targetProgress += delta * 0.00075;
      targetProgress = Math.max(0, Math.min(1, targetProgress));
    }, { passive: false });

    viewport.addEventListener("pointermove", function (e) {
      var rect = viewport.getBoundingClientRect();
      var mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      var my = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      targetTiltX = mx;
      targetTiltY = my;

      if (isDragging) {
        var dy = lastY - e.clientY;
        dragDistance += Math.abs(dy);
        lastY = e.clientY;
        targetProgress += dy * 0.0022;
        targetProgress = Math.max(0, Math.min(1, targetProgress));
      }
    });

    viewport.addEventListener("pointerdown", function (e) {
      if (e.target.closest("button") || e.target.closest("a")) return;
      isDragging = true;
      lastY = e.clientY;
      dragDistance = 0;
    });

    window.addEventListener("pointerup", function () { isDragging = false; });
    window.addEventListener("pointercancel", function () { isDragging = false; });
  }

  if (dockSkipBtn) {
    dockSkipBtn.addEventListener("click", function () {
      if (targetProgress >= 0.95) targetProgress = 0;
      else targetProgress = 1.0;
    });
  }

  if (heartReplayBtn) {
    heartReplayBtn.addEventListener("click", function () {
      targetProgress = 0;
    });
  }

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  var HEART_START_PROGRESS = 0.75;

  function render3D() {
    currentProgress += (targetProgress - currentProgress) * 0.07;
    currentTiltX += (targetTiltX - currentTiltX) * 0.08;
    currentTiltY += (targetTiltY - currentTiltY) * 0.08;

    if (box3D) {
      var bw = box3D.clientWidth || window.innerWidth;
      var bh = box3D.clientHeight || 600;
      var isMobile = bw < 600;

      var percent = Math.round(currentProgress * 100);
      if (dockFill) dockFill.style.width = percent + "%";
      if (dockLabel) dockLabel.textContent = percent + "%";

      if (hint3D) {
        if (currentProgress > 0.06) hint3D.classList.add("is-faded");
        else hint3D.classList.remove("is-faded");
      }

      if (world) {
        world.style.transform = "rotateX(" + (-currentTiltY * 6) + "deg) rotateY(" + (currentTiltX * 8) + "deg)";
      }

      var heartWeight = 0;
      if (currentProgress >= HEART_START_PROGRESS) {
        var norm = (currentProgress - HEART_START_PROGRESS) / (1 - HEART_START_PROGRESS);
        heartWeight = easeInOutCubic(Math.min(1, Math.max(0, norm)));
      }

      if (currentProgress >= 0.97) {
        if (world) world.classList.add("is-heart-pulsing");
        if (heartCard) {
          heartCard.classList.add("is-visible");
          heartCard.setAttribute("aria-hidden", "false");
        }
        if (dockSkipBtn) dockSkipBtn.textContent = "↺ Xem lại";
      } else {
        if (world) world.classList.remove("is-heart-pulsing");
        if (heartCard) {
          heartCard.classList.remove("is-visible");
          heartCard.setAttribute("aria-hidden", "true");
        }
        if (dockSkipBtn) dockSkipBtn.textContent = "💖 Xếp Trái Tim";
      }

      var cameraZ = currentProgress * (TUNNEL_DEPTH + 400);

      for (var i = 0; i < TOTAL_PHOTOS; i++) {
        var data = cardData[i];
        var cardEl = cardElements[i];
        if (!cardEl) continue;
        var targetHeart = heartScreenCoords[i] || { x: 0, y: 0 };

        var scatterZ = data.initialZ + cameraZ;
        var scatterX = data.randX * bw * 0.72;
        var scatterY = data.randY * bh * 0.62;
        var scatterRot = data.randRot;

        var posX = lerp(scatterX, targetHeart.x, heartWeight);
        var posY = lerp(scatterY, targetHeart.y, heartWeight);
        var posZ = lerp(scatterZ, 0, heartWeight);
        var rotZ = lerp(scatterRot, 0, heartWeight);

        var baseScale = 1.0;
        var heartScale = isMobile ? 0.38 : 0.52;
        var currentScale = lerp(baseScale, heartScale, heartWeight);

        var opacity = 1;
        if (heartWeight < 0.95) {
          if (scatterZ < -3800) opacity = Math.max(0, (scatterZ + 4600) / 800);
          else if (scatterZ > 300) opacity = Math.max(0, 1 - (scatterZ - 300) / 400);
        }

        if (scatterZ > 800 && heartWeight === 0) {
          cardEl.style.display = "none";
          continue;
        } else {
          cardEl.style.display = "block";
        }

        var zIndex = Math.round(heartWeight > 0.8 ? i + 10 : posZ + 5000);
        cardEl.style.zIndex = zIndex;
        cardEl.style.opacity = opacity.toFixed(3);
        cardEl.style.transform = "translate3d(" + posX.toFixed(1) + "px, " + posY.toFixed(1) + "px, " + posZ.toFixed(1) + "px) rotateZ(" + rotZ.toFixed(1) + "deg) scale(" + currentScale.toFixed(3) + ")";
      }
    }

    requestAnimationFrame(render3D);
  }
  requestAnimationFrame(render3D);

  /* ---------- 5. Thông điệp bí mật ---------- */
  if (M.secret) {
    if ($("#secret-title")) $("#secret-title").textContent = M.secret.heading || "Thông điệp bí mật";
    if ($("#secret-hint")) $("#secret-hint").textContent = M.secret.hint || "Chạm vào phong thư để mở 💌";
    if ($("#secret-note-title")) $("#secret-note-title").textContent = M.secret.title || "Chỉ dành riêng cho em";

    var env = $("#env");
    var note = $("#secret-note");
    var noteText = $("#secret-note-text");
    var typeTimer = null;

    function typeMessage(text) {
      window.clearTimeout(typeTimer);
      if (App && App.prefersReducedMotion()) { noteText.textContent = text; return; }
      var chars = Array.from(text);
      var idx = 0;
      var caret = el("span", "caret");
      noteText.textContent = "";
      noteText.appendChild(caret);

      function step() {
        if (idx >= chars.length) {
          window.setTimeout(function () { if (caret.parentNode) caret.remove(); }, 1200);
          return;
        }
        var ch = chars[idx++];
        caret.insertAdjacentText("beforebegin", ch);
        var delay = (ch === "." || ch === "!" || ch === "?" || ch === "\n") ? 220 : (ch === "," ? 110 : 32);
        typeTimer = window.setTimeout(step, delay);
      }
      step();
    }

    if (env && note && noteText) {
      env.addEventListener("click", function () {
        var open = env.classList.toggle("is-open");
        note.classList.toggle("is-open", open);
        env.setAttribute("aria-expanded", String(open));
        if (open) {
          if (FX) { FX.burstFromElement(env, { count: 30, spread: 220 }); FX.rain(1200); }
          window.setTimeout(function () { typeMessage(M.secret.message || ""); }, 450);
          window.setTimeout(function () {
            note.scrollIntoView({ behavior: (App && App.prefersReducedMotion()) ? "auto" : "smooth", block: "center" });
          }, 650);
        } else {
          window.clearTimeout(typeTimer);
        }
      });
    }
  }

  /* ---------- 6. CTA & Điều hướng ---------- */
  if (M.cta) {
    if ($("#cta-text")) $("#cta-text").textContent = M.cta.text || "";
    if ($("#cta-btn")) $("#cta-btn").textContent = M.cta.button || "Xem Love Days 💞";
  }

  if (App && App.$$) {
    App.$$("[data-go]").forEach(function (a) {
      a.addEventListener("click", function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
        e.preventDefault();
        if (FX && a.id === "cta-btn") FX.burstFromElement(a, { count: 24 });
        App.go(a.getAttribute("data-go"));
      });
    });
  }

  var replayBtn = $("#replay");
  if (replayBtn) {
    replayBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (App) {
        App.reset();
        App.go("login");
      }
    });
  }

  /* ---------- Lightbox phóng to ảnh ---------- */
  var lb = $("#lightbox");
  var lbMedia = $("#lb-media");
  var lbCaption = $("#lb-caption");
  var lbClose = $("#lb-close");
  var lbPrev = $("#lb-prev");
  var lbNext = $("#lb-next");
  var currentLbIndex = 0;

  function openLightbox(idx) {
    if (dragDistance > 10) return;
    currentLbIndex = idx;
    showLbImage(idx);
    if (lb) {
      lb.classList.add("is-open");
      lb.setAttribute("aria-hidden", "false");
    }
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (lb) {
      lb.classList.remove("is-open");
      lb.setAttribute("aria-hidden", "true");
    }
    document.body.style.overflow = "";
  }

  function showLbImage(idx) {
    if (!lbMedia) return;
    lbMedia.textContent = "";
    var img = document.createElement("img");
    img.src = photos[idx];
    img.alt = "Kỷ niệm " + (idx + 1);
    lbMedia.appendChild(img);
    if (lbCaption) lbCaption.textContent = "Khoảnh khắc " + (idx + 1) + " / " + TOTAL_PHOTOS + " 🌸";
  }

  if (lbClose) lbClose.addEventListener("click", closeLightbox);
  if (lbPrev) {
    lbPrev.addEventListener("click", function (e) {
      e.stopPropagation();
      currentLbIndex = (currentLbIndex - 1 + TOTAL_PHOTOS) % TOTAL_PHOTOS;
      showLbImage(currentLbIndex);
    });
  }
  if (lbNext) {
    lbNext.addEventListener("click", function (e) {
      e.stopPropagation();
      currentLbIndex = (currentLbIndex + 1) % TOTAL_PHOTOS;
      showLbImage(currentLbIndex);
    });
  }
  if (lb) {
    lb.addEventListener("click", function (e) {
      if (e.target === lb) closeLightbox();
    });
  }
  window.addEventListener("keydown", function (e) {
    if (!lb || !lb.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft" && lbPrev) lbPrev.click();
    else if (e.key === "ArrowRight" && lbNext) lbNext.click();
  });

  /* ---------- Hiệu ứng Reveal khi cuộn trang ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-visible");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (node) { io.observe(node); });
  } else {
    revealEls.forEach(function (node) { node.classList.add("is-visible"); });
  }

})();
