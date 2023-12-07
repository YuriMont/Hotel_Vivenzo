import "/components/language-select/language-select.js";
import "/components/input-field/input-field.js";
import "/components/opt-input/opt-input.js";

let templateVerificationWebComponent = document.createElement("template");
templateVerificationWebComponent.innerHTML = `
<link rel="stylesheet" href="/pages/umboarding/parts/verification/verification.css"/>
<section class="umboarding-verification-container">
      <language-select
        class="umboarding-verification-container-select-language"
      ></language-select>

      <div class="umboarding-verification-container-actions">
      <div class="umboarding-verification-container-operation">
      <div class="umboarding-verification-container-box">
        <input-field
          content-popover="email"
          id="input-email"
          type-input="email"
          text-field="Endereço de email"
        ></input-field>
        <span>Trocar</span>
      </div>

      <div class="umboarding-reservation-container-submit-code">
        <button
          class="umboarding-reservation-container-submit-code-resend"
        ></button>
        <div class="umboarding-verification-container-opt-code">
          <span>Código invalido</span>
          <opt-input></opt-input>
        </div>
        <button
          class="umboarding-reservation-container-submit-code-button"
        >
          Enviar Código
        </button>
      </div>
    </div>

    <div class="umboarding-verification-container-operation">
      <div class="umboarding-verification-container-box">
        <input-field
          content-popover="telefone"
          id="input-phone"
          type-input="tel"
          text-field="Número do celular"
        ></input-field>
        <span>Trocar</span>
      </div>

      <div class="umboarding-reservation-container-submit-code">
        <button
          class="umboarding-reservation-container-submit-code-resend"
        ></button>
        <div class="umboarding-verification-container-opt-code">
          <span>código invalido</span>
          <opt-input id="code-phone"></opt-input>
        </div>
        <button
          class="umboarding-reservation-container-submit-code-button"
        >
          Enviar Código
        </button>
      </div>
    </div>

    <button
      id="umboarding-container-confirmation-button"
    >
      Continuar
    </button>
      </div>
    </section>
`;

class VerificationWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    let clone = templateVerificationWebComponent.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);

    this.userInformation = [
      {
        data: "example@gmail.com",
        isValid: true,
      },
      {
        data: "+55 (21) 98178-9087",
        isValid: true,
      },
    ];

    this.timeoutId;

    this.allInputs = this.shadowRoot.querySelectorAll("input-field");

    this.allCodes = this.shadowRoot.querySelectorAll("opt-input");

    this.allBoxSpans = this.shadowRoot.querySelectorAll(
      ".umboarding-verification-container-box span"
    );

    this.submitCodeButtons = this.shadowRoot.querySelectorAll(
      ".umboarding-reservation-container-submit-code-button"
    );

    this.resendCodeButtons = this.shadowRoot.querySelectorAll(
      ".umboarding-reservation-container-submit-code-resend"
    );

    document.addEventListener("DOMContentLoaded", () => {
      this.shadowRoot
        .querySelector(".umboarding-verification-container-actions input-field")
        .addEventListener("focusin", () => {
          setTimeout(() => {
            this.scrollToView();
          }, 500);
        });

      this.shadowRoot
        .getElementById("umboarding-container-confirmation-button")
        .addEventListener("click", () => {
          window.location.href = "#address";
        });

      this.submitCodeButtons.forEach((item, index) => {
        item.addEventListener("click", () => this.submitCode(index));
      });

      this.resendCodeButtons.forEach((item, index) => {
        item.addEventListener("click", () => this.submitCode(index));
      });

      this.allInputs.forEach((item, index) => {
        item.setValueInput(this.userInformation[index].data);
        item.setIsDisabledInput(true);
      });
      this.enableControls();
      this.validationButton();

      this.allInputs.forEach((item, index) => {
        item.addEventListener("verifyText", (event) => {
          this.submitCodeButtons.item(index).disabled = !event.detail;
        });
      });

      this.allCodes.forEach((item, index) => {
        item.addEventListener("verifyCode", (event) => {
          let messageError = this.shadowRoot.querySelectorAll(
            ".umboarding-verification-container-opt-code span"
          );
          if (event.detail) {
            this.userInformation[index].data = this.allInputs
              .item(index)
              .getValueInput();
            this.userInformation[index].isValid = event.detail;
            this.allInputs
              .item(index)
              .setIsDisabledInput(this.userInformation[index].isValid);

            item.style.display = "none";
            messageError.item(index).style.display = "none";
            this.enableControls(index);
          } else {
            messageError
              .item(index)
              .classList.toggle(
                "umboarding-verification-container-opt-code-animation-error"
              );
            item.resetCode();
            messageError.item(index).style.display = "block";
          }
          this.validationButton();
        });
      });
    });
  }

  scrollToView() {
    const card = this.shadowRoot.querySelector(
      ".umboarding-verification-container-actions"
    );
    card.scrollIntoView({ behavior: "smooth" });
  }

  stopCountdown(index) {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.resendCodeButtons.item(index).disabled = false;

    this.submitCodeButtons.item(index).disabled = false;
    this.resendCodeButtons.item(index).innerHTML =
      "Não recebeu? <br> Reenviar código";
  }

  updateCountdown(seconds, index) {
    const button = this.resendCodeButtons.item(index);

    button.innerHTML = `Não recebeu? <br> Reenviar código (${seconds}s)`;

    if (seconds > 0) {
      button.disabled = true;

      this.timeoutId = setTimeout(() => {
        this.updateCountdown(seconds - 1, index);
      }, 1000);
    } else {
      this.stopCountdown(index);
    }
  }

  validationButton() {
    this.shadowRoot.getElementById(
      "umboarding-container-confirmation-button"
    ).style.display = !(
      this.userInformation[0].isValid && this.userInformation[1].isValid
    )
      ? "none"
      : "block";
  }

  enableControls() {
    this.shadowRoot.querySelector(
      ".umboarding-verification-container"
    ).style.translate = "0 0";
    this.allBoxSpans.forEach((element, i) => {
      element.style.display = "block";
      element.innerHTML = "Trocar";

      this.allInputs.item(i).setValueInput(this.userInformation[i].data);
      this.stopCountdown(i);

      element.addEventListener("click", () => this.disableControls(i));
      this.allInputs.item(i).setIsDisabledInput(true);
      this.allCodes.item(i).style.display = "none";
    });

    this.shadowRoot
      .querySelectorAll(".umboarding-reservation-container-submit-code")
      .forEach((element) => {
        element.style.display = "none";
      });

    this.validationButton();
  }

  disableControls(index) {
    this.allBoxSpans.forEach((element, i) => {
      if (index == i) {
        element.innerHTML = "Cancelar";
        this.allInputs.item(i).setIsDisabledInput(false);
        this.allInputs.item(i).focusInput();
        this.submitCodeButtons.item(i).style.display = "block";
        this.submitCodeButtons.item(i).disabled = true;
        this.resendCodeButtons.item(i).style.display = "none";
        element.addEventListener("click", () => this.enableControls());
        this.shadowRoot.getElementById(
          "umboarding-container-confirmation-button"
        ).style.display = "none";
      } else {
        element.style.display = "none";
      }
    });

    this.shadowRoot
      .querySelectorAll(".umboarding-reservation-container-submit-code")
      .item(index).style.display = "flex";
  }

  submitCode(index) {
    this.stopCountdown(index);
    this.allCodes.item(index).resetCode();
    this.allInputs.item(index).setIsDisabledInput(true);
    this.allInputs
      .item(index)
      .setValueInput(this.allInputs.item(index).getValueInput());
    this.resendCodeButtons.item(index).style.display = "block";
    this.submitCodeButtons.item(index).disabled = true;
    this.updateCountdown(20, index);
    this.shadowRoot.querySelectorAll(
      ".umboarding-verification-container-opt-code"
    )[index].style.display = "flex";
    this.allCodes[index].style.display = "block";
    this.allCodes[index].inputFocus();
  }
}

customElements.define("verification-webcomponent", VerificationWebComponent);

//verificar o input

// document
//   .querySelector(".umboarding-verification-container")
//   .addEventListener("focusout", () => {
//     document.querySelector(
//       ".umboarding-verification-container"
//     ).style.transform = "translateY(0)";
//   });

// function handleToggleRedirect() {
//   window.parent.document.getElementById("review").style.display = "none";
//   window.parent.document.getElementById("address").scrollIntoView();
// }
