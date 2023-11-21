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
        const totalTime = 5;

        let timeRemaining = totalTime;

        const interval = setInterval(() => {
          this.button.disabled = true;
          this.button.innerHTML = `Aberta <br> (${timeRemaining}s)`;

          if (timeRemaining <= 0) {
            clearInterval(interval);
            this.button.disabled = false;
            this.button.innerHTML = "Abrir <br> Porta";
          } else {
            timeRemaining--;
          }
        }, 1000);
      });
    });
  }

  handleToggleChangeDisabled() {
    if (this.button.disabled) {
      this.button.disabled = false;
    }
  }
}

customElements.define("open-door-button", OpenDoorButton);
