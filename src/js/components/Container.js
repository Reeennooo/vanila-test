export function Container(children) {
  const el = document.createElement("div");
  el.className = "container";
  el.appendChild(children);
  return el;
}