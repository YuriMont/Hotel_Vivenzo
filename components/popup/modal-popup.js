const templatePopup = document.createElement("template");
templatePopup.innerHTML = `
  <link rel="stylesheet" href="/components/popup/modal-popup.css" />
  <button class="modal-popup-button" id="openModalBtn">
    <slot name="button-content"></slot>
  </button>
  <div class="modal-popup-container" id="pop-up">
  <div class="modal-popup-container-content">
      <img src="/components/popup/icon/close.svg" id="close-modal"/>
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
    this.closeButton = this.shadowRoot.getElementById("close-modal");

    this.open = false;
    this.modalContent = this.shadowRoot.querySelector(
      ".modal-popup-container-content"
    );

    this.is_overlaid = false;

    document.addEventListener("DOMContentLoaded", () => {
      this.openButton.addEventListener("click", this.toggleModal.bind(this));
      this.modal.addEventListener("click", this.closeModal.bind(this));
      this.closeButton.addEventListener("click", this.toggleModal.bind(this));
    });
  }

  set isOverlaid(is_overlaid) {
    this.is_overlaid = is_overlaid;
  }

  toggleModal() {
    this.open = !this.open;

    if (this.open) {
      window.document.body.style.overflow = "hidden";
      this.modal.style.display = "grid";
      this.modalContent.style.top = this.is_overlaid ? "10vh" : "0";
    } else {
      this.modalContent.style.transition = "transform 2s ease-out;"
      this.modalContent.style.transform = "translateY(100%)";
      
      setTimeout(()=>{
        window.document.body.style.overflowY = "auto";
        this.modal.style.display = "none";
      }, 2000)
    }
  }

  closeModal(event) {
    if (this.open && event.target === this.modal && !this.dragging) {
      this.toggleModal();
    }
  }

  connectedCallback() {
    this.isOverlaid = this.getAttribute("is-overlaid") || false;
  }
}

customElements.define("modal-popup", ModalPopUp);
