const templateFooterPage = document.createElement("template");
templateFooterPage.innerHTML = `
<link rel="stylesheet" href="/components/footer/footer-page.css" />

<div class="footer-page">
        <nav class="footer-page-nav">
            <button id="redirect-home-icon" class="footer-page-shortcut">
                <img src="/components/footer/icons/home.svg" alt="home">
                <span>Home</span>
            </button>
            <button class="footer-page-shortcut">
                <img src="/components/footer/icons/history.svg" alt="home">
                <span>Histórico</span>
            </button>
            <button class="footer-page-shortcut">
                <img src="/components/footer/icons/profile.svg" alt="home">
                <span>Eu</span>
            </button>
            <button class="footer-page-shortcut">
                <img src="/components/footer/icons/help.svg" alt="home">
                <span>Ajuda</span>
            </button>
        </nav>
</div>
`;

class FooterPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    let clone = templateFooterPage.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);
    this.isNotSafari = !(
      /Safari/.test(navigator.userAgent) &&
      /Apple Computer/.test(navigator.vendor)
    );
    this.shadowRoot
      .getElementById("redirect-home-icon")
      .addEventListener("click", this.redirectReservations.bind(this));

    document.addEventListener("DOMContentLoaded", () => {
      if (this.isChromeOrFirefox()) {
        //this.shadowRoot.querySelector(".footer-page").style.bottom = "6vh";
      }

      window.addEventListener("scroll", () => {
        if (this.notHasMoreScrollDown() && this.isChromeOrFirefox()) {
          this.shadowRoot.querySelector(".footer-page").style.bottom = "0vh";
        }
      });
    });
  }

  hasMoreScrollUp(){
    return window.pageYOffset >= 0;
  }

  isChromeOrFirefox() {
    return typeof window.chrome !== 'undefined' || /firefox/i.test(navigator.userAgent)
  }

  notHasMoreScrollDown() {
      return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
    
  }

  redirectReservations() {
    const page = window.parent.document.getElementById("reservations");
    if (this.isNotSafari) {
      page.style.display = "block";
    }
    page.scrollIntoView();
  }
}

customElements.define("footer-page", FooterPage);
