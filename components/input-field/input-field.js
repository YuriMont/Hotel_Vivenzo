const templateInputField = document.createElement("template");
templateInputField.innerHTML = `
<link rel="stylesheet" href="/components/input-field/input-field.css" />
<div class="input-field-container">
      <div class="input-field-container-text">
        <input id="input-field" required/>
        <label id="label-text"></label>
      </div>
      <div class="input-field-container-popover">
        <div class="input-field-container-popover-content" id="content-popover">
        </div>
        <button class="input-field-container-popover-trigger" id="popover">
          <img src="/pages/umboarding/images/info.svg" alt="" />
        </button>
      </div>
    </div>
`;

class InputField extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    let clone = templateInputField.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);

    this.inputField = this.shadowRoot.getElementById("input-field");
    this.btn = this.shadowRoot.getElementById("popover");
    this.popoverContent = this.shadowRoot.getElementById("content-popover");
    this.labelText = this.shadowRoot.getElementById("label-text");
    this.isPopoverVisible = false;
    this._isRequired = false;
    this.initialText = "";

    document.addEventListener("DOMContentLoaded", () => {
      this.btn.addEventListener("click", this.togglePopover.bind(this));
      this.inputField.addEventListener("input", this.verifyModification.bind(this));
    });
  }

  togglePopover() {
    this.popoverContent.style.display = this.isPopoverVisible ? "none" : "flex";
    this.popoverContent.innerText = "teste";
    this.isPopoverVisible = !this.isPopoverVisible;
  }

  focusInput() {
    this.inputField.focus();
  }

  set textField(text) {
    this.labelText.innerText = text;
  }

  set typeInput(type) {
    this.inputField.setAttribute("type", type);
  }

  verifyModification() {
    let currentInput = this.inputField.value;

    this.dispatchEvent(
      new CustomEvent("verifyText", {
        detail: currentInput !== this.initialText,
      })
    );
  }

  showRequiredField() {
    if (this._isRequired) {
      this.labelText.innerHTML += this.labelText.innerHTML.endsWith("*")
        ? ""
        : " *";
      this.labelText.style.color = "red";
    }
  }

  setValueInput(value) {
    this.initialText = value
    this.inputField.setAttribute("value", value);
  }

  getValueInput() {
    return this.inputField.value;
  }

  setIsDisabledInput(isDisabled) {
    this.inputField.disabled = isDisabled
  }

  set contentPopover(content) {
    this.shadowRoot.getElementById("content-popover").innerText = content;
  }

  set isRequired(isRequiredField) {
    this._isRequired = isRequiredField;
  }

  connectedCallback() {
    this.textField = this.getAttribute("text-field") || "";
    this.isRequired = this.getAttribute("required-field") || false;
    this.contentPopover = this.getAttribute("content-popover") || "";
    this.typeInput = this.getAttribute("type-input") || "text";
  }
}

customElements.define("input-field", InputField);
