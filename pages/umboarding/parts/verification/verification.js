let userInformation = [
  {
    data: "example@gmail.com",
    isValid: true,
  },
  {
    data: "+55 (21) 98178-9087",
    isValid: true,
  },
];

let timeoutId;

const allInputs = document.querySelectorAll("input-field");

const allCodes = document.querySelectorAll("opt-input");

const allBoxSpans = document.querySelectorAll(
  ".umboarding-verification-container-box span"
);

const submitCodeButtons = document.querySelectorAll('.umboarding-reservation-container-submit-code-button')

const resendCodeButtons = document.querySelectorAll(".umboarding-reservation-container-submit-code-resend");

window.addEventListener("load", () => {
  allInputs.forEach((item, index) => {
    item.setValueInput(userInformation[index].data);
    item.setIsDisabledInput(true)
  });
  enableControls();
  validationButton();
});

function stopCountdown(index) {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  resendCodeButtons.item(index).disabled = false;

  submitCodeButtons.item(index).disabled = false;
  resendCodeButtons.item(index).innerHTML = "Não recebeu? <br> Reenviar código";
}

function updateCountdown(seconds, index) {
  resendCodeButtons.item(index).innerHTML = `Não recebeu? <br> Reenviar código (${seconds}s)`;
  if (seconds > 0) {
    resendCodeButtons.item(index).disabled = true;
    resendCodeButtons.item(index).disabled = true;
    timeoutId = setTimeout(function () {
      updateCountdown(seconds - 1, index);
    }, 1000);
  } else {
    stopCountdown(index);
  }
}

function validationButton() {
  document.getElementById(
    "umboarding-container-confirmation-button"
  ).style.display = !(userInformation[0].isValid && userInformation[1].isValid)
    ? "none"
    : "block";
}

function enableControls() {
  allBoxSpans.forEach((element, i) => {
    element.style.display = "block";
    element.innerHTML = "Trocar";
    allInputs.item(i).setValueInput(userInformation[i].data)
    stopCountdown(i)
    //botão desabilitado
    element.addEventListener("click", () => disableControls(i));
    allInputs.item(i).setIsDisabledInput(true)
    allCodes.item(i).style.display = "none";
  });

  document
    .querySelectorAll(".umboarding-reservation-container-submit-code")
    .forEach((element) => {
      element.style.display = "none";
    });

  validationButton();
}

function disableControls(index) {
  allBoxSpans.forEach((element, i) => {
    if (index == i) {
      element.innerHTML = "Cancelar";
      allInputs.item(i).setIsDisabledInput(false);
      allInputs.item(i).focusInput();
      submitCodeButtons.item(i).style.display="block";
      submitCodeButtons.item(i).disabled = true;
      resendCodeButtons.item(i).style.display = "none";
      element.addEventListener("click", () => enableControls());
      document.getElementById("umboarding-container-confirmation-button").style.display = "none";
    } else {
      element.style.display = "none";
    }
  });

  document
    .querySelectorAll(".umboarding-reservation-container-submit-code")
    .item(index).style.display = "flex";
}

//verificar o input

allInputs.forEach((item, index) => {
  item.addEventListener("verifyText", (event) => {
    submitCodeButtons.item(index).disabled = !event.detail
  });
});

allCodes.forEach((item, index) => {
  item.addEventListener("verifyCode", (event) => {
    let messageError = document.querySelectorAll(
      ".umboarding-verification-container-opt-code span"
    );
    if (event.detail) {
      userInformation[index].data = allInputs.item(index).getValueInput();
      userInformation[index].isValid = event.detail;
      allInputs.item(index).setIsDisabledInput(userInformation[index].isValid);

      item.style.display = "none";
      messageError.item(index).style.display = "none";
      enableControls(index);
    } else {
      messageError
        .item(index)
        .classList.toggle(
          "umboarding-verification-container-opt-code-animation-error"
        );
      item.resetCode();
      messageError.item(index).style.display = "block";
    }
    validationButton();
  });
});

function submitCode(index) {
  stopCountdown(index);
  allCodes.item(index).resetCode();
  allInputs.item(index).setIsDisabledInput(true)
  allInputs.item(index).setValueInput(allInputs.item(index).getValueInput())
  resendCodeButtons.item(index).style.display = "block";
  submitCodeButtons.item(index).disabled = true;
  updateCountdown(20, index);
  document.querySelectorAll(".umboarding-verification-container-opt-code")[
    index
  ].style.display = "flex";
  allCodes[index].style.display = "block";
  allCodes[index].inputFocus();
}

function handleToggleRedirect() {
  window.parent.document.getElementById('address').scrollIntoView();
}
