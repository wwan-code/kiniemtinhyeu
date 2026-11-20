/* ==========================================================================
   config.js  —  TOÀN BỘ NỘI DUNG CÁ NHÂN HÓA NẰM Ở ĐÂY 💕
   --------------------------------------------------------------------------
   Chỉ cần sửa file này là đổi được: tài khoản đăng nhập, ngày yêu nhau,
   câu hỏi Quiz + đáp án đúng, thư tình, kỷ niệm, ảnh, thông điệp bí mật...
   Không cần đụng vào logic ở các file js khác.
   ========================================================================== */

window.LOVE_CONFIG = {

  /* ----------------------------------------------------------------------
     0) CHUNG
     ---------------------------------------------------------------------- */
  site: {
    title: "Gửi em, người anh thương ❤️",
    // true  = nhớ tiến trình (đóng tab mở lại vẫn ở bước đang dở) – lưu bằng localStorage
    // false = mỗi lần mở trình duyệt lại bắt đầu từ trang đăng nhập – lưu bằng sessionStorage
    rememberProgress: true,
    // true = TẮT cơ chế khoá luồng (nhảy tự do giữa các trang để kiểm thử). Nhớ để false khi tặng!
    devMode: false
  },

  couple: {
    her: { name: "Vợ iu", nickname: "vợ" },   // tên / cách gọi bạn gái
    him: { name: "Anh", nickname: "anh" }   // tên / cách gọi của bạn
  },

  /* ----------------------------------------------------------------------
     1) TRANG ĐĂNG NHẬP
     Có thể thêm nhiều tài khoản. Tên đăng nhập không phân biệt hoa/thường.
     ⚠️ Đây chỉ là "cổng chào" cho vui, KHÔNG phải bảo mật thật sự.
     ---------------------------------------------------------------------- */
  login: {
    accounts: [
      { username: "vo", password: "anhiuem" },
      { username: "vo", password: "anhyeuem" },
      { username: "be", password: "anhiuem" },
      { username: "be", password: "anhyeuem" }
    ],
    eyebrow: "Welcome my love",
    title: "Chào em yêu 💕",
    message: "Có một món quà nhỏ đang chờ em phía sau cánh cửa này…",
    usernameLabel: "Tên đăng nhập",
    passwordLabel: "Mật khẩu",
    hint: "Gợi ý: mật khẩu là một câu 3 chữ anh hay nói với em 🤭, còn tài khoản là tên anh gọi em",
    buttonText: "Mở cánh cửa tình yêu",
    successText: "Đúng rồi nè! Đang mở cửa… 💖",
    errorMessages: [
      "Ơ, sai mất rồi… thử lại nha vợ 🥺",
      "Chưa đúng đâu bé ơi, nghĩ kỹ lại xem 🤔",
      "Hihi, gần đúng rồi đó… (chắc vậy 😝)",
      "Hay là em chưa yêu anh nữa? 😭 Thử lại đi mà!"
    ]
  },

  /* ----------------------------------------------------------------------
     2) TRANG HỎI ĐÁP TÌNH YÊU
     ---------------------------------------------------------------------- */
  question: {
    eyebrow: "Một câu hỏi nhỏ thôi…",
    text: "Hỏi em có yêu anh không?",
    yesText: "Có em iu anh nhìu lắm ❤️",
    noText: "Không 💔",

    // Số lần "cố bấm Không" thì nút Không thu nhỏ hoàn toàn rồi biến mất
    noMaxClicks: 8,
    // Mỗi lần bấm Không, nút Có to thêm bao nhiêu (1 = 100% cỡ gốc). VD 0.22 => +22%/lần
    yesGrowStep: 0.22,
    // true  = chạm chuột vào nút Không (không cần bấm) cũng khiến nó chạy trốn (không tính lượt)
    // false = chỉ chạy trốn khi bị bấm
    dodgeOnHover: false,

    // Lời nhắn (bong bóng) hiện ra sau mỗi lần bấm Không – theo thứ tự
    noReactions: [
      { emoji: "🥺", text: "Ơ kìa… bấm nhầm rồi đúng không?" },
      { emoji: "😢", text: "Em nghĩ lại đi mà…" },
      { emoji: "🥹", text: "Nút Không đang sợ lắm đó nha" },
      { emoji: "😭", text: "Đừng bấm Không nữa, anh buồn…" },
      { emoji: "🙈", text: "Nó nhỏ xíu rồi, tội nghiệp ghê" },
      { emoji: "🫣", text: "Chạy đi nút Không ơi!" },
      { emoji: "😤", text: "Em cứng đầu quá à nha" },
      { emoji: "😘", text: "Thôi nhận đi, em yêu anh mà!" }
    ],
    noGoneText: "Thấy chưa, em chỉ còn một lựa chọn thôi 😘",
    defaultEmoji: "🥰"
  },

  /* ----------------------------------------------------------------------
     3) QUIZ – "Em hiểu anh được bao nhiêu?"
     - answer: vị trí đáp án ĐÚNG (đếm từ 0). Có thể là mảng nếu nhiều đáp án đều đúng, VD: [0, 2]
     - icon: emoji hiển thị trước đáp án (tuỳ chọn)
     ⭐ Các câu hỏi/đáp án dưới đây chỉ là MẪU – hãy thay bằng thông tin thật về bạn!
     ---------------------------------------------------------------------- */
  quiz: {
    eyebrow: "Thử thách tình yêu",
    title: "Em hiểu anh được bao nhiêu?",
    intro: "Trả lời đúng từ 90% trở lên để mở khoá món quà nhé 💝",
    passPercent: 90,
    shuffleOptions: false, // true = xáo trộn thứ tự đáp án mỗi lần làm

    messages: {
      passTitle: "Tuyệt vời! Em hiểu anh quá trời luôn 🥰",
      passText: "Em xứng đáng nhận món quà này. Đi nào!",
      failTitle: "Chưa đủ hiểu anh rồi bé ơi 🥺",
      failText: "Em cần đạt từ 90% mới được qua. Cố lên, làm lại từ đầu nha!",
      retryButton: "Làm lại từ đầu 🔄",
      continueButton: "Tiếp tục 💕"
    },

    questions: [
      {
        topic: "Món ăn yêu thích",
        question: "Món ăn anh mê nhất là gì?",
        options: [
          { text: "Phở bò", icon: "" },
          { text: "Bún bò", icon: "" },
          { text: "Bánh mì", icon: "" },
          { text: "Cơm tấm", icon: "" }
        ],
        answer: 2
      },
      {
        topic: "Đồ uống yêu thích",
        question: "Ra quán, anh thường gọi gì đầu tiên?",
        options: [
          { text: "Trà sữa", icon: "🧋" },
          { text: "Cà phê sữa đá", icon: "☕" },
          { text: "Nước cam", icon: "🍊" },
          { text: "Trà đào", icon: "🍑" }
        ],
        answer: 3
      },
      {
        topic: "Màu sắc yêu thích",
        question: "Màu anh thích nhất là màu nào?",
        options: [
          { text: "Hồng", icon: "🩷" },
          { text: "Đỏ", icon: "❤️" },
          { text: "Xanh", icon: "💙" },
          { text: "Đen", icon: "🖤" }
        ],
        answer: 2
      },
      {
        topic: "Thói quen",
        question: "Thói quen không thể thiếu của anh mỗi tối trước khi chìm vào giấc ngủ là gì?",
        options: [
          { text: "Chơi game", icon: "🎮" },
          { text: "Lướt tít tót", icon: "😴" },
          { text: "Côn với em", icon: "☕" },
          { text: "Xem phim", icon: "🎬" }
        ],
        answer: 2
      },
      {
        topic: "Địa điểm muốn cùng đi",
        question: "Địa điểm mà anh mơ ước được nắm tay em cùng đi nhất?",
        options: [
          { text: "Biển", icon: "🏖️" },
          { text: "Công viên", icon: "🌲" },
          { text: "Bất cứ nơi nào, miễn có em bên cạnh", icon: "🗼" },
          { text: "Đi khách sạn", icon: "🏡" }
        ],
        answer: 2
      },
      {
        topic: "Điều khiến anh hạnh phúc",
        question: "Điều gì làm anh hạnh phúc nhất?",
        options: [
          { text: "Được khen", icon: "🏅" },
          { text: "Em nhắn tin trước", icon: "💌" },
          { text: "Được em iu và quan tâm", icon: "😋" },
          { text: "Nhận quà bất ngờ", icon: "🎁" }
        ],
        answer: 2
      },
      {
        topic: "Cảm xúc",
        question: "Điều gì có thể xóa tan mọi mệt mỏi áp lực trong ngày của anh ngay lập tức?",
        options: [
          { text: "Được ngủ 12 tiếng", icon: "" },
          { text: "Được thấy gương mặt xinh đẹp và nụ cười rạng rỡ của em", icon: "" },
          { text: "Xem ấy", icon: "" }
        ],
        answer: 1
      },
      {
        topic: "Điều anh không thích",
        question: "Điều anh ghét nhất là gì?",
        options: [
          { text: "Trời nắng nóng", icon: "🥵" },
          { text: "Bị cho leo cây", icon: "🌳" },
          { text: "Chờ đợi lâu", icon: "⏳" },
          { text: "Nói dối", icon: "🤥" }
        ],
        answer: 3
      },
      {
        topic: "Điều anh không muốn em làm",
        question: "Anh không muốn em làm gì nhất?",
        options: [
          { text: "Giận mà không nói", icon: "😶" },
          { text: "Nhắn tin với người khác mà bơ anh", icon: "🍦" },
          { text: "Thức khuya", icon: "🌙" },
          { text: "Đi đường một mình", icon: "🚶‍♀️" }
        ],
        answer: 0
      },
      {
        topic: "Điều anh mong muốn trong tình yêu",
        question: "Điều anh mong muốn nhất ở tình yêu của mình?",
        options: [
          { text: "Thật nhiều quà", icon: "🎀" },
          { text: "Đi du lịch khắp nơi", icon: "✈️" },
          { text: "Luôn thành thật & tin tưởng nhau, đặt đối phương lên hàng đầu, luôn coi là sự ưu tiên", icon: "🤝" },
          { text: "Ngày nào cũng gặp", icon: "📅" }
        ],
        answer: 2
      },
      {
        topic: "Điều đặc biệt",
        question: "Anh hay gọi em bằng biệt danh nào nhất?",
        options: [
          { text: "Bé yêu", icon: "🐰" },
          { text: "Cục cưng", icon: "🍡" },
          { text: "Vợ iu", icon: "💍" },
          { text: "Heo con", icon: "🐷" }
        ],
        answer: 2
      }
    ]
  },

  /* ----------------------------------------------------------------------
     4) TRANG LOADING
     ---------------------------------------------------------------------- */
  loading: {
    durationMs: 7000,           // thời gian chạy thanh loading
    title: "LOADING LOVE",
    doneBarText: "Ok rùi đó :)",
    buttonText: "Click Me ❤️",
    messages: [
      "Đang gói ghém một món quà nhỏ…",
      "Đang gom những kỷ niệm của chúng mình…",
      "Đang rắc thêm chút lấp lánh…",
      "Đang thêm thật nhiều yêu thương…",
      "Sắp xong rồi, em chờ xíu nha…"
    ],
    doneMessage: "Món quà đã sẵn sàng! Bấm nút để mở nhé 💝"
  },

  /* ----------------------------------------------------------------------
     5) TRANG KỶ NIỆM
     Ảnh: đặt file vào assets/images/ rồi ghi đường dẫn, VD: "../assets/images/anh1.jpg"
     (đường dẫn tính từ thư mục pages/). Để trống src => hiện khung màu + emoji.
     ---------------------------------------------------------------------- */
  memories: {
    eyebrow: "I love you",
    title: "Những Kỷ Niệm",
    greeting: "Gửi em, cô gái bé nhỏ của anh 🌸",
    subGreeting: "Mỗi ngày bên em đều là một ngày đáng nhớ.",
    scrollHint: "Cuộn xuống nhé",

    letter: {
      heading: "Lời nhắn nhủ",
      paragraphs: [
        "Gửi em yêu của anh,",
        "Cảm ơn em đã xuất hiện, đã chọn ở lại và cùng anh đi qua những ngày vui lẫn những ngày chẳng mấy dễ dàng.",
        "Anh không phải người hay nói lời hoa mỹ, nhưng anh luôn trân trọng từng cái nắm tay, từng tin nhắn, mặc dù em hông mấy hỏi han anh nhưng anh vẫn iu em vì lần đầu tiên anh gặp phải một cô bé có tính cách đáng iu như này nó thật mới mẻ đối với anh, anh yêu cái tính cách này của em cũng như con người của em, những ngày đầu gặp nhau anh với em như 2 người lạ vậy mới có quen mấy ngày mà tỏ tình mà em cũng đồng ý rùi lúc đó anh vui lắm, tỏ tình xong đi chơi cả 2 chẳng bít nói gì cứ ngượng ngạo dị trông cute vãi:) anh trân trọng những ngày đó, và cả những lần em giận dỗi đáng yêu.",
        "Mong rằng sau này, dù đi đến đâu, anh vẫn là người được nắm tay em thật chặt."
      ],
      signature: "— Người luôn yêu em, anh 💗"
    },

    timelineHeading: "Hành trình của chúng mình",
    timeline: [
      { date: "Lần đầu gặp nhau", icon: "🌷", title: "Khoảnh khắc đầu tiên", text: "Anh vẫn nhớ rất rõ hôm đó, em cười và cả thế giới như sáng lên, lúc đó mặc dù kí ức hông tốt lành mấy nhưng anh vẫn nhớ lúc anh nhìn thấy em anh đã mê như điếu đỗ rùi, em xinh quá anh ngại một người như anh thì em sẽ không chịu." },
      { date: "Buổi hẹn đầu tiên", icon: "☕", title: "Đi cà hê", text: "Bữa hẹn đầu tin mò có thêm con Lon nên anh có hơi ngại và hong bít nói gì, lúc đó cả 2 chẳng nói chiện gì mấy với nhau thật sự lúc đó anh nghĩ sẽ hong có cơ hội được quen với em tới tận giờ đâu" },
      { date: "Buổi Date riêng anh với em & Ngày mình chính thức yêu", icon: "💞", title: "Một lời \"đồng ý\"", text: "Là ngày anh vui nhất năm. Cả 2 cùng đi xem phim, xong đi cà phê mà cả 2 đều ngại ngùng nó đáng iu mà nó hài gì đâu:)). Lúc tối khoảng 9h, đi về nhà ngoại em, anh tỏ tình em rùi em đồng ý, và mọi thứ bắt đầu." },
      { date: "Chuyến đi đầu tiên", icon: "🌊", title: "Cùng nhau ra biển", text: "Cát, nắng, gió và em cười tít mắt. Anh chỉ muốn thời gian dừng lại." },
      { date: "Hôm nay", icon: "🎀", title: "Và còn nhiều điều nữa", text: "Câu chuyện của mình vẫn đang được viết tiếp, từng ngày một." }
    ],

    albumHeading: "Album của chúng mình",
    albumHint: "Chạm vào ảnh để xem lớn",
    // 63 ảnh kỷ niệm trong assets/images/voiu/
    photos: [
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
    ],

    album: [
      {
        "src": "../assets/images/voiu/1e584458-c1bc-4903-827a-6d40141b5407.jpg",
        "caption": "Kỷ niệm 01"
      },
      {
        "src": "../assets/images/voiu/1f4ee383-ae72-44c2-85f2-61ca04b60134.jpg",
        "caption": "Kỷ niệm 02"
      },
      {
        "src": "../assets/images/voiu/3e401712-d42d-4a17-b0be-8830e5d95db5.jpg",
        "caption": "Kỷ niệm 03"
      },
      {
        "src": "../assets/images/voiu/3fcc9028-cc6f-4e9a-b9d0-ef7b51c48b82.jpg",
        "caption": "Kỷ niệm 04"
      },
      {
        "src": "../assets/images/voiu/4a8c6e65-3c8f-4913-944f-93744e645756.jpg",
        "caption": "Kỷ niệm 05"
      },
      {
        "src": "../assets/images/voiu/5ffa3685-e5f3-43a0-9a59-94bc2b936583.jpg",
        "caption": "Kỷ niệm 06"
      },
      {
        "src": "../assets/images/voiu/6cd3c6ac-c57f-41cf-8e0c-5064192deb75.jpg",
        "caption": "Kỷ niệm 07"
      },
      {
        "src": "../assets/images/voiu/6d6b5c09-2bf3-4305-884d-ef0869840352.jpg",
        "caption": "Kỷ niệm 08"
      },
      {
        "src": "../assets/images/voiu/8b39bf84-c3b7-44aa-a019-19859063b115.jpg",
        "caption": "Kỷ niệm 09"
      },
      {
        "src": "../assets/images/voiu/8dd31a63-1bb7-4cca-967f-b49d777d6cf4.jpg",
        "caption": "Kỷ niệm 10"
      },
      {
        "src": "../assets/images/voiu/50e90052-db18-45e5-8cc4-4b141072ed9c.jpg",
        "caption": "Kỷ niệm 11"
      },
      {
        "src": "../assets/images/voiu/84ae8ac8-c428-4c29-ad7a-e4e281157aff.jpg",
        "caption": "Kỷ niệm 12"
      },
      {
        "src": "../assets/images/voiu/090cb338-9211-41be-b691-8308d132f803.jpg",
        "caption": "Kỷ niệm 13"
      },
      {
        "src": "../assets/images/voiu/096f3b3f-0765-4a74-84fb-712210acd3b3.jpg",
        "caption": "Kỷ niệm 14"
      },
      {
        "src": "../assets/images/voiu/99d91970-9f78-4661-a5a2-93a35a01a55c.jpg",
        "caption": "Kỷ niệm 15"
      },
      {
        "src": "../assets/images/voiu/346ac7db-1d8c-47d8-b953-2fe9bcfdf3c4.jpg",
        "caption": "Kỷ niệm 16"
      },
      {
        "src": "../assets/images/voiu/861c9ec5-8131-4bd8-9302-94d091811c2e.jpg",
        "caption": "Kỷ niệm 17"
      },
      {
        "src": "../assets/images/voiu/987af69c-45ac-44f4-94fd-51b4d6216abc.jpg",
        "caption": "Kỷ niệm 18"
      },
      {
        "src": "../assets/images/voiu/4216f646-cb84-404c-a15f-a8cef7c80fc0.jpg",
        "caption": "Kỷ niệm 19"
      },
      {
        "src": "../assets/images/voiu/5062cfc4-29a2-47af-b9a4-4176dc5dbdc0.jpg",
        "caption": "Kỷ niệm 20"
      },
      {
        "src": "../assets/images/voiu/7810ecd4-e751-4e12-bc9f-946e4dc8ec1c.jpg",
        "caption": "Kỷ niệm 21"
      },
      {
        "src": "../assets/images/voiu/70729e85-7c1e-401b-a5f9-135f6876b379.jpg",
        "caption": "Kỷ niệm 22"
      },
      {
        "src": "../assets/images/voiu/77145f5c-a24f-45cf-8264-5e62a77b0ffc.jpg",
        "caption": "Kỷ niệm 23"
      },
      {
        "src": "../assets/images/voiu/61636646-0048-461c-9751-e517d7858926.jpg",
        "caption": "Kỷ niệm 24"
      },
      {
        "src": "../assets/images/voiu/913911706_4757997561192640_3393465828015302039_n.jpg",
        "caption": "Kỷ niệm 25"
      },
      {
        "src": "../assets/images/voiu/914709153_1036706792777774_2868359018357626688_n.jpg",
        "caption": "Kỷ niệm 26"
      },
      {
        "src": "../assets/images/voiu/915007073_2114761182740525_735811725523718558_n.jpg",
        "caption": "Kỷ niệm 27"
      },
      {
        "src": "../assets/images/voiu/915059309_1823858748833096_1557772640476995724_n.jpg",
        "caption": "Kỷ niệm 28"
      },
      {
        "src": "../assets/images/voiu/915352737_1163070413324287_763802893583993701_n.jpg",
        "caption": "Kỷ niệm 29"
      },
      {
        "src": "../assets/images/voiu/915492542_2433793890488827_9087440231976219577_n.jpg",
        "caption": "Kỷ niệm 30"
      },
      {
        "src": "../assets/images/voiu/915546851_2058912958101836_1874329536924106457_n.jpg",
        "caption": "Kỷ niệm 31"
      },
      {
        "src": "../assets/images/voiu/915603466_1485212390165248_4169490110662167187_n.jpg",
        "caption": "Kỷ niệm 32"
      },
      {
        "src": "../assets/images/voiu/916072638_1950420862588006_4943050798826931551_n.jpg",
        "caption": "Kỷ niệm 33"
      },
      {
        "src": "../assets/images/voiu/916580362_1601795085036288_2104418932695940737_n.jpg",
        "caption": "Kỷ niệm 34"
      },
      {
        "src": "../assets/images/voiu/918196228_1144771121273419_3039577222127014083_n.jpg",
        "caption": "Kỷ niệm 35"
      },
      {
        "src": "../assets/images/voiu/918647683_2499873907501157_250215051798342597_n.jpg",
        "caption": "Kỷ niệm 36"
      },
      {
        "src": "../assets/images/voiu/918683932_29081235638172254_4797523679789236872_n.jpg",
        "caption": "Kỷ niệm 37"
      },
      {
        "src": "../assets/images/voiu/919268526_4573675699616168_4728770523053294478_n.jpg",
        "caption": "Kỷ niệm 38"
      },
      {
        "src": "../assets/images/voiu/919631213_2882111572170719_2193950947650346622_n.jpg",
        "caption": "Kỷ niệm 39"
      },
      {
        "src": "../assets/images/voiu/920862328_1158707733180556_3784505003203116986_n.jpg",
        "caption": "Kỷ niệm 40"
      },
      {
        "src": "../assets/images/voiu/921225266_1149925694307091_4182102668825203509_n.jpg",
        "caption": "Kỷ niệm 41"
      },
      {
        "src": "../assets/images/voiu/921225280_2241455850050125_8877037846890062884_n.jpg",
        "caption": "Kỷ niệm 42"
      },
      {
        "src": "../assets/images/voiu/921707729_1013683437746937_3497025888948136990_n.jpg",
        "caption": "Kỷ niệm 43"
      },
      {
        "src": "../assets/images/voiu/921707729_1155349176949898_7308698609856276049_n.jpg",
        "caption": "Kỷ niệm 44"
      },
      {
        "src": "../assets/images/voiu/a6fe88e5-9666-4acb-b34b-3c53af96e014.jpg",
        "caption": "Kỷ niệm 45"
      },
      {
        "src": "../assets/images/voiu/a8637282-1616-40cb-a4c3-c1522c360a10.jpg",
        "caption": "Kỷ niệm 46"
      },
      {
        "src": "../assets/images/voiu/att.M61g6HIqg3T6YCFhtzUdHkzRk3kjrCh3PW6Lg0r_hmI - Copy.JPG",
        "caption": "Kỷ niệm 47"
      },
      {
        "src": "../assets/images/voiu/att.M61g6HIqg3T6YCFhtzUdHkzRk3kjrCh3PW6Lg0r_hmI.JPG",
        "caption": "Kỷ niệm 48"
      },
      {
        "src": "../assets/images/voiu/b6ee196a-90de-40d9-9cd0-93db0e50ce29.jpg",
        "caption": "Kỷ niệm 49"
      },
      {
        "src": "../assets/images/voiu/b526ccd1-238e-4087-bc1e-3f0ee4ec4f5d.jpg",
        "caption": "Kỷ niệm 50"
      },
      {
        "src": "../assets/images/voiu/b7365720-9060-4f10-9ca9-59b6e8da021a.jpg",
        "caption": "Kỷ niệm 51"
      },
      {
        "src": "../assets/images/voiu/bab65f5a-9585-446f-bc44-05ba393534ef.jpg",
        "caption": "Kỷ niệm 52"
      },
      {
        "src": "../assets/images/voiu/bb2dbbab-cf49-4527-bf44-7d3c9894e103.jpg",
        "caption": "Kỷ niệm 53"
      },
      {
        "src": "../assets/images/voiu/ce9451a0-7923-431f-acd5-f49d8ddf0934.jpg",
        "caption": "Kỷ niệm 54"
      },
      {
        "src": "../assets/images/voiu/db039a43-cad4-4d8c-89a9-f46094230b1f.jpg",
        "caption": "Kỷ niệm 55"
      },
      {
        "src": "../assets/images/voiu/dbecfb48-9521-4f32-b87b-3e4c20f52d47.jpg",
        "caption": "Kỷ niệm 56"
      },
      {
        "src": "../assets/images/voiu/e2125cf2-150f-41a4-a95e-cbe27a00ccc3.jpg",
        "caption": "Kỷ niệm 57"
      },
      {
        "src": "../assets/images/voiu/e58013e4-7537-4820-8001-54723abeee12.jpg",
        "caption": "Kỷ niệm 58"
      },
      {
        "src": "../assets/images/voiu/ed53dd25-25b5-4c77-a6f2-3d1af2da23f6.jpg",
        "caption": "Kỷ niệm 59"
      },
      {
        "src": "../assets/images/voiu/f955cb52-247e-4d23-b9fa-306fe6634209.jpg",
        "caption": "Kỷ niệm 60"
      },
      {
        "src": "../assets/images/voiu/faf95ed7-0213-416f-9439-6461773be145.jpg",
        "caption": "Kỷ niệm 61"
      },
      {
        "src": "../assets/images/voiu/fe4f8e5b-96a5-4909-bebd-7e97f0fb8907.jpg",
        "caption": "Kỷ niệm 62"
      },
      {
        "src": "../assets/images/voiu/fefa9974-2da6-4a07-a868-4f4e3c4293fd.jpg",
        "caption": "Kỷ niệm 63"
      }
    ],

    secret: {
      heading: "Thông điệp bí mật",
      hint: "Chạm vào phong thư để mở 💌",
      title: "Chỉ dành riêng cho em",
      message: "Anh yêu em nhiều hơn những gì anh có thể nói thành lời. Cảm ơn em vì đã là em. Hẹn em thật nhiều, thật nhiều ngày yêu nhau nữa nhé! 💖"
    },

    cta: {
      text: "Mình đã yêu nhau được bao lâu rồi nhỉ?",
      button: "Xem Love Days 💞"
    }
  },

  /* ----------------------------------------------------------------------
     6) TRANG LOVE DAYS
     ⭐ startDate: NGÀY BẮT ĐẦU YÊU NHAU – định dạng "YYYY-MM-DDTHH:mm:ss" (giờ địa phương).
     Đổi mỗi dòng này là bộ đếm tự tính lại, không cần sửa logic.
     ---------------------------------------------------------------------- */
  loveDays: {
    startDate: "2026-06-15T21:00:00",
    title: "LOVE DAYS",
    avatars: {
      her: { name: "Vợ Yêu", src: "../assets/images/em.jpg" },   // src: "../assets/images/em.jpg"
      him: { name: "Anh", src: "../assets/images/anh.png" }    // src: "../assets/images/anh.jpg"
    },
    thankYou: "Cảm ơn tình yêu to bự của anh 💗",
    backButton: "← Quay lại kỷ niệm",
    // Video kỷ niệm (thay cho trình phát nhạc). Ưu tiên mp4, hỗ trợ mov dự phòng.
    video: {
      src: "../assets/images/love.mp4",
      fallbackSrc: "../assets/images/love.mov",
      title: "Khoảnh khắc ngọt ngào của tụi mình 💕"
    }
  },

  /* ----------------------------------------------------------------------
     7) ĐIỀU HƯỚNG (đường dẫn tính từ thư mục pages/) – thường không cần sửa
     ---------------------------------------------------------------------- */
  routes: {
    login: "login.html",
    question: "love-question.html",
    quiz: "quiz.html",
    loading: "loading.html",
    memories: "memories.html",
    loveDays: "love-days.html"
  }
};
