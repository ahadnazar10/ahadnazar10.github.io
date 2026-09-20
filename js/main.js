(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Reveal on load / scroll: headings slide up from a mask, blocks fade up
  var targets = document.querySelectorAll(".reveal, .title");
  if (reduce || !("IntersectionObserver" in window)) {
    targets.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    targets.forEach(function (el) { io.observe(el); });
  }

  // Stats count up once
  document.querySelectorAll("[data-count]").forEach(function (el) {
    var target = parseFloat(el.dataset.count);
    var decimals = (el.dataset.count.split(".")[1] || "").length;
    var prefix = el.dataset.prefix || "", suffix = el.dataset.suffix || "";
    var render = function (v) { el.textContent = prefix + v.toFixed(decimals) + suffix; };
    if (reduce) { render(target); return; }
    render(0);
    var start = null, duration = 1500, delay = 500;
    function tick(ts) {
      if (!start) start = ts;
      var t = ts - start - delay;
      if (t < 0) { requestAnimationFrame(tick); return; }
      var p = Math.min(t / duration, 1);
      render(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });

  // Gentle 3D tilt on the profile card (mouse only)
  var card = document.querySelector(".profile-card");
  if (card && !reduce && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    card.addEventListener("pointermove", function (e) {
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = "perspective(900px) rotateY(" + (x * 9) + "deg) rotateX(" + (-y * 9) + "deg)";
    });
    card.addEventListener("pointerleave", function () { card.style.transform = ""; });
  }

  // Contact form: opens the visitor's email app with the message filled in.
  // GitHub Pages is static, so there is no server to receive form posts.
  // (To receive messages directly, see the Formspree note in README.md.)
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var subject = "[Portfolio] " + d.get("topic") + " - " + d.get("name");
      var body = d.get("message") + "\n\n" + d.get("name") + "\n" + d.get("email");
      window.location.href = "mailto:" + form.dataset.to +
        "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });
  }
})();
