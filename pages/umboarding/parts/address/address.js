const allInputs = document.querySelectorAll("input-field");

const isNotSafari = !(/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor));

function nextInput(event, index) {
  if (event.key === "Enter") {
    if (index + 1 != allInputs.length) {
      allInputs.item(index + 1).focusInput();
    } else {
      showAddress();
    }
  }
}

document.querySelector('.umboarding-address-container-card-box').addEventListener('focusin', () => {
  if(isNotSafari){
    window.parent.document.getElementById("verification").style.display = 'none';
  
    document.querySelector('.umboarding-address-container').style.transform = 'translateY(-20%)'
  }
});

document.querySelector('.umboarding-address-container-card-box').addEventListener('focusout', () => {
  document.querySelector('.umboarding-address-container').style.transform = 'translateY(0)'
});

function hasRequiredFieldNone() {
  let control = false;
  allInputs.forEach((item) => {
    if (item.hasAttribute("required-field") && item.getValueInput() == "") {
      item.showRequiredField();
      control = true;
    }
  });
  return control;
}

function showAddress() {
  if (!hasRequiredFieldNone()) {
    document
      .querySelectorAll(".umboarding-address-container-card")
      .item(1).style.display = "flex";
    document
      .querySelectorAll(".umboarding-address-container-card")
      .item(0).style.display = "none";
  }
}

function hideAddress() {
  allInputs.item(0).style.color = "red";
  document
    .querySelectorAll(".umboarding-address-container-card")
    .item(0).style.display = "flex";
  document
    .querySelectorAll(".umboarding-address-container-card")
    .item(1).style.display = "none";
}

function nextPage() {
  window.parent.document.getElementById('payment').scrollIntoView();
}
