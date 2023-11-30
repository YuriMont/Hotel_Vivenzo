const templateAccessContentLimited = document.createElement("template");
templateAccessContentLimited.innerHTML = `
<link rel="stylesheet" href="/pages/reservation/home/options/access/limited/limited.css">
<div id="limited-content" class="access-container-limited">
      <div class="access-container-limited-icon">
        <img
          src="/pages/reservation/home/options/access/limited/icons/clock.svg"
          alt=""
        />
        <h3>limitado</h3>
      </div>
      <p>Compartilha apenas a senha da porta e os controles eletônicos.</p>
      <p>Você terá acesso ao quarto e poderá alterar a senha.</p>
      <p>Você ainda pode apelidar o acesso para facilitar a identificação.</p>
      <span class="access-container-limited-recommendation">
        Recomendável para filhos menores de 18 anos
      </span>
      <span class="access-container-limited-nickname"> Apelido </span>

      <div class="access-container-limited-options">
        <span>Deseja conceder acesso?</span>
        <button class="access-container-limited-option-primary">Voltar</button>
        <button class="access-container-limited-option-secondary">Confirmar</button>
      </div>
</div>
`;

class AccessContentLimited extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    let clone = templateAccessContentLimited.content.cloneNode(true);
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
      this.shadowRoot.getElementById("limited-content").style.display = "none";
      document.documentElement.style.overflow = "";
    } else {
      this.shadowRoot.getElementById("limited-content").style.display = "flex";
    }
  }
}

customElements.define("access-content-limited", AccessContentLimited);

export { AccessContentLimited }
