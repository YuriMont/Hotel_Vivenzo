const allInputs = document.querySelectorAll(
  ".umboarding-payment-container-credicard-input-field-text input"
);

allInputs.forEach(function (input) {
  input.addEventListener("input", function () {
    var hasFieldNone = Array.from(allInputs).every(function (input) {
      return input.value.trim() !== "";
    });

    document.getElementById("confirmation-button").disabled = !hasFieldNone;
  });

  input.addEventListener("focus", () => {
    window.parent.document.getElementById("address").style.display = 'none'
    document.querySelector('.umboarding-payment-container').style.transform = 'translateY(-50%)';
  });

  input.addEventListener("blur", () => {
    document.querySelector('.umboarding-payment-container').style.transform = 'translateY(0)';
  });
});

function nextInput(event, index) {
  if (event.key === "Enter") {
    if (index + 1 != allInputs.length) {
      allInputs.item(index + 1).focus();
    } else {
      allInputs.item(index).blur();
    }
  }
}

window.addEventListener("load", () => {
  document.getElementById("confirmation-button").disabled = true;
});

function redirect() {
  window.parent.document.getElementById("waiting").scrollIntoView();
}

function editVal(input) {
  var val = input.value;
  // Remove caracteres não numéricos
  val = val.replace(/\D/g, "");

  if (val.length > 2) {
    val = val.substring(0, 2) + "/" + val.substring(2);
  }
  input.value = val;
}

function editCard(input) {
  var card = input.value;

  // Remove caracteres não numéricos
  card = card.replace(/\D/g, "");

  // Adiciona espaços a cada 4 dígitos
  card = card.replace(/(\d{4})(?=\d)/g, "$1 ");

  input.value = card.trim();
}
