import "/components/spin/spin-loader.js";

const templateWaitingWebComponent = document.createElement("template");
templateWaitingWebComponent.innerHTML = `
  <link rel="stylesheet" href="/pages/umboarding/parts/waiting/waiting.css" />
  <section class="umboarding-waiting-container">
      <h1>Um minuto, estamos concluindo sua compra</h1>
      <spin-loader></spin-loader>
      <img src="/pages/umboarding/parts/waiting/images/waiting.svg" alt="" />
      <span>
        <div class="umboarding-waiting-container-dot"></div>
        <div class="umboarding-waiting-container-dot-fill"></div>
      </span>
    </section>`;

class WaitingWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    let clone = templateWaitingWebComponent.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);

    this.timeoutId;

    this.isInWaitingSection = false;

    document.addEventListener("DOMContentLoaded", () => {
      window.addEventListener("hashchange", () => this.verifyURL());
    });
  }

  executeFunctionWhenElementInViewport() {
    if (!this.isInWaitingSection) {
      clearTimeout(this.timeoutId);
    } else {
      this.timeoutId = setTimeout(() => {
        window.location.href="#error"
      }, 5000);
    }
  }

  verifyURL() {
    let id = window.location.href.split("#")[1];
    this.isInWaitingSection = id === "waiting";
    if (this.isInWaitingSection) {
      this.executeFunctionWhenElementInViewport();
    }
  }
}

customElements.define("waiting-webcomponent", WaitingWebComponent);
