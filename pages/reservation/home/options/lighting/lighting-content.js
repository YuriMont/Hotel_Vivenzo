
const templateLightingContent = document.createElement("template");
templateLightingContent.innerHTML = `
<link rel="stylesheet" href="/pages/reservation/home/options/lighting/lighting-content.css">
<div class="lighting-content-container">
<h2>Iluminação</h2>
    <h3>Principal</h3>
    <div class="lighting-content-container-input">
      <input-range type-range="intensify"></input-range>
    </div>
    <h3>Fundo</h3>
    <div class="lighting-content-container-input">
      <input-range type-range="color"></input-range>
      <input-range type-range="intensify"></input-range>
      <h6>Efeitos</h6>
      <div class="lighting-content-container-effects">
        <button>Breathing</button>
        <button>Hearbeat</button>
        <button>Magic colours</button>
        <button>Moon Light</button>
      </div>
    </div>
</div>
`;

class LightingContent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    let clone = templateLightingContent.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);
  }
}

customElements.define("lighting-content", LightingContent);