import "/components/language-select/language-select.js";

let templatePaymentWebComponent = document.createElement("template");
templatePaymentWebComponent.innerHTML = `
<link rel="stylesheet" href="/pages/umboarding/parts/payment/payment.css" />
<section class="umboarding-payment-container">
      <language-select
        class="umboarding-payment-container-select-language"
      ></language-select>
      <h1>
        Confira os detalhes de sua compra e preecha os campos de pagamento.
      </h1>

      <div class="umboarding-payment-container-cots-box">
        <div class="umboarding-payment-container-cots-box-details">
          <div class="umboarding-payment-container-cots-box-details-value">
            <span>Suíte Presidencial</span>
            <span>(4 diárias)</span>
            <h2>R$ 368,00</h2>
          </div>
          <div class="umboarding-payment-container-cots-box-details-value">
            <span>Quarto Simples</span>
            <span>(2 diárias)</span>
            <h2>R$ 100,00</h2>
          </div>
        </div>
        <div class="umboarding-payment-container-cots-box-total-value">
          <span>Total</span>
          <h2>R$ 468,00</h2>
        </div>
      </div>
    <div class="umboarding-payment-container-actions">

    <div class="umboarding-payment-container-credicard">
    <img
      class="umboarding-payment-container-credicard-icon-card"
      src="/pages/umboarding/images/card.svg"
      alt=""
    />
    <div
      class="umboarding-payment-container-credicard-input-field-text"
      id="umboarding-payment-container-credicard-input-field-text-cvv"
    >
      <input
        name="cvv"
        type="text"
        inputmode="numeric"
        required
        maxlength="3"
      />
      <label id="label-text-cvv">CVV</label>
    </div>
    <div class="umboarding-payment-container-credicard-input-field-text">
      <input
        type="text"
        inputmode="numeric"
        required
        maxlength="19"
        name="cardnumber"
        id="umboarding-payment-container-credicard-input-field-text-number"
      />
      <label id="label-text-card">Número do cartão</label>
    </div>

    <div class="umboarding-payment-container-credicard-input-fields">
      <div class="umboarding-payment-container-credicard-input-field-text">
        <input id="umboarding-payment-container-credicard-input-field-text-cardrolder" type="text" name="cardrolder" required/>
        <label id="label-text-cardrolder">Nome do titular</label>
      </div>

      
    <div class="umboarding-payment-container-credicard-input-field-val">
      <div class="umboarding-payment-container-credicard-input-field-text">
        <input
          type="text"
          inputmode="numeric"
          required
          maxlength="2"
          name="month"
        />
        <label>Mês</label>
    </div>
    <span>/</span>
    <div class="umboarding-payment-container-credicard-input-field-text">
        <input
          type="text"
          inputmode="numeric"
          required
          maxlength="2"
          name="year"
        />
        <label>Ano</label>
    </div>
  </div>

    </div>

    <img
      class="umboarding-payment-container-credicard-icon-flag"
      src="/pages/umboarding/images/visa.svg"
      alt=""
    />
  </div>

  <button id="confirmation-button">Confirmar</button>
    </div>
    </section>
`;

class PaymentWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    let clone = templatePaymentWebComponent.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);

    this.allInputs = this.shadowRoot.querySelectorAll(
      ".umboarding-payment-container-credicard-input-field-text input"
    );

    this.confirmationButton = this.shadowRoot.getElementById(
      "confirmation-button"
    );

    document.addEventListener("DOMContentLoaded", () => {
      this.shadowRoot
        .querySelector(".umboarding-payment-container-actions")
        .addEventListener("focusin", () => {
          setTimeout(() => {
            this.scrollToView();
          }, 1000);
        });

      this.shadowRoot
        .querySelector('input[name="cardnumber"]')
        .addEventListener("input", (event) => this.editCard(event.target));

      this.confirmationButton.disabled = true;

      this.confirmationButton.addEventListener(
        "click",
        this.redirect.bind(this)
      );

      this.allInputs.forEach((input, index) => {
        let control = this.confirmationButton;
        input.addEventListener("input", () => {
          var hasFieldNone = Array.from(this.allInputs).every((input) => {
            return input.value.trim() !== "";
          });

          control.disabled = !hasFieldNone;
        });

        input.addEventListener("keydown", (event) =>
          this.nextInput(event, index)
        );
      });
    });
  }

  scrollToView() {
    const card = this.shadowRoot.querySelector(
      ".umboarding-payment-container-actions"
    );
    card.scrollIntoView({ behavior: "smooth" });
  }

  nextInput(event, index) {
    if (event.key === "Enter") {
      if (index + 1 != this.allInputs.length) {
        this.allInputs.item(index + 1).focus();
      } else {
        this.allInputs.item(index).blur();
      }
    }
  }

  editVal(input) {
    var val = input.value;
    // Remove caracteres não numéricos
    val = val.replace(/\D/g, "");

    if (val.length > 2) {
      val = val.substring(0, 2) + "/" + val.substring(2);
    }
    input.value = val;
  }

  editCard(input) {
    var card = input.value;

    // Remove caracteres não numéricos
    card = card.replace(/\D/g, "");

    // Adiciona espaços a cada 4 dígitos
    card = card.replace(/(\d{4})(?=\d)/g, "$1 ");

    input.value = card.trim();
  }

  redirect() {
    window.location.href = "#waiting";
  }
}

customElements.define("payment-webcomponent", PaymentWebComponent);
