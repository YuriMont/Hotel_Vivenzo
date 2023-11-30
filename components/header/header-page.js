import "/components/language-select/language-select.js";

const templateHeaderPage = document.createElement("template");
templateHeaderPage.innerHTML = `
<link rel="stylesheet" href="/components/header/header-page.css" />

<div class="header-page-container">
    <a href="#reservations">
       <img src="/components/header/icons/back.svg" alt="back">
    </a>
    <h1 id="title-header">Hotel Vivenzo</h1>

    <language-select></language-select>
</div>
`;

class HeaderPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    let clone = templateHeaderPage.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);
    this.headerContent = this.shadowRoot.querySelector(
      ".header-page-container"
    );
  }

  set titleHeader(title_header) {
    this.shadowRoot.getElementById("title-header").innerText = title_header;
  }

  headerSize(size) {
    this.headerContent.style.height = size === "lg" ? "7rem" : "4rem";
  }

  set typeHeader(type) {
    if (type == "primary") {
      this.headerContent.classList.add("header-page-container-primary");
    } else {
      this.headerContent.classList.add("header-page-container-default");
    }
  }

  connectedCallback() {
    this.titleHeader = this.getAttribute("title-header") || "";
    this.typeHeader = this.getAttribute("header-type") || "default";
  }
}

customElements.define("header-page", HeaderPage);

export { HeaderPage };
