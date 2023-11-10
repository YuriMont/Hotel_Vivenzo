const templateOptInput = document.createElement("template");
templateOptInput.innerHTML = `
<link rel="stylesheet" href="/components/opt-input/opt-input.css" />
<div id="inputs" class="opt-input-container">
        <input id="first-box" class="opt-input-container-box" type="number" inputmode="numeric" maxlength="1" />
        <input class="opt-input-container-box" type="number" inputmode="numeric" maxlength="1" />
        <input class="opt-input-container-box" type="number" inputmode="numeric" maxlength="1" />
        <input class="opt-input-container-box" type="number" inputmode="numeric" maxlength="1" />
        <input class="opt-input-container-box" type="number" inputmode="numeric" maxlength="1" />
        <input class="opt-input-container-box" type="number" inputmode="numeric" maxlength="1" />
</div>
`;

class OptInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    let clone = templateOptInput.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);
    this.inputs = this.shadowRoot.getElementById("inputs");
    this.codeVerified = "123456";
    this.value = "";

    document.addEventListener("DOMContentLoaded", () => {
      this.inputs.addEventListener("input", this.insertCode.bind(this));
      this.inputs.addEventListener("keyup", this.editCode.bind(this));
    });
  }

  inputFocus(){
    this.shadowRoot.getElementById('first-box').focus();
  }

  resetCode(){
    this.shadowRoot.querySelectorAll('input').forEach((item) => item.value = '');
    this.inputFocus();
    this.value = ""
  }

  insertCode(e) {
    const target = e.target;
    const val = target.value;

    if (isNaN(val)) {
      target.value = "";
      return;
    }

    if (val != "") {
      this.setValue();
      if(this.value.join('').length==6){
        this.dispatchEvent(
          new CustomEvent("verifyCode", { detail: this.value.join('') === this.codeVerified })
        );
      }
      const next = target.nextElementSibling;
      if (next) {
        next.focus();
      }
    }
  }

  editCode(e) {
    const target = e.target;
    const key = e.key.toLowerCase();

    if (key === "delete" || key === "backspace") {
      if (target.lastKey === key) {
        target.value = "";
        const prev = target.previousElementSibling;
        if (prev) {
          prev.focus();
        }
        target.lastKey = null;
      } else {
        target.lastKey = key;
      }
    } else {
      target.lastKey = null;
    }
    this.setValue()
  }

  setValue() {
    this.value = Array.from(this.shadowRoot.querySelectorAll("input")).map(item => (item.value));
  }

  connectedCallback() {
    this.titleHeader = this.getAttribute("title-header") || "";
    this.typeHeader = this.getAttribute("header-type") || "default";
  }
}

customElements.define("opt-input", OptInput);
