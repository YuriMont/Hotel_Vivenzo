const video = document.getElementById("cameraFeed");

const isNotSafari = !(/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor))

function scrollToNextIframe(page) {
  const stream = video.srcObject;

  if (stream) {
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());

    video.srcObject = null;
  }
  window.parent.document.getElementById(page).scrollIntoView();
}

const targetElement = window.parent.document.getElementById("identification");

function executeFunctionWhenElementInViewport(entries, observer) {
  setTimeout(function () {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        isNotSafari ? window.parent.document.getElementById("umboarding").style.display = "none" : null;
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
    });
  }, 2000);
}

const observer = new IntersectionObserver(
  executeFunctionWhenElementInViewport,
  { threshold: 0.2 }
);

observer.observe(targetElement);

const allSection = document.querySelectorAll("section");

function nextStep(next_step) {
  allSection.item(next_step - 1).style.display = "none";
  allSection.item(next_step).style.display = "flex";
}
