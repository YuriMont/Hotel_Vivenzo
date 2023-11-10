const templateLanguageSelect = document.createElement("template");
templateLanguageSelect.innerHTML = `
<link rel="stylesheet" href="/components/language-select/language-select.css" />
    <div class="select-language-container">
        <button id="dropdownBtn" ></button>
        <div id="dropdown-content" class="select-language-container-dropdown">
          <span class="select-language-container-dropdown-option"></span>
          <span class="select-language-container-dropdown-option"></span>
          <span class="select-language-container-dropdown-option"></span>
        </div>
        <img id="dropdown-arrow" src="/components/language-select/icon/down.svg" alt="down">
    </div>
`;

class LanguageSelect extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    let clone = templateLanguageSelect.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);
    this.button = this.shadowRoot.getElementById("dropdownBtn");
    this.content = this.shadowRoot.getElementById("dropdown-content");
    this.options = this.shadowRoot.querySelectorAll(
      ".select-language-container-dropdown-option"
    );
    this.arrow = this.shadowRoot.getElementById("dropdown-arrow");
    this.isOpen = false;
    this.sizeOfLanguageText = 0;

    this.languages = [
      ["🇧🇷 &nbsp; pt", "🇺🇲 &nbsp; en", "🇪🇸 &nbsp; es"],
      ["🇧🇷 &nbsp; Português", "🇺🇲 &nbsp; Inglês", "🇪🇸 &nbsp; Espanhol"],
    ];

    document.addEventListener("DOMContentLoaded", () => {
      this.button.innerHTML = this.languages[this.sizeOfLanguageText][0];
      this.button.addEventListener("click", this.toggleDropdown.bind(this));
      this.options.forEach((option, index) => {
        option.innerHTML = this.languages[this.sizeOfLanguageText][index];
        option.addEventListener("click", this.selectOption.bind(this));
      });
    });
  }

  toggleDropdown() {
    this.isOpen
      ? (this.content.style.display = "none")
      : (this.content.style.display = "flex");
    this.isOpen
      ? (this.arrow.style.rotate = "0deg")
      : (this.arrow.style.rotate = "180deg");
    this.isOpen = !this.isOpen;
  }

  set sizeOfLanguageContainer(size) {
    if(size == 'lg'){
      this.sizeOfLanguageText = 1;
    }
  }

  set isDropdownOpen(is_open){
    this.isOpen = !is_open;
    this.toggleDropdown()
  }

  selectOption(event) {
    this.button.innerHTML = event.target.innerHTML;
    this.toggleDropdown();
  }

  connectedCallback() {
    this.sizeOfLanguageContainer = this.getAttribute("size-language") || "";
    this.isDropdownOpen = this.getAttribute('is-open') || false;
  }
}

customElements.define("language-select", LanguageSelect);
