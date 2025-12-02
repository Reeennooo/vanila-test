export function Header() {
  const el = document.createElement("header");
  el.className = "header";
  el.innerHTML = `
    <div class="container">
      <div class="header__text">
        <h6 class="header__subtitle">Enjoy your studying!</h6>
        <h1 class="header__title">Our online courses</h1>
    </div>
    </div>
  `;
  return el;
}