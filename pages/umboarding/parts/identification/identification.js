const video = document.getElementById("cameraFeed");

function scrollToNextIframe(page) {
  const stream = video.srcObject;
  const tracks = stream.getTracks();

  tracks.forEach((track) => track.stop());

  video.srcObject = null;
  window.parent.document.getElementById(page).scrollIntoView();
}

const targetElement = window.parent.document.getElementById('identification')

function executeFunctionWhenElementInViewport(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
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
}

const observer = new IntersectionObserver(executeFunctionWhenElementInViewport, { threshold: 0.2 });

observer.observe(targetElement);

const allSection = document.querySelectorAll("section");

function nextStep(next_step) {
  allSection.item(next_step - 1).style.display = "none";
  allSection.item(next_step).style.display = "flex";
}
