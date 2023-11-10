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
    document.addEventListener("DOMContentLoaded", () => {
      this.openButton.addEventListener("click", this.toggleModal.bind(this));
      this.modal.addEventListener("click", this.closeModal.bind(this));
    });
  }

  set isOverlaid(is_overlaid){
    is_overlaid ? this.shadowRoot.querySelectorAll(".modal-popup-container-content").item(0).style.top = "10vh" : null;
  }

  toggleModal() {
    this.open = !this.open;
    this.modal.style.display = this.open ? "grid" : "none";
  }

  closeModal(event) {
    if (this.open && event.target === this.modal) {
      this.toggleModal();
    }
  }

  connectedCallback() {
    this.isOverlaid = this.getAttribute("is-overlaid") || false;
  }
}

customElements.define("modal-popup", ModalPopUp);
