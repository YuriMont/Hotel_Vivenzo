const templateFooterPage = document.createElement("template");
templateFooterPage.innerHTML = `
<link rel="stylesheet" href="/components/footer/footer-page.css" />

<footer class="footer-page">
        <nav class="footer-page-nav">
            <a href="/pages/reservation/reservations.html" class="footer-page-shortcut">
                <img src="/components/footer/icons/home.svg" alt="home">
                <span>Home</span>
            </a>
            <a href="" class="footer-page-shortcut">
                <img src="/components/footer/icons/history.svg" alt="home">
                <span>Histórico</span>
            </a>
            <a href="" class="footer-page-shortcut">
                <img src="/components/footer/icons/profile.svg" alt="home">
                <span>Eu</span>
            </a>
            <a href="" class="footer-page-shortcut">
                <img src="/components/footer/icons/help.svg" alt="home">
                <span>Ajuda</span>
            </a>
        </nav>
</footer>
`;

class FooterPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    let clone = templateFooterPage.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);
  }
}

customElements.define("footer-page", FooterPage);

// const routes = {
//     404: "/pages/404.html",
//     "/": "/pages/index.html",
//     "/about": "/pages/about.html",
//     "/lorem": "/pages/lorem.html",
// };