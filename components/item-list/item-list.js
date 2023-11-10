const templateItemList = document.createElement("template");
templateItemList.innerHTML = `
<link rel="stylesheet" href="/components/item-list/item-list.css" />
<div class="container-item-list">
      <div class="container-item-list-product">
        <slot name="image-item"></slot>
        <div class="container-item-list-product-information">
          <span id="product" class="container-item-list-product-name"></span>
          <span id="price" class="container-item-list-product-value"></span>
        </div>
      </div>

      <div class="container-item-list-quantity">
        <span class="container-item-list-quantity-controls">
          <button>&minus;</button>
          <span class="container-item-list-quantity-total">0</span>
          <button>&plus;</button>
        </span>
        <span id="total" class="container-item-list-product-value"> Total: R$ 3,00 </span>
      </div>
</div>
`;

class ItemList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    let clone = templateItemList.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);
    this._propertyProduct = "";
    this._propertyPrice = "";
  }

  set propertyProduct(product) {
    this.shadowRoot.getElementById("product").textContent = product;
  }

  set propertyPrice(price) {
    this.shadowRoot.getElementById("price").textContent = `R$ ${Number(price).toFixed(2)}`;
  }

  connectedCallback() {
    this.propertyProduct = this.getAttribute("property-product") || "";
    this.propertyPrice = this.getAttribute("property-price") || "";
  }
}

customElements.define("item-list", ItemList);
