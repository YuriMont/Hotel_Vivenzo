const templateAirConditioningContent = document.createElement("template");
templateAirConditioningContent.innerHTML = `
<link rel="stylesheet" href="/pages/reservation/home/options/air-conditioning/air-conditioning-content.css">
<div class="air-conditioning-container">
<h2>Climatização</h2>
<h3>Ventilação</h3>
<input-range class="air-conditioning-container-ventilation" type-range="ventilation"></input-range>
<div>
<h3>Temperatura</h3>
<input-range type-range="temperature"></input-range>
</div>
</div>
`;

class AirConditioningContent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    let clone = templateAirConditioningContent.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);
  }
}

customElements.define("air-conditioning-content", AirConditioningContent);
