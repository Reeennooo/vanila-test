export function TabItem({ text, count, id, active }) {
  const el = document.createElement("div");
  el.id = id;
  el.className = "tab";
  el.innerHTML = `
    <div class="tab__content">
      <span class="tab__text">${text}</span>
      <div class="tab__count">
        <span>${count}</span>
      </div>
    </div>
  `;
  if (active) {
    el.classList.add("tab_active");
  }
  return el;
}