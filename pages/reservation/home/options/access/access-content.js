const templateAccessContent = document.createElement("template");
templateAccessContent.innerHTML = `
<link rel="stylesheet" href="/pages/reservation/home/options/access/access-content.css">
<div class="access-container">
<h2>Acessos</h2>
    <p>Enviar Novo Acesso</p>
    <div class="access-container-list">
      <button>
        <img
          src="/pages/reservation/home/options/access/icons/clock.svg"
          alt=""
        />
        <span>Limitado</span>
        <img
          src="/pages/reservation/home/options/access/icons/info.svg"
          alt=""
        />
      </button>
      <button>
        <img
          src="/pages/reservation/home/options/access/icons/vip.svg"
          alt=""
        />
        <span>Exclusivo</span>
        <img
          src="/pages/reservation/home/options/access/icons/info.svg"
          alt=""
        />
      </button>
    </div>
    <p>Acessos Concedidos</p>
    <div class="access-container-granted-list">
      <info-card>
        <span slot="legend-card">Acesso Limitado</span>
        <span slot="description-data">Apelido</span>
        <span slot="data-item">Joyce</span>
        <span slot="description-data">Enviado</span>
        <span slot="data-item">15/02/2021</span>
        <span slot="description-data">Horário</span>
        <span slot="data-item">15:00</span>
      </info-card>
      <info-card>
        <span slot="legend-card">Acesso Exclusivo</span>
        <span slot="description-data">Apelido</span>
        <span slot="data-item">Pamela</span>
        <span slot="description-data">Enviado</span>
        <span slot="data-item">16/02/2021</span>
        <span slot="description-data">Horário</span>
        <span slot="data-item">08:00</span>
      </info-card>
      <info-card>
        <span slot="legend-card">Acesso Limitado</span>
        <span slot="description-data">Apelido</span>
        <span slot="data-item">João</span>
        <span slot="description-data">Enviado</span>
        <span slot="data-item">18/02/2021</span>
        <span slot="description-data">Horário</span>
        <span slot="data-item">15:00</span>
      </info-card>
      <info-card>
        <span slot="legend-card">Acesso Limitado</span>
        <span slot="description-data">Apelido</span>
        <span slot="data-item">Filho</span>
        <span slot="description-data">Enviado</span>
        <span slot="data-item">18/02/2021</span>
        <span slot="description-data">Horário</span>
        <span slot="data-item">15:30</span>
      </info-card>
      <info-card>
        <span slot="legend-card">Acesso Limitado</span>
        <span slot="description-data">Apelido</span>
        <span slot="data-item">Albert</span>
        <span slot="description-data">Enviado</span>
        <span slot="data-item">18/02/2021</span>
        <span slot="description-data">Horário</span>
        <span slot="data-item">15:30</span>
      </info-card>
      <info-card>
        <span slot="legend-card">Acesso Limitado</span>
        <span slot="description-data">Apelido</span>
        <span slot="data-item">Bruno</span>
        <span slot="description-data">Enviado</span>
        <span slot="data-item">18/02/2021</span>
        <span slot="description-data">Horário</span>
        <span slot="data-item">15:30</span>
      </info-card>
    </div>

    <access-content-limited></access-content-limited>
    <access-content-vip></access-content-vip>
</div>
`;

class AccessContent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    let clone = templateAccessContent.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);

    document.addEventListener("DOMContentLoaded", () => {
      this.shadowRoot
        .querySelectorAll("button")
        .item(0)
        .addEventListener("click", () =>
          this.shadowRoot
            .querySelectorAll("access-content-limited")
            .item(0)
            .handleToggleOpen()
        );

        this.shadowRoot
        .querySelectorAll("button")
        .item(1)
        .addEventListener("click", () =>
          this.shadowRoot
            .querySelectorAll("access-content-vip")
            .item(0)
            .handleToggleOpen()
        );
    });
  }
}

customElements.define("access-content", AccessContent);
