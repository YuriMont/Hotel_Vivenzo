import "/components/language-select/language-select.js";
import "/components/input-field/input-field.js";

const templateAddressWebComponent = document.createElement("template");
templateAddressWebComponent.innerHTML = `
<link rel="stylesheet" href="/pages/umboarding/parts/address/address.css" />
<section class="umboarding-address-container">
<language-select
  class="umboarding-address-container-select-language"
></language-select>

<div class="umboarding-address-container-card">
  <ul class="umboarding-address-container-card-box">
    <li class="umboarding-address-container-card-box-item" ">
      <input-field
        content-popover="cep"
        required-field="true"
        text-field="CEP"
      ></input-field>
    </li>
    <li class="umboarding-address-container-card-box-item" ">
      <input-field
        content-popover="numero"
        required-field="true"
        type-input="number"
        text-field="Número da residência"
      ></input-field>
    </li>
    <li class="umboarding-address-container-card-box-item" ">
      <input-field
        content-popover="referência"
        text-field="Ponto de referência"
      ></input-field>
    </li>
  </ul>

  <button
    class="umboarding-address-container-button-primary"
  >
    Confirmar
  </button>
</div>

<div class="umboarding-address-container-card">
  <h1>Seu endereço está correto?</h1>
  <ul class="umboarding-address-container-card-box">
    <li>
      <div
        class="umboarding-address-container-card-box-multiple-information"
      >
        <div>
          <span class="umboarding-address-container-card-box-description"
            >Rua</span
          >
          <h3 class="umboarding-address-container-card-box-data">
            Rua Delmiro
          </h3>
        </div>
        <div>
          <span class="umboarding-address-container-card-box-description"
            >Número</span
          >
          <h3 class="umboarding-address-container-card-box-data">1566</h3>
        </div>
      </div>
    </li>
    <li>
      <span class="umboarding-address-container-card-box-description"
        >Ponto de referência</span
      >
      <h3 class="umboarding-address-container-card-box-data">
        Próximo ao Mc Donalds
      </h3>
    </li>
    <li>
      <div
        class="umboarding-address-container-card-box-multiple-information"
      >
        <div>
          <span class="umboarding-address-container-card-box-description"
            >Cidade</span
          >
          <h3 class="umboarding-address-container-card-box-data">
            Paulo Afonso
          </h3>
        </div>
        <div>
          <span class="umboarding-address-container-card-box-description"
            >Estado</span
          >
          <h3 class="umboarding-address-container-card-box-data">BA</h3>
        </div>
      </div>
    </li>
    <li>
      <span class="umboarding-address-container-card-box-description"
        >CEP</span
      >
      <h3 class="umboarding-address-container-card-box-data">
        48 625-586
      </h3>
    </li>
    <li>
      <span class="umboarding-address-container-card-box-description"
        >Pais</span
      >
      <h3 class="umboarding-address-container-card-box-data">Brasil</h3>
    </li>
  </ul>
  <div class="umboarding-address-container-buttons">
    <button
      class="umboarding-address-container-button-default"
    >
      Não
    </button>
    <button
      class="umboarding-address-container-button-primary"
    >
      Sim
    </button>
  </div>
</div>
</section>
`;

class AddressWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    let clone = templateAddressWebComponent.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);
    this.allInputs = this.shadowRoot.querySelectorAll("input-field");

    document.addEventListener("DOMContentLoaded", () => {
      this.shadowRoot
        .querySelectorAll(".umboarding-address-container-card-box-item input-field")
        .forEach((item, index) => {
          item.addEventListener("keydown", (event) =>
            this.nextInput(event, index)
          );

          item.addEventListener("focusin", () => {
            setTimeout(() => {
              this.scrollToView();
            }, 700);
          });
        });

      this.shadowRoot
        .querySelector(
          ".umboarding-address-container-buttons .umboarding-address-container-button-default"
        )
        .addEventListener("click", () => {
          this.hideAddress();
        });

      this.shadowRoot
        .querySelector(".umboarding-address-container-button-primary")
        .addEventListener("click", this.showAddress.bind(this));

      this.shadowRoot
        .querySelector(
          ".umboarding-address-container-buttons .umboarding-address-container-button-primary"
        )
        .addEventListener("click", () => (window.location.href = "#payment"));
    });
  }

  connectedCallback() {}

  nextInput(event, index) {
    if (event.key === "Enter") {
      if (index + 1 != this.allInputs.length) {
        this.allInputs.item(index + 1).focusInput();
      } else {
        this.showAddress();
      }
    }
  }

  scrollToView() {
    const card = this.shadowRoot.querySelector(
      ".umboarding-address-container-card"
    );
    card.scrollIntoView({ behavior: "smooth" });
  }

  hasRequiredFieldNone() {
    let control = false;
    this.allInputs.forEach((item) => {
      if (item.hasAttribute("required-field") && item.getValueInput() == "") {
        item.showRequiredField();
        control = true;
      }
    });
    return control;
  }

  showAddress() {
    if (!this.hasRequiredFieldNone()) {
      this.shadowRoot
        .querySelectorAll(".umboarding-address-container-card")
        .item(1).style.display = "flex";
      this.shadowRoot
        .querySelectorAll(".umboarding-address-container-card")
        .item(0).style.display = "none";
    }
  }

  hideAddress() {
    this.allInputs.item(0).style.color = "red";
    this.shadowRoot
      .querySelectorAll(".umboarding-address-container-card")
      .item(0).style.display = "flex";
    this.shadowRoot
      .querySelectorAll(".umboarding-address-container-card")
      .item(1).style.display = "none";
  }

  connectedCallback() {}
}

customElements.define("address-webcomponent", AddressWebComponent);
