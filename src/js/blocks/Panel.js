export function Panel() {
  const el = document.createElement("div");
  el.id = "panel";
  el.className = "panel container";
  el.innerHTML = `
    <div id="tabBar" class="tabBar">
    </div>
  `;
  return el;
}