/* ---------- 1. LOADING SCREEN ---------- */
const loader = document.getElementById("loader");
const bar = document.getElementById("loaderBar");
document.body.classList.add("loading");

let progress = 0;
const tick = setInterval(() => {
  progress = Math.min(progress + Math.random() * 22, 90);
  bar.style.width = progress + "%";
}, 180);

function finishLoading() {
  clearInterval(tick);
  bar.style.width = "100%";
  setTimeout(() => {
    loader.classList.add("done");
    document.body.classList.remove("loading");
    startTyping();
  }, 450);
}
window.addEventListener("load", () => setTimeout(finishLoading, 600));
setTimeout(finishLoading, 4000); // safety: never get stuck on the loader

/* ---------- 2. TYPING EFFECT ---------- */
/* Change these lines to your own words */
const phrases = ["Aspiring Junior Network Administrator and IT Consultant", "BSIT Student", "Always learning"];
const typed = document.getElementById("typed");
let typingStarted = false;

function startTyping() {
  if (typingStarted) return;
  typingStarted = true;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    typed.textContent = phrases[0];
    return;
  }

  let p = 0, i = 0, deleting = false;
  (function loop() {
    const word = phrases[p];
    typed.textContent = word.slice(0, i);

    let delay = deleting ? 35 : 80;
    if (!deleting && i === word.length) { deleting = true; delay = 1800; }
    else if (deleting && i === 0) { deleting = false; p = (p + 1) % phrases.length; delay = 400; }
    i += deleting ? -1 : 1;
    setTimeout(loop, delay);
  })();
}

/* ---------- 3. SCROLL REVEAL (fade + slide + unblur) ---------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      el.classList.add("show");
      revealObserver.unobserve(el);
      // remove the stagger delay afterwards so hover effects respond instantly
      setTimeout(() => { el.style.transitionDelay = ""; }, 1200);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

document.querySelectorAll(".reveal").forEach((el, index) => {
  // small stagger for siblings inside the same grid
  const siblings = el.parentElement.querySelectorAll(":scope > .reveal");
  const pos = Array.prototype.indexOf.call(siblings, el);
  el.style.transitionDelay = Math.min(pos, 4) * 90 + "ms";
  revealObserver.observe(el);
});

/* ---------- 4. NAV HIGHLIGHT WHILE SCROLLING ---------- */
const links = document.querySelectorAll("#menu a");
const sections = [...links].map((a) => document.querySelector(a.getAttribute("href")));

const spy = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });

sections.forEach((s) => s && spy.observe(s));

/* ---------- 5. MOBILE MENU ---------- */
const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menuBtn");

menuBtn.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
});
links.forEach((a) => a.addEventListener("click", () => {
  menu.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", false);
  menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
}));

/* ---------- 6. LIGHT / DARK MODE ---------- */
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
  void themeBtn.offsetWidth; // restart the animation
  themeBtn.classList.add("spin");
});