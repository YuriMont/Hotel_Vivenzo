const video = document.getElementById("cameraFeed");

function scrollToNextIframe(page) {
  window.parent.document.getElementById(page).scrollIntoView();
}

navigator.mediaDevices
  .getUserMedia({ video: true })
  .then(function (stream) {
    video.srcObject = stream;
    video.onloadedmetadata = function (e) {
      video.play();
    };
  })
  .catch(function (err) {
    console.log(err.name + ": " + err.message);
  });

const allSection = document.querySelectorAll("section");

function nextStep(next_step) {
  allSection.item(next_step - 1).style.display = "none";
  allSection.item(next_step).style.display = "flex";
}
