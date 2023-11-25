const templatePopup = document.createElement("template");
templatePopup.innerHTML = `
  <link rel="stylesheet" href="/components/popup/modal-popup.css" />
  <button class="modal-popup-button" id="openModalBtn">
    <slot name="button-content"></slot>
  </button>
  <div class="modal-popup-container" id="pop-up">
    <div class="modal-popup-container-content">
      <div class="modal-popup-container-content-icon">
        <slot name="icon-popup"></slot>
      </div>
      <slot name="content"></slot>
    </div>
  </div>
`;

class ModalPopUp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    let clone = templatePopup.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);
    this.modal = this.shadowRoot.getElementById("pop-up");
    this.openButton = this.shadowRoot.getElementById("openModalBtn");

    this.open = false;
    this.modalContent = this.shadowRoot.querySelector(
      ".modal-popup-container-content"
    );

    this.startY;

    this.is_overlaid = false;

    document.addEventListener("DOMContentLoaded", () => {
      this.openButton.addEventListener("click", this.toggleModal.bind(this));
      this.modal.addEventListener("click", this.closeModal.bind(this));
    });
  }

  set isOverlaid(is_overlaid) {
    this.is_overlaid = is_overlaid;
  }

  toggleModal() {
    this.open = !this.open;

    window.onbeforeunload = function () {
      return ".";
    };

    if (this.open) {
      window.document.body.style.overflow = "hidden";
      this.modal.style.display = "grid";
      this.modalContent.style.transition =
        "top 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both"; // Adicionando transição
      this.modalContent.style.top = this.is_overlaid ? "10vh" : "0";
    } else {
      window.document.body.style.overflow = "auto";

      if (this.is_overlaid) {
        // Adicionando uma animação ao fechar o modal
        this.modalContent.style.top = "100%"; // Movendo para a parte inferior
      } else {
        // Sem animação ao fechar o modal quando não está sobreposto
        this.modalContent.style.transition =
          "top 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both";
        this.modalContent.style.top = "100vh";
      }

      setTimeout(() => {
        this.modal.style.display = "none";
        this.modalContent.style.top = "0";
      }, 600); // Aguardando o término da animação antes de ocultar completamente o modal
    }
  }

  closeModal(event) {
    if (this.open && event.target === this.modal && !this.dragging) {
      this.toggleModal();
    }
  }

  connectedCallback() {
    this.isOverlaid = this.getAttribute("is-overlaid") || false;

    this.modalContent.addEventListener("touchstart", (e) => {
      const touchAreaHeight = 50; // Defina a altura da área de toque desejada

      const rect = this.modalContent.getBoundingClientRect();
      const topBoundary = rect.top + touchAreaHeight;

      if (
        e.touches[0].clientY >= rect.top &&
        e.touches[0].clientY <= topBoundary
      ) {
        this.dragging = true;
        this.startY = e.touches[0].clientY;
      }
    });

    this.modalContent.addEventListener("touchmove", (e) => {
      if (this.dragging) {
        var dy = e.touches[0].clientY - this.startY;
        if (dy > 0) {
          var top =
            parseInt(window.getComputedStyle(this.modalContent).top) || 0;
          let distance = top + dy + 16;
          this.modalContent.style.top = distance + "px";
        }
        this.startY = e.touches[0].clientY;
      }
    });

    this.modalContent.addEventListener("touchend", () => {
      if (this.dragging) {
        this.dragging = false;
        this.toggleModal();
      }
    });
  }
}

customElements.define("modal-popup", ModalPopUp);
