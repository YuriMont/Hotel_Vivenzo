import "/components/header/header-page.js";
import "/components/footer/footer-page.js";
import "/components/hotel-container/hotel-container.js";
import "/components/search-input/search-input.js";
import "/components/popup/modal-popup.js";
import "/components/open-door-button/open-door-button.js";
import "/pages/reservation/home/options/lighting/lighting-content.js";
import "/pages/reservation/home/options/air-conditioning/air-conditioning-content.js";
import "/pages/reservation/home/options/tv/tv-content.js";

let templateReservationsWebComponent = document.createElement("template");
templateReservationsWebComponent.innerHTML = `
<link
      rel="stylesheet"
      href="/pages/reservation/reservations.css"
/>
<section class="reservation-container">
<header-page
class="reservation-skeleton"
header-type="primary"
title-header="Olá, Washington"
></header-page>
<main>

<search-input class="reservation-skeleton"></search-input>

<h1 class="reservation-skeleton">Proximas reservas</h1>

<hotel-container
  class="reservation-skeleton"
  reservation-code="GHJ056"
  reservation-room="Suíte presidencial"
  room-number="256"
  checkin-date="20/08/2021"
  checkout-date="29/08/2021"
>
  <div class="reservation-container-hotel" slot="hotel">
    <img src="/pages/reservation/images/vivenzo-logo.png" alt="" />
    <div>
      <span>Hotel Vivenzo</span>
      <span>Belo Horizone -MG</span>
    </div>
  </div>
  <div class="reservation-container-buttons" slot="actions">
    <button class="reservation-container-buttons-details">Detalhes</button>
  </div>
</hotel-container>

<hotel-container
  class="reservation-skeleton"
  reservation-code="DFR511"
  reservation-room="Suíte presidencial"
  room-number="264"
  checkin-date="20/08/2021"
  checkout-date="29/08/2021"
>
  <div class="reservation-container-hotel" slot="hotel">
    <img src="/pages/reservation/images/vivenzo-logo.png" alt="" />
    <div>
      <span>Hotel Vivenzo</span>
      <span>Belo Horizone -MG</span>
    </div>
  </div>
  <div class="reservation-container-buttons" slot="actions">
    <button class="reservation-container-buttons-details">Detalhes</button>
  </div>
</hotel-container>

<h1 class="reservation-skeleton">Reserva atual</h1>

<hotel-container
  class="reservation-skeleton"
  reservation-code="TGG488"
  reservation-room="Quarto comum"
  room-number="125"
  checkin-date="20/08/2021"
  checkout-date="29/08/2021"
>
  <div class="reservation-container-hotel" slot="hotel">
    <img src="/pages/reservation/images/primme-logo.png" alt="" />
    <div>
      <span>Primme Hotel</span>
      <span>Paulo Afonso - BA</span>
    </div>
  </div>
  <div class="reservation-container-buttons" slot="actions">
    <modal-popup>
      <button slot="button-content">Controles</button>
      <img
        slot="icon-popup"
        src="/pages/reservation/icons/lamp.svg"
        alt=""
      />
      <div class="reservation-container-buttons-controls" slot="content">
        <modal-popup
          is-overlaid="true"
          class="reservation-container-buttons-controls-icon"
        >
          <div slot="button-content">
            <img src="/pages/reservation/icons/lamp.svg" alt="" />
            <p>Iluminação</p>
          </div>
          <img
            slot="icon-popup"
            src="/pages/reservation/icons/lamp.svg"
            alt=""
          />
          <div slot="content">
            <lighting-content></lighting-content>
          </div>
        </modal-popup>
        <modal-popup
          is-overlaid="true"
          class="reservation-container-buttons-controls-icon"
        >
          <div slot="button-content">
            <img
              src="/pages/reservation/icons/air-conditioning.svg"
              alt=""
            />
            <p>Climatização</p>
          </div>
          <img
            slot="icon-popup"
            src="/pages/reservation/icons/air-conditioning.svg"
            alt=""
          />
          <div slot="content">
            <air-conditioning-content></air-conditioning-content>
          </div>
        </modal-popup>
        <modal-popup
          is-overlaid="true"
          class="reservation-container-buttons-controls-icon"
        >
          <div slot="button-content">
            <img src="/pages/reservation/icons/tv.svg" alt="" />
            <p>TV</p>
          </div>
          <img
            slot="icon-popup"
            src="/pages/reservation/icons/tv.svg"
            alt=""
          />
          <div slot="content">
            <tv-content></tv-content>
          </div>
        </modal-popup>
      </div>
    </modal-popup>
    <open-door-button></open-door-button>
  </div>
</hotel-container>
</main>
<footer-page class="reservation-skeleton"></footer-page>
</section>
`;

class ReservationsWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    let clone = templateReservationsWebComponent.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);

    this.allReservationSkeleton = this.shadowRoot.querySelectorAll(
      ".reservation-skeleton"
    );

    this.isInReservationsSection = false;

    this.footer = this.shadowRoot.querySelector("footer-page");
    this.header = this.shadowRoot.querySelector("header-page");

    document.addEventListener("DOMContentLoaded", () => {
      window.addEventListener('scroll', () => {
        this.shadowRoot.querySelector('.reservation-container').style.paddingTop = '5rem';
      })

      window.addEventListener("hashchange", () => this.verifyURL());
      window.onload = () => this.verifyURL();

      this.shadowRoot.querySelectorAll(".reservation-container-buttons-details").forEach((element) => {
        element.addEventListener('click', () => this.previousPage())
      })  

      this.shadowRoot.querySelector('main').addEventListener('scroll', () => this.changeHeaderSize())

      this.shadowRoot
        .querySelector(".reservation-container search-input")
        .addEventListener("focusin", () => {
          this.footer.style.display = "none";
        });

      this.shadowRoot
        .querySelector(".reservation-container search-input")
        .addEventListener("focusout", () => {
          this.footer.style.display = "flex";
        });
    });
  }

  executeFunctionWhenElementInViewport() {
    if (this.isInReservationsSection) {
      document.body.classList.remove('home-body')
      this.shadowRoot.querySelector('.reservation-container').style.paddingTop = '7rem'
      this.footer.style.display = "flex";
      this.header.style.display = "flex";
      this.header.headerSize('lg')
      let skeletons = this.allReservationSkeleton;
      setTimeout(function () {
        skeletons.forEach((item) => {
          item.classList.remove("reservation-skeleton");
        });
      }, 3000);
    } else {
      
      this.footer.style.display = "none";
      this.header.style.display = "none";
    }
  }

  changeHeaderSize() {
    let element = this.shadowRoot.querySelector('main');
    if (element.scrollTop != 0) {
      this.header.headerSize("sm");
      this.shadowRoot.querySelector(".reservation-container").style.paddingTop =
        "4rem";
    } else {
      this.header.headerSize("lg");
      this.shadowRoot.querySelector(".reservation-container").style.paddingTop =
        "7rem";
    }
  }

  previousPage(){
    window.location.href = "#home"
  }

  verifyURL() {
    let id = window.location.href.split("#")[1];
    this.isInReservationsSection = id === "reservations";
    if (this.isInReservationsSection) {
      this.executeFunctionWhenElementInViewport();
    }
  }
}

customElements.define("reservations-webcomponent", ReservationsWebComponent);
