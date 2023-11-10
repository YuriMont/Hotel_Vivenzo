const templateBedContent = document.createElement("template");
templateBedContent.innerHTML = `
<link rel="stylesheet" href="/pages/reservation/home/options/bed/bed-content.css">
<div class="bed-content-container">
<h2>Cama</h2>
    <ul>
      <li>
        <item-list property-product="Lençol" property-price="8">
          <img
            slot="image-item"
            src="/pages/reservation/home/options/bed/images/img1.png"
            alt=""
          />
        </item-list>
        <div class="bed-content-container-complain-button">
            <button>Reclamar</button>
        </div>
      </li>
      <li>
        <item-list property-product="Cobertor" property-price="10">
          <img
            slot="image-item"
            src="/pages/reservation/home/options/bed/images/img2.png"
            alt=""
          />
        </item-list>
        <div class="bed-content-container-complain-button">
            <button>Reclamar</button>
        </div>
      </li>
      <li>
        <item-list property-product="Petálas de rosa" property-price="50">
        <img
            slot="image-item"
            src="/pages/reservation/home/options/bed/images/img3.png"
            alt=""
        />
        </item-list>
        <div class="bed-content-container-complain-button">
            <button>Reclamar</button>
        </div>
      </li>
      <li>
        <item-list property-product="Champagne" property-price="80">
          <img
            slot="image-item"
            src="/pages/reservation/home/options/bed/images/img4.png"
            alt=""
          />
        </item-list>
        <div class="bed-content-container-complain-button">
            <button>Reclamar</button>
        </div>
      </li>
    </ul>
    <div class="bed-content-container-confirmation">
      <span>
        <h3>Total</h3>
        <h3>R$ 19.80</h3>
      </span>
      <button>Confirmar</button>
    </div>
</div>
`;

class BedContent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    let clone = templateBedContent.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);
  }
}

customElements.define("bed-content", BedContent);
