const video = document.getElementById("cameraFeed");

function scrollToNextIframe(page) {
  const stream = video.srcObject;
  const tracks = stream.getTracks();

  tracks.forEach((track) => track.stop());

  video.srcObject = null;
  window.parent.document.getElementById(page).scrollIntoView();
}

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

function executeFunctionWhenElementInViewport() {
  var targetElement = window.parent.document.getElementById('identification')

  if (isElementInViewport(targetElement)) {
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
  }
}

window.parent.document.addEventListener("scroll", executeFunctionWhenElementInViewport);

const allSection = document.querySelectorAll("section");

function nextStep(next_step) {
  allSection.item(next_step - 1).style.display = "none";
  allSection.item(next_step).style.display = "flex";
}
