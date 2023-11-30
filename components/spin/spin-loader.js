const templateSpinLoader = document.createElement("template");
templateSpinLoader.innerHTML = `
<link rel="stylesheet" href="/components/spin/spin-loader.css" />
<img class="spin-loader" src="/components/spin/icon/spinner.svg" alt="" />
`;

class SpinLoader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    let clone = templateSpinLoader.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);
  }
}

customElements.define("spin-loader", SpinLoader);

export { SpinLoader };
