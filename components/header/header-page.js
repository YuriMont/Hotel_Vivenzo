const templateHeaderPage = document.createElement("template");
templateHeaderPage.innerHTML = `
<link rel="stylesheet" href="/components/header/header-page.css" />

<header class="header-page-container">
    <button id="back">
       <img src="/components/header/icons/back.svg" alt="back">
    </button>
    <h1 id="title-header">Hotel Vivenzo</h1>

    <language-select></language-select>
</header>
`;


class HeaderPage extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      let clone = templateHeaderPage.content.cloneNode(true);
      this.shadowRoot.appendChild(clone);
      this._titleHeader = "";
      this._typeHeader = "";
      this.btnBack = this.shadowRoot.getElementById('back');

      document.addEventListener("DOMContentLoaded", () => {
        this.btnBack.addEventListener('click', this.toggleBack.bind(this))
      });
    }

    toggleBack(){
      window.history.back();
    }

    set titleHeader(title_header){
      this.shadowRoot.getElementById('title-header').innerText = title_header;
    }

    set typeHeader(type){
      if(type=='primary'){
        this.shadowRoot.querySelector('header').classList.add('header-page-container-primary');
      }
      else{
        this.shadowRoot.querySelector('header').classList.add('header-page-container-default');
      }
    }

    connectedCallback() {
      this.titleHeader = this.getAttribute("title-header") || "";
      this.typeHeader = this.getAttribute("header-type") || "default";
    }
  }
  
  customElements.define("header-page", HeaderPage);