const templateCarrouselContent = document.createElement("template");
templateCarrouselContent.innerHTML = `
<link rel="stylesheet" href="/components/carrousel/carrousel.css" />

<div class="carousel-container">
  <h2>Selecione um quarto</h2>
  <div class="carousel-container-slider" id="carousel">
    <div class="carousel-container-slider-item">
      <img src="/components/carrousel/images/room.png" alt="Item 1">
      <legend>Suite presidencial 604</legend>
    </div>
    <div class="carousel-container-slider-item">
      <img src="/components/carrousel/images/room.png" alt="Item 1">
      <legend>Suite presidencial 604</legend>
    </div>
    <div class="carousel-container-slider-item">
      <img src="/components/carrousel/images/room.png" alt="Item 1">
      <legend>Suite presidencial 604</legend>
    </div>    
  </div>
  <button id="prev-button"><img src="/components/carrousel/icon/arrow.svg" alt=""/></button>
  <button id="next-button"><img src="/components/carrousel/icon/arrow.svg" alt=""/></button>
</div>
`;

class CarrouselContent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    let clone = templateCarrouselContent.content.cloneNode(true);

    this.shadowRoot.appendChild(clone);
    this.prevButton = this.shadowRoot.getElementById("prev-button");
    this.nextButton = this.shadowRoot.getElementById("next-button");

    this.prevButton.addEventListener("click", () => this.prevSlide());
    this.nextButton.addEventListener("click", () => this.nextSlide());
  }
  connectedCallback() {
    this.showSlide(this.currentIndex);
  }

  showSlide(index) {
    const carousel = this.shadowRoot.getElementById("carousel");
    const totalItems = this.shadowRoot.querySelectorAll(".carousel-container-slider-item img").length;

    if (totalItems > 1) {
      index = index === undefined ? -1 : index;

      if (index < 0) {
        this.prevButton.style.display = "none";
        this.currentIndex = -1;
      } else if (index === totalItems - 2) {
        this.currentIndex = totalItems - 2;
        this.nextButton.style.display = "none";
      } else {
        this.currentIndex = index;
        this.prevButton.style.display = "flex";
        this.nextButton.style.display = "flex";
      }
    } else {
      this.prevButton.style.display = "none";
      this.nextButton.style.display = "none";
    }

    const translateValue = -this.currentIndex * 70 + "%";
    carousel.style.transform = `translateX(${translateValue})`;
  }

  nextSlide() {
    this.showSlide(this.currentIndex + 1);
  }

  prevSlide() {
    this.showSlide(this.currentIndex - 1);
  }
}

customElements.define("carrousel-content", CarrouselContent);
