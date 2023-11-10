const templateMinibarContent = document.createElement("template");
templateMinibarContent.innerHTML = `
<link rel="stylesheet" href="/pages/reservation/home/options/minibar/minibar-content.css">
<div class="minibar-content-container">
<h2>Frigobar</h2>
   <ul>
      <li>
        <item-list property-product="Refrigerante Coca Cola (350ml)" property-price="5">
          <img
            slot="image-item"
            src="/pages/reservation/home/options/minibar/images/img1.png"
            alt=""
          />
        </item-list>
      </li>
      <li>
        <item-list property-product="Refrigerante Antártica (350ml)" property-price="4.5">
          <img
            slot="image-item"
            src="/pages/reservation/home/options/minibar/images/img2.png"
            alt=""
          />
        </item-list>
      </li>
      <li>
        <item-list property-product="Energético RedBull (250ml)" property-price="8">
          <img
            slot="image-item"
            src="/pages/reservation/home/options/minibar/images/img4.png"
            alt=""
          />
        </item-list>
      </li>
      <li>
        <item-list property-product="Energético Monster (473ml)" property-price="10">
          <img
            slot="image-item"
            src="/pages/reservation/home/options/minibar/images/img5.png"
            alt=""
          />
        </item-list>
      </li>
      <li>
        <item-list property-product="Cerveja Schin (473ml)" property-price="3">
          <img
            slot="image-item"
            src="/pages/reservation/home/options/minibar/images/img6.png"
            alt=""
          />
        </item-list>
      </li>
      <li>
      <item-list property-product="Água Mineral (500ml)" property-price="2">
        <img
          slot="image-item"
          src="/pages/reservation/home/options/minibar/images/img7.png"
          alt=""
        />
      </item-list>
    </li>
    </ul>
    <div class="minibar-content-container-confirmation">
      <span>
        <h3>Total</h3>
        <h3>R$ 19.80</h3>
      </span>
      <button>Confirmar</button>
    </div>
</div>
`;

class MinibarContent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    let clone = templateMinibarContent.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);
  }
}

customElements.define("minibar-content", MinibarContent);
