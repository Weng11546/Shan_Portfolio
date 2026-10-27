/* Click a certificate to see it full size in a popup */
(function () {
  const modal = document.getElementById("certModal");
  if (!modal) return;
  const img = document.getElementById("certImg");
  const closeBtn = document.getElementById("certClose");
  let lastFocus = null;

  function openModal(src, alt, trigger) {
    img.src = src;
    img.alt = alt;
    lastFocus = trigger;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll(".cert-link").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault(); // without JS the link still opens the image directly
      openModal(a.getAttribute("href"), a.dataset.alt || "Certificate", a);
    });
  });

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target !== img) closeModal(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });
})();