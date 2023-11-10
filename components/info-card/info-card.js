const templateInfoCard = document.createElement("template");
templateInfoCard.innerHTML = `
<link rel="stylesheet" href="/components/info-card/info-card.css" />
<div class="info-card-container">
        <legend><slot name="legend-card"></slot></legend>
        <img src="/components/info-card/icons/close.svg" alt=""/>
        <div class="info-card-container-items">
          <span class="info-card-container-items-description"><slot name="description-data"></slot></span>
          <span class="info-card-container-items-data"><slot name="data-item"></slot></span>
        </div>
</div>
`;

class InfoCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    let clone = templateInfoCard.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);
  }

}

customElements.define("info-card", InfoCard);