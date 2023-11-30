import "/components/info-card/info-card.js";

const templateParkingContent = document.createElement("template");
templateParkingContent.innerHTML = `
<link rel="stylesheet" href="/pages/reservation/home/options/parking/parking-content.css">
<div class="parking-content-container">
<h2>Estacionamento</h2>
    <p>Adicionar Veículos</p>
    <div class="parking-content-container-form">
      <input type="text" placeholder="Placa" />
      <button>Adicionar</button>
    </div>
    <p>Veículos Adicionados</p>
    <div class="parking-content-container-added-vehicles-list">
      <info-card>
        <span slot="description-data">Placa</span>
        <span slot="data-item">HGR 0554</span>
        <span slot="description-data">Registrado</span>
        <span slot="data-item">15/02/2021</span>
        <span slot="description-data">Horário</span>
        <span slot="data-item">15:00</span>
      </info-card>

      <info-card>
        <span slot="description-data">Placa</span>
        <span slot="data-item">HGR 0554</span>
        <span slot="description-data">Registrado</span>
        <span slot="data-item">15/02/2021</span>
        <span slot="description-data">Horário</span>
        <span slot="data-item">15:00</span>
      </info-card>

      <info-card>
        <span slot="description-data">Placa</span>
        <span slot="data-item">HGR 0554</span>
        <span slot="description-data">Registrado</span>
        <span slot="data-item">15/02/2021</span>
        <span slot="description-data">Horário</span>
        <span slot="data-item">15:00</span>
      </info-card>

      <info-card>
        <span slot="description-data">Placa</span>
        <span slot="data-item">HGR 0554</span>
        <span slot="description-data">Registrado</span>
        <span slot="data-item">15/02/2021</span>
        <span slot="description-data">Horário</span>
        <span slot="data-item">15:00</span>
      </info-card>
    </div>
</div>
`;

class ParkingContent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    let clone = templateParkingContent.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);
  }
}

customElements.define("parking-content", ParkingContent);

export { ParkingContent }
