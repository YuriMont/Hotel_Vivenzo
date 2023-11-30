// identification-webcomponent.js
import "/components/language-select/language-select.js";

const templateIdentificationWebComponent = document.createElement("template");
templateIdentificationWebComponent.innerHTML = `
  <link rel="stylesheet" href="/pages/umboarding/parts/identification/identification.css" />
  <video id="cameraFeed" class="umboarding-identification-container-content"></video>

  <section id="step-1" class="umboarding-identification-container">
    <div class="umboarding-identification-container-wrapper">
      <h1>Centralize a frente do seu documento</h1>
    </div>
    <div class="umboarding-identification-container-controls">
      <button>
        <img src="/pages/umboarding/parts/identification/images/lanterna.png" alt="" />
      </button>
      <button class="action-button">
        <img src="/pages/umboarding/parts/identification/images/selecionado.png" alt="" />
      </button>
      <button>
        <img src="/pages/umboarding/parts/identification/images/galeria.png" alt="" />
      </button>
    </div>
  </section>

  <section id="step-2" class="umboarding-identification-container">
    <div class="umboarding-identification-container-wrapper">
      <h1>Centralize o verso do seu documento</h1>
    </div>
    <div class="umboarding-identification-container-controls">
      <button>
        <img src="/pages/umboarding/parts/identification/images/lanterna.png" alt="" />
      </button>
      <button class="action-button">
        <img src="/pages/umboarding/parts/identification/images/selecionado.png" alt="" />
      </button>
      <button>
        <img src="/pages/umboarding/parts/identification/images/galeria.png" alt="" />
      </button>
    </div>
  </section>

  <section id="step-3" class="umboarding-identification-container">
    <h1>Tire uma selfie</h1>
    <div class="umboarding-identification-container-controls">
      <button>
        <img src="/pages/umboarding/parts/identification/images/lanterna.png" alt="" />
      </button>
      <button class="action-button">
        <img src="/pages/umboarding/parts/identification/images/selecionado.png" alt="" />
      </button>
      <button>
        <img src="/pages/umboarding/parts/identification/images/galeria.png" alt="" />
      </button>
    </div>
  </section>`;

class IdentificationWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    let clone = templateIdentificationWebComponent.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);

    this.allSections = this.shadowRoot.querySelectorAll("section");
    this.video = this.shadowRoot.getElementById("cameraFeed");
    this.isInIdentificationSection = false;

    document.addEventListener("DOMContentLoaded", () => {
      window.addEventListener("hashchange", this.verifyURL.bind(this));
      this.shadowRoot
        .querySelectorAll(".action-button")
        .forEach((item, index) =>
          index != this.shadowRoot.querySelectorAll(".action-button").length - 1
            ? item.addEventListener("click", () => this.nextStep(index + 1))
            : item.addEventListener(
                "click",
                this.scrollToNextSection.bind(this)
              )
        );
    });
  }

  nextStep(next_step) {
    this.allSections.item(next_step - 1).style.display = "none";
    this.allSections.item(next_step).style.display = "flex";
  }

  executeFunctionWhenElementInViewport() {
    setTimeout(() => {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        this.video.srcObject = stream;
        this.video.onloadedmetadata = function (e) {
          this.play();
        };
      });
    }, 2000);
  }

  scrollToNextSection() {
    const stream = this.video.srcObject;

    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      this.video.srcObject = null;
    }

    window.location.href = "#review";
  }

  verifyURL() {
    let id = window.location.href.split("#")[1];
    this.isInIdentificationSection = id === "identification";
    if (this.isInIdentificationSection) {
      this.executeFunctionWhenElementInViewport();
    }
  }
}

customElements.define(
  "identification-webcomponent",
  IdentificationWebComponent
);
