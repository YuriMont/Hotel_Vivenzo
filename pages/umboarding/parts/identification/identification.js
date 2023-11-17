const imageContainer = document.querySelector(
  ".umboarding-identification-container-camera"
);

const verificationContainer = document.querySelector(
    ".umboarding-identification-container-verification"
  );

const imagePreview = document.getElementById('imagePreview');

const input = document.getElementById("imageInput");

function showPreview() {
  if (input.files && input.files[0]) {
    var fileReader = new FileReader();

    imageContainer.style.display="none";
    verificationContainer.style.display = "flex";

    fileReader.onload = function (e) {
      imagePreview.src = e.target.result;
    };

    // Lê o arquivo como uma URL de dados
    fileReader.readAsDataURL(input.files[0]);
  }
}

input.addEventListener("change", showPreview);

function redirect() {
  setTimeout(function () {
    window.location.href = "/pages/umboarding/parts/review/review.html";
  }, 10000); // 10 segundos
}

//window.onload = redirect;
