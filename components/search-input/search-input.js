const templateSearchInput = document.createElement("template");
templateSearchInput.innerHTML = `
<link rel="stylesheet" href="/components/search-input/search-input.css" />
<div class="search-input-container">
        <input type="text" id="" placeholder="Pesquisar reserva" />
        <img
          src="/components/search-input/icon/find.svg"
          alt="pesquisa"
        />
</div>
`;


class SearchInput extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      let clone = templateSearchInput.content.cloneNode(true);
      this.shadowRoot.appendChild(clone);
    }
  }
  
  customElements.define("search-input", SearchInput);

  export { SearchInput }