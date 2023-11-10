const templateInputRange = document.createElement("template");
templateInputRange.innerHTML = `
<link rel="stylesheet" href="/components/range/input-range.css" />

<div class="input-ranger-container">
      <span id="input-ranger-container-span"></span>  
      <input type="range" id="ranger" value="0"/>
      <div id="range-value"></div>
</div>
`;

class InputRange extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    let clone = templateInputRange.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);
    this._typeRanger = "";
  }

  set typeRanger(type) {
    const spanContainer = this.shadowRoot.getElementById("input-ranger-container-span");
    const ranger = this.shadowRoot.getElementById("ranger");
    if (type == "color") {
      ranger.setAttribute("min", "0");
      ranger.setAttribute("max", "360");
      ranger.setAttribute("step", "10");
      ranger.classList.add("input-ranger-container-with-color");

      ranger.addEventListener("input", () => {
        document.documentElement.style.setProperty('--intensify-color', `hsl(${ranger.value},100%,50%)`);
      })

      spanContainer.innerText = "Cor";
      spanContainer.classList.add("input-ranger-container-info");
    } else if (type == "intensify") {
      ranger.setAttribute("min", "0");
      ranger.setAttribute("max", "360");
      ranger.setAttribute("step", "1");
      ranger.classList.add("input-ranger-container-with-intensify");

      spanContainer.innerText = "Intensidade";
      spanContainer.classList.add("input-ranger-container-info");
    } else if (type == "ventilation") {
      ranger.setAttribute("min", "0");
      ranger.setAttribute("max", "4");
      ranger.setAttribute("step", "1");

      spanContainer.innerHTML = `
        <span>0</span>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
      `;
      spanContainer.classList.add("input-ranger-container-ticks");
    } else if (type == "temperature") {
      ranger.setAttribute("min", "12");
      ranger.setAttribute("max", "27");
      ranger.setAttribute("step", "0.1");

      const rangerValue = this.shadowRoot.getElementById("range-value");
      rangerValue.innerText = '12 ºC'

      ranger.addEventListener("input", function () {
        const value = ranger.value;
        rangerValue.innerText = `${value} ºC`;
        const percent = ((value - ranger.getAttribute('min')) / (ranger.getAttribute('max') - ranger.getAttribute('min'))) * 100;
        rangerValue.style.left = percent + "%";
      });

      spanContainer.innerHTML = `
        <span>Min</span>
        <span>Máx</span>
      `;
      spanContainer.classList.add("input-ranger-container-info");
    }
  }

  get typeRanger() {
    return this._typeRanger;
  }

  connectedCallback() {
    this.typeRanger = this.getAttribute("type-range") || "";
  }
}

customElements.define("input-range", InputRange);
