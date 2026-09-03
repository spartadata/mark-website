const concepts = document.querySelectorAll("[data-concept]");
const replayTimers = new WeakMap();

const replayMix = (concept) => {
  if (!concept.matches("[data-mix]")) return;
  window.clearTimeout(replayTimers.get(concept));
  concept.classList.remove("is-replaying");
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      concept.classList.add("is-replaying");
      replayTimers.set(concept, window.setTimeout(() => concept.classList.remove("is-replaying"), 3300));
    });
  });
};

concepts.forEach((concept) => {
  concept.addEventListener("click", () => {
    concepts.forEach((candidate) => {
      const selected = candidate === concept;
      candidate.classList.toggle("is-selected", selected);
      candidate.setAttribute("aria-pressed", String(selected));
      const label = candidate.querySelector("[data-selection]");
      if (label) label.textContent = selected ? (candidate.matches("[data-mix]") ? "Replay" : "Selected") : "Choose";
    });
    replayMix(concept);
  });

  if (concept.matches("[data-mix]") && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    concept.addEventListener("pointerenter", () => replayMix(concept));
  }
});

const initialMix = document.querySelector("[data-mix]");
if (initialMix) replayTimers.set(initialMix, window.setTimeout(() => initialMix.classList.remove("is-replaying"), 3300));
