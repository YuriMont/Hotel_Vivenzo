const templateSuccessWebComponent = document.createElement("template");
templateSuccessWebComponent.innerHTML = `
  <link rel="stylesheet" href="/pages/umboarding/parts/success/success.css" />
  <section class="umboarding-success-container">
      <img src="/pages/umboarding/parts/success/images/success.svg" alt="" />
      <h1>Uhuu! Sua compra foi realizada com sucesso</h1>
      <p>Você já pode aproveitar todos os beneficios de sua reserva.</p>
      <span>
        <div class="umboarding-success-container-dot"></div>
        <div class="umboarding-success-container-dot"></div>
      </span>

      <a href="#reservations">
        <img src="/pages/umboarding/parts/success/images/left.svg" alt="" />
      </a>
    </section>`;

class SuccessWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    let clone = templateSuccessWebComponent.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);

  }
}

customElements.define("success-webcomponent", SuccessWebComponent);
