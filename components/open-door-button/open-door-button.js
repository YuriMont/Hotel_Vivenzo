const templateOpenDoorButton = document.createElement("template");
templateOpenDoorButton.innerHTML = `
<link rel="stylesheet" href="/components/open-door-button/open-door.button.css" />
<button id="button" class="open-door-container">
    Abrir<br>Porta
</button>
`;

class OpenDoorButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    let clone = templateOpenDoorButton.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);
    this.button = this.shadowRoot.getElementById("button");
    document.addEventListener("DOMContentLoaded", () => {
      this.button.addEventListener("click", () => {
        this.button.disabled = !this.button.disabled;
        setTimeout(this.handleToggleChangeDisabled.bind(this), 5000);
      });
    });
  }

  handleToggleChangeDisabled() {
    if(this.button.disabled){
        this.button.disabled = false;
    }
  }
}

customElements.define("open-door-button", OpenDoorButton);
