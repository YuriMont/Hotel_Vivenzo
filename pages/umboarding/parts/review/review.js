import "/components/language-select/language-select.js";
import "/components/spin/spin-loader.js";

const templateReviewWebComponent = document.createElement("template");
templateReviewWebComponent.innerHTML = `
  <link rel="stylesheet" href="/pages/umboarding/parts/review/review.css" />
  <spin-loader class="umboarding-review-container-spinner"></spin-loader>
  <section class="umboarding-review-container">
  <language-select
    class="umboarding-review-container-select-language"
  ></language-select>

  <h1>Quase tudo pronto! Seus dados estão corretos?</h1>

  <div class="umboarding-review-container-documents">
    <img
      src="/pages/umboarding/parts/review/images/identidade.jpg"
      alt=""
    />
    <img
      src="/pages/umboarding/parts/review/images/identidade.jpg"
      alt=""
    />
  </div>

  <ul class="umboarding-review-container-box">
    <li>
      <span class="umboarding-review-container-box-description"
        >Tipo do documeto</span
      >
      <h3 class="umboarding-review-container-box-data">RG</h3>
    </li>
    <li>
      <span class="umboarding-review-container-box-description"
        >Número do documento</span
      >
      <h3 class="umboarding-review-container-box-data">41.255.248.96</h3>
    </li>
    <li>
      <span class="umboarding-review-container-box-description">Nome</span>
      <h3 class="umboarding-review-container-box-data">
        Washington Luiz Santos
      </h3>
    </li>
    <li>
      <span class="umboarding-review-container-box-description"
        >Data de nascimento</span
      >
      <h3 class="umboarding-review-container-box-data">02/02/1950</h3>
    </li>
    <li>
      <span class="umboarding-review-container-box-description"
        >Data de expedição</span
      >
      <h3 class="umboarding-review-container-box-data">15/05/1970</h3>
    </li>
  </ul>
  <div class="umboarding-review-container-links">
    <a href="#identification"
      class="umboarding-review-container-link-default"
    >
      Não
    </a>
    <a href="#verification"
      class="umboarding-review-container-link-primary"
    >
      Sim
    </a>
  </div>
</section>`;

class ReviewWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    let clone = templateReviewWebComponent.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);

    this.isInReviewSection = false;

    document.addEventListener("DOMContentLoaded", () => {
      window.addEventListener("hashchange", () => this.verifyURL());
      window.onload = () => this.verifyURL();
    });
  }

  connectedCallback() {}

  executeFunctionWhenElementInViewport() {
    if (this.isInReviewSection) {
      let container = this.shadowRoot.querySelector(
        ".umboarding-review-container"
      );
      let spinner = this.shadowRoot.querySelector(
        ".umboarding-review-container-spinner"
      );
      setTimeout(function () {
        container.style.display = "flex";
        spinner.style.display = "none";
      }, 3000);
    }
  }

  verifyURL() {
    let id = window.location.href.split("#")[1];
    this.isInReviewSection = id === "review";
    if (this.isInReviewSection) {
      this.executeFunctionWhenElementInViewport();
    }
  }
}

customElements.define("review-webcomponent", ReviewWebComponent);
