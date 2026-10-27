/* ---------- SCROLL REVEAL ---------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      el.classList.add("show");
      revealObserver.unobserve(el);
      setTimeout(() => { el.style.transitionDelay = ""; }, 1200);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

document.querySelectorAll(".reveal").forEach((el) => {
  const siblings = el.parentElement.querySelectorAll(":scope > .reveal");
  const pos = Array.prototype.indexOf.call(siblings, el);
  el.style.transitionDelay = Math.min(pos, 4) * 90 + "ms";
  revealObserver.observe(el);
});

/* ---------- MOBILE MENU ---------- */
const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menuBtn");

menuBtn.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
});

/* ---------- LIGHT / DARK MODE ---------- */
const themeBtn = document.getElementById("themeBtn");
const root = document.documentElement;

function setIcon() {
  const dark = root.getAttribute("data-theme") === "dark";
  themeBtn.innerHTML = dark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
}
setIcon();

themeBtn.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch (e) {}
  setIcon();
  themeBtn.classList.remove("spin");
  void themeBtn.offsetWidth;
  themeBtn.classList.add("spin");
});