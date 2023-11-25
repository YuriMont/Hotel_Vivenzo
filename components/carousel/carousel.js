const templateCarouselContent = document.createElement("template");
templateCarouselContent.innerHTML = `
<link rel="stylesheet" href="/components/carousel/carousel.css" />

<div class="carousel-container">
  <h2>Selecione um quarto</h2>
  <div class="carousel-container-slider" id="carousel">
    <div class="carousel-container-slider-item">
      <img src="/components/carousel/images/room.png" alt="Item 1">
      <legend>Suite presidencial 604</legend>
    </div>
    <div class="carousel-container-slider-item">
      <img src="/components/carousel/images/room.png" alt="Item 2">
      <legend>Suite presidencial 605</legend>
    </div>
    <div class="carousel-container-slider-item">
      <img src="/components/carousel/images/room.png" alt="Item 3">
      <legend>Suite presidencial 606</legend>
    </div>    
  </div>
  <button id="prev-button"><img src="/components/carousel/icon/arrow.svg" alt=""/></button>
  <button id="next-button"><img src="/components/carousel/icon/arrow.svg" alt=""/></button>
</div>
`;

class CarouselContent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    let clone = templateCarouselContent.content.cloneNode(true);

    this.touchStartX = 0;
    this.touchEndX = 0;

    this.currentIndex = -1;

    this.shadowRoot.appendChild(clone);
    this.prevButton = this.shadowRoot.getElementById("prev-button");
    this.nextButton = this.shadowRoot.getElementById("next-button");

    this.prevButton.addEventListener("click", () => this.prevSlide());
    this.nextButton.addEventListener("click", () => this.nextSlide());

    // Bind the event listeners to the class instance
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);

    this.shadowRoot
      .getElementById("carousel")
      .addEventListener("touchstart", this.handleTouchStart.bind(this));
    this.shadowRoot
      .getElementById("carousel")
      .addEventListener("touchend", this.handleTouchEnd.bind(this));
  }

  connectedCallback() {
    this.showSlide(this.currentIndex);
  }

  showSlide(index) {
    const carousel = this.shadowRoot.getElementById("carousel");
    const totalItems = this.shadowRoot.querySelectorAll(
      ".carousel-container-slider-item img"
    ).length;

    if (totalItems > 1) {
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

      const translateValue = -this.currentIndex * 70 + "%";
      carousel.style.transform = `translateX(${translateValue})`;
    } else {
      this.prevButton.style.display = "none";
      this.nextButton.style.display = "none";
    }
  }

  nextSlide() {
    this.showSlide(this.currentIndex + 1);
  }

  prevSlide() {
    this.showSlide(this.currentIndex - 1);
  }

  handleTouchStart(event) {
    this.touchStartX = event.touches[0].clientX;
  }

  handleTouchEnd(event) {
    this.touchEndX = event.changedTouches[0].clientX;
    this.handleSwipe();
  }

  handleSwipe() {
    const totalItems = this.shadowRoot.querySelectorAll(
      ".carousel-container-slider-item img"
    ).length;
    const swipeThreshold = 50;

    if (this.touchStartX - this.touchEndX > swipeThreshold) {
    // Impedir deslize além do último item
    if (this.currentIndex <= 0) {
      this.nextSlide();
    }
  } else if (this.touchEndX - this.touchStartX > swipeThreshold) {
    // Impedir deslize além do primeiro item
    if (this.currentIndex >= totalItems * (-1)) {
      this.prevSlide();
    }
  }
  }
}

customElements.define("carousel-content", CarouselContent);
