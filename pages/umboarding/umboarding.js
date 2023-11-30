import "/components/spin/spin-loader.js";
import "/components/language-select/language-select.js";

class UmboardingWebComponent extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="/pages/umboarding/umboarding.css" />
        <section class="umboarding-initial-container">
          <language-select
            class="umboarding-initial-container-select-language"
            is-open="true"
          ></language-select>
          <img src="/pages/umboarding/images/person.svg" alt="" />
          <h1>Você está prestes a usufruir de sua estadia no hotel Vivenzo</h1>
          <a
            href="#identification"
            class="umboarding-initial-container-next"
          >
            Continuar
          </a>
        </section>
      `;

  }

  connectedCallback() {}
}

customElements.define("umboarding-webcomponent", UmboardingWebComponent);
