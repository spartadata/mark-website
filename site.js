const root = document.documentElement;
const header = document.querySelector("[data-header]");
const themeButton = document.querySelector("[data-theme-toggle]");
const themeIcon = document.querySelector("[data-theme-icon]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const frame = document.querySelector("[data-product-frame]");
const frameLoading = document.querySelector("[data-frame-loading]");
const deviceStage = document.querySelector("[data-device-stage]");
const purchaseDialog = document.querySelector("[data-purchase-dialog]");
const markWordmark = document.querySelector("[data-mark-wordmark]");
const brandLogo = document.querySelector("[data-brand-logo]");

const themeOrder = ["auto", "light", "dark"];
const themePresentation = {
  auto: { icon: "◐", label: "Appearance: Auto" },
  light: { icon: "☀", label: "Appearance: Light" },
  dark: { icon: "☾", label: "Appearance: Dark" },
};

function applyTheme(theme) {
  const nextTheme = themeOrder.includes(theme) ? theme : "auto";
  const presentation = themePresentation[nextTheme];
  root.dataset.theme = nextTheme;
  themeIcon.textContent = presentation.icon;
  themeButton.setAttribute("aria-label", presentation.label);
  themeButton.setAttribute("title", presentation.label);
  try {
    localStorage.setItem("mark-marketing-theme", nextTheme);
  } catch {
    // Appearance still works for the current page when storage is unavailable.
  }
}

let savedTheme = "auto";
try {
  savedTheme = localStorage.getItem("mark-marketing-theme") || "auto";
} catch {
  savedTheme = "auto";
}
applyTheme(savedTheme);

let wordmarkInteractionTimer;
let brandLogoTimer;

function playBrandLogo() {
  if (!brandLogo) return;
  window.clearTimeout(brandLogoTimer);
  brandLogo.classList.remove("is-logo-playing");
  void brandLogo.offsetWidth;
  brandLogo.classList.add("is-logo-playing");
  brandLogoTimer = window.setTimeout(() => brandLogo.classList.remove("is-logo-playing"), 920);
}

function playWordmarkInteraction() {
  if (!markWordmark || markWordmark.classList.contains("is-loading")) return;
  window.clearTimeout(wordmarkInteractionTimer);
  markWordmark.classList.remove("is-interacting");
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      markWordmark.classList.add("is-interacting");
      wordmarkInteractionTimer = window.setTimeout(() => markWordmark.classList.remove("is-interacting"), 800);
    });
  });
}

window.setTimeout(() => markWordmark?.classList.remove("is-loading"), 3300);
markWordmark?.addEventListener("click", playWordmarkInteraction);
brandLogo?.addEventListener("click", (event) => {
  event.preventDefault();
  playBrandLogo();
  document.querySelector("#top")?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
  });
  window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#top`);
});
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  markWordmark?.addEventListener("pointerenter", playWordmarkInteraction);
  brandLogo?.addEventListener("pointerenter", playBrandLogo);
}
window.requestAnimationFrame(() => window.requestAnimationFrame(playBrandLogo));

themeButton?.addEventListener("click", () => {
  const index = themeOrder.indexOf(root.dataset.theme || "auto");
  applyTheme(themeOrder[(index + 1) % themeOrder.length]);
});

function closeNavigation() {
  nav?.classList.remove("is-open");
  navToggle?.setAttribute("aria-expanded", "false");
}

navToggle?.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  nav?.classList.toggle("is-open", !isOpen);
});

nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNavigation));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeNavigation();
});

window.addEventListener("scroll", () => header?.classList.toggle("is-scrolled", window.scrollY > 18), { passive: true });

frame?.addEventListener("load", () => frameLoading?.classList.add("is-hidden"));
window.setTimeout(() => frameLoading?.classList.add("is-hidden"), 5000);

function syncProductFrameDevice(device) {
  const sync = () => {
    try {
      frame?.contentWindow?.postMessage({ type: "mark-preview-device", device }, window.location.origin);
      const modeButton = frame?.contentDocument?.querySelector(`[data-mode="${device}"]`);
      if (modeButton && !modeButton.classList.contains("active")) modeButton.click();
    } catch {
      // The preview remains usable if a host separates it onto another origin.
    }
  };

  sync();
  window.requestAnimationFrame(sync);
  window.setTimeout(sync, 250);
}

function setPreviewDevice(device) {
  if (!deviceStage) return;
  deviceStage.dataset.deviceStage = device;
  document.querySelectorAll("[data-device]").forEach((candidate) => {
    const selected = candidate.dataset.device === device;
    candidate.classList.toggle("is-active", selected);
    candidate.setAttribute("aria-pressed", String(selected));
  });
  syncProductFrameDevice(device);
}

frame?.addEventListener("load", () => syncProductFrameDevice(deviceStage?.dataset.deviceStage || "desktop"));

document.querySelectorAll("[data-device]").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.device) setPreviewDevice(button.dataset.device);
  });
});

setPreviewDevice(window.innerWidth < 600 ? "phone" : window.innerWidth < 1000 ? "tablet" : "desktop");

document.querySelectorAll("[data-open-purchase]").forEach((button) => {
  button.addEventListener("click", () => {
    if (typeof purchaseDialog?.showModal === "function") purchaseDialog.showModal();
  });
});

purchaseDialog?.addEventListener("click", (event) => {
  if (event.target !== purchaseDialog) return;
  const bounds = purchaseDialog.getBoundingClientRect();
  const inside = event.clientX >= bounds.left && event.clientX <= bounds.right && event.clientY >= bounds.top && event.clientY <= bounds.bottom;
  if (!inside) purchaseDialog.close();
});

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8%", threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const year = document.querySelector("[data-year]");
if (year) year.textContent = String(new Date().getFullYear());
