import "/components/item-list/item-list.js"

const templateBreakfast = document.createElement("template");
templateBreakfast.innerHTML = `
<link rel="stylesheet" href="/pages/reservation/home/options/breakfast/breakfast-content.css">
<div class="breakfast-content-container">
<h2>Café da manhã</h2>
<div class="breakfast-content-container-foods">
<div class="breakfast-content-container-icon">
  <img
    src="/pages/reservation/home/options/breakfast/icons/breads.svg"
    alt=""
  />
  <p>Pães</p>
</div>

<div class="breakfast-content-container-icon">
  <img
    src="/pages/reservation/home/options/breakfast/icons/drinks.svg"
    alt=""
  />
  <p>Bebidas</p>
</div>

<div class="breakfast-content-container-icon">
  <img
    src="/pages/reservation/home/options/breakfast/icons/dairy_products.svg"
    alt=""
  />
  <p>Laticinios</p>
</div>

<div class="breakfast-content-container-icon">
  <img
    src="/pages/reservation/home/options/breakfast/icons/fruits.svg"
    alt=""
  />
  <p>Frutas</p>
</div>
</div>
<ul>
<li>
  <item-list property-product="Pão com manteiga" property-price="1.50">
    <img
      slot="image-item"
      src="/pages/reservation/home/options/breakfast/images/img1.png"
      alt=""
    />
  </item-list>
</li>
<li>
  <item-list
    property-product="Café com leite (320ml)"
    property-price="1.50"
  >
    <img
      slot="image-item"
      src="/pages/reservation/home/options/breakfast/images/img2.png"
      alt=""
    />
  </item-list>
</li>
<li>
  <item-list property-product="Suco de Laranja" property-price="1.50">
    <img
      slot="image-item"
      src="/pages/reservation/home/options/breakfast/images/img3.png"
      alt=""
    />
  </item-list>
</li>
<li>
  <item-list
    property-product="Presunto e Queijo (200g)"
    property-price="1.50"
  >
    <img
      slot="image-item"
      src="/pages/reservation/home/options/breakfast/images/img4.png"
      alt=""
    />
  </item-list>
</li>
<li>
  <item-list property-product="Ovo frito" property-price="1.50">
    <img
      slot="image-item"
      src="/pages/reservation/home/options/breakfast/images/img5.png"
      alt=""
    />
  </item-list>
</li>
<li>
  <item-list property-product="Maçã" property-price="1.50">
    <img
      slot="image-item"
      src="/pages/reservation/home/options/breakfast/images/img6.png"
      alt=""
    />
  </item-list>
</li>
</ul>
<div class="breakfast-content-container-confirmation">
<span>
  <h3>Total</h3>
  <h3>R$ 19.80</h3>
</span>
<button>Confirmar</button>
</div>
</div>
`;

class BreakfastContent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    let clone = templateBreakfast.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);
  }
}

customElements.define("breakfast-content", BreakfastContent);

export { BreakfastContent }