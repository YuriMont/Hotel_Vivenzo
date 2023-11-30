const templateAccessContentVip = document.createElement("template");
templateAccessContentVip.innerHTML = `
<link rel="stylesheet" href="/pages/reservation/home/options/access/vip/vip.css">
<div id="vip-content" class="access-container-vip">
      <div class="access-container-vip-icon">
        <img
          src="/pages/reservation/home/options/access/vip/icons/vip.svg"
          alt=""
        />
        <h3>Exclusivo</h3>
      </div>
      <p>Compartilha apenas a senha da porta e os controles eletônicos.</p>
      <p>Você terá acesso ao quarto e poderá alterar a senha.</p>
      <p>Você ainda pode apelidar o acesso para facilitar a identificação.</p>
      <span class="access-container-vip-recommendation">
        Recomendável para filhos menores de 18 anos
      </span>
      <span class="access-container-vip-nickname"> Apelido </span>

      <div class="access-container-vip-options">
        <span>Deseja conceder acesso?</span>
        <button class="access-container-vip-option-primary">Voltar</button>
        <button class="access-container-vip-option-secondary">Confirmar</button>
      </div>
    </div>
`;

class AccessContentVip extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    let clone = templateAccessContentVip.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);
    this.isOpen = true;

    document.addEventListener("DOMContentLoaded", () => {
      this.shadowRoot.querySelectorAll("button").forEach((item) => {
        item.addEventListener("click", this.handleToggleOpen.bind(this));
      });
    });
  }

  handleToggleOpen() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.shadowRoot.getElementById("vip-content").style.display = "none";
      document.documentElement.style.overflow = "";
    } else {
      this.shadowRoot.getElementById("vip-content").style.display = "flex";
    }
  }
}

customElements.define("access-content-vip", AccessContentVip);

export { AccessContentVip }
