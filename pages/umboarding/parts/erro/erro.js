const templateErrorWebComponent = document.createElement("template");
templateErrorWebComponent.innerHTML = `
  <link rel="stylesheet" href="/pages/umboarding/parts/erro/erro.css" />
  <section class="umboarding-error-container">
      <img src="/pages/umboarding/parts/erro/images/erro.svg" alt="" />
      <h1>
        Hmm! Tentamos contatar o provedor de pagamento, mas ele não aprovou a
        transação
      </h1>
      <p>
        Isso geralmente ocorre quando o banco ou a operadora de crédito acredita
        que esta possa ser uma compra fraudulenta e impede a operação
        acreditando ser mais seguro assim.
      </p>
      <span>
        <div class="umboarding-error-container-dot"></div>
        <div class="umboarding-error-container-dot"></div>
      </span>

      <a href="#payment">
        <img src="/pages/umboarding/parts/erro/images/left.svg" alt="" />
      </a>
    </section>`;

class ErrorWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    let clone = templateErrorWebComponent.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);

    this.timeoutId;

    this.isInErrorSection = false;

    document.addEventListener("DOMContentLoaded", () => {
      window.addEventListener("hashchange", this.verifyURL.bind(this));
    });
  }

  executeFunctionWhenElementInViewport() {
    if (!this.isInErrorSection) {
      clearTimeout(this.timeoutId);
    } else {
      this.timeoutId = setTimeout(() => {
        window.location.href="#success"
      }, 5000);
    }
  }

  verifyURL() {
    let id = window.location.href.split("#")[1];
    this.isInErrorSection = id === "error";
    if (this.isInErrorSection) {
      this.executeFunctionWhenElementInViewport();
    }
  }
}

customElements.define("error-webcomponent", ErrorWebComponent);
