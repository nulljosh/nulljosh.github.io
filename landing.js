/* landing.js: drifting background + reveal-on-scroll for the house landing pattern.
   <script defer src="https://heyitsmejosh.com/landing.js" data-shape="bars"></script>
   data-shape: bars (default), dots, rings. data-count: how many (default 26).
   Draws in the page's own text color at low alpha, so it follows tokens.css light and dark.
   Honors prefers-reduced-motion: one static frame, no animation. */
(function () {
  var script = document.currentScript || {};
  var ds = script.dataset || {};
  var shape = ds.shape || "bars";
  var count = +ds.count || 26;
  var still = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function start() {
    var c = document.getElementById("lp-bg");
    if (!c) { c = document.createElement("canvas"); c.id = "lp-bg"; c.setAttribute("aria-hidden", "true"); document.body.prepend(c); }
    var ctx = c.getContext("2d"), items = [], W, H, dpr = devicePixelRatio || 1;
    function ink() { return getComputedStyle(document.body).color; }
    function resize() {
      W = c.width = innerWidth * dpr; H = c.height = innerHeight * dpr; items = [];
      for (var i = 0; i < count; i++) {
        var s = shape === "bars" ? (120 + Math.random() * 260) : (14 + Math.random() * 40);
        items.push({ x: Math.random() * W, y: Math.random() * H, w: s * dpr, h: (shape === "bars" ? 10 + Math.random() * 14 : s) * dpr,
          v: (0.08 + Math.random() * 0.25) * dpr * (Math.random() < 0.5 ? -1 : 1), a: 0.02 + Math.random() * 0.03 });
      }
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = ctx.strokeStyle = ink();
      ctx.lineWidth = 1.5 * dpr;
      var sy = (scrollY || 0) * dpr * 0.15;
      items.forEach(function (p) {
        p.x += p.v; if (p.x > W + p.w) p.x = -p.w; if (p.x < -p.w) p.x = W + p.w;
        var y = ((p.y - sy) % (H + p.h) + H + p.h) % (H + p.h) - p.h;
        ctx.globalAlpha = p.a; ctx.beginPath();
        if (shape === "bars") { ctx.roundRect(p.x, y, p.w, p.h, p.h / 2); ctx.fill(); }
        else if (shape === "dots") { ctx.arc(p.x, y, p.w / 2, 0, 7); ctx.fill(); }
        else { ctx.arc(p.x, y, p.w / 2, 0, 7); ctx.stroke(); }
      });
      ctx.globalAlpha = 1;
      if (!still) requestAnimationFrame(draw);
    }
    addEventListener("resize", resize); resize(); draw();
    if (still) addEventListener("scroll", draw, { passive: true });

    var els = document.querySelectorAll(".lp-reveal");
    if (!("IntersectionObserver" in window) || still) { els.forEach(function (e) { e.classList.add("lp-in"); }); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("lp-in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -10% 0px" });
    els.forEach(function (e) { io.observe(e); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
