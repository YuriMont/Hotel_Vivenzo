import "/components/header/header-page.js";
import "/components/footer/footer-page.js";
import "/components/popup/modal-popup.js";
import "/components/carousel/carousel.js";
import "/components/room-information/room-information.js";
import "/pages/reservation/home/options/breakfast/breakfast-content.js";
import "/pages/reservation/home/options/access/access-content.js";
import "/pages/reservation/home/options/parking/parking-content.js";
import "/pages/reservation/home/options/bed/bed-content.js";
import "/pages/reservation/home/options/minibar/minibar-content.js";
import "/pages/reservation/home/options/network/network-content.js";
import "/pages/reservation/home/options/safe/safe-content.js";
import "/pages/reservation/home/options/lighting/lighting-content.js";
import "/pages/reservation/home/options/air-conditioning/air-conditioning-content.js";
import "/pages/reservation/home/options/tv/tv-content.js";

let templateHomeWebComponent = document.createElement("template");
templateHomeWebComponent.innerHTML = `
<link
      rel="stylesheet"
      href="/pages/reservation/home/home.css"
/>
<section class="home-container">
<header-page
  class="home-skeleton"
  title-header="Hotel Vivenzo"
></header-page>
<main>
<div class="home-container-section">
  <h1 class="home-skeleton">Detalhes da reserva</h1>
  <carousel-content class="home-skeleton"></carousel-content>

  <room-information
    class="home-skeleton"
    reservation-code="GHJ056"
    number-room="604"
    password-room="7564#"
  ></room-information>
</div>
<div  class="home-container-section">
  <h1 class="home-skeleton">Opções</h1>
  <!-- Reserva -->

  <details class="home-skeleton home-container-box">
    <summary>
      <div class="home-container-box-option-title">
        <h3>Reserva</h3>
        <img src="/pages/reservation/home/icons/arrow-up.svg" alt="" />
      </div>
    </summary>
    <div class="home-container-box-option">
      <modal-popup class="home-container-box-option-icon">
        <div slot="button-content">
          <img src="/pages/reservation/home/icons/breakfast.svg" alt="" />
          <p>Café da manhã</p>
        </div>
        <img
          slot="icon-popup"
          src="/pages/reservation/home/icons/breakfast.svg"
          alt=""
        />
        <div slot="content">
          <breakfast-content></breakfast-content>
        </div>
      </modal-popup>
      <modal-popup class="home-container-box-option-icon">
        <div slot="button-content">
          <img src="/pages/reservation/home/icons/access.svg" alt="" />
          <p>Acessos</p>
        </div>
        <img
          slot="icon-popup"
          src="/pages/reservation/home/icons/access.svg"
          alt=""
        />
        <div slot="content">
          <access-content></access-content>
        </div>
      </modal-popup>
      <modal-popup class="home-container-box-option-icon">
        <div slot="button-content">
          <img src="/pages/reservation/home/icons/parking.svg" alt="" />
          <p>Estacionamento</p>
        </div>
        <img
          slot="icon-popup"
          src="/pages/reservation/home/icons/parking.svg"
          alt=""
        />
        <div slot="content">
          <parking-content></parking-content>
        </div>
      </modal-popup>
    </div>
  </details>

  <!-- Acomodação -->

  <details class="home-skeleton home-container-box">
    <summary>
      <div class="home-container-box-option-title">
        <h3>Acomodação</h3>
        <img src="/pages/reservation/home/icons/arrow-up.svg" alt="" />
      </div>
    </summary>
    <div class="home-container-box-option">
      <modal-popup class="home-container-box-option-icon">
        <div slot="button-content">
          <img src="/pages/reservation/home/icons/bed.svg" alt="" />
          <p>Cama</p>
        </div>
        <img
          slot="icon-popup"
          src="/pages/reservation/home/icons/bed.svg"
          alt=""
        />
        <div slot="content">
          <bed-content></bed-content>
        </div>
      </modal-popup>
      <modal-popup class="home-container-box-option-icon">
        <div slot="button-content">
          <img src="/pages/reservation/home/icons/wifi.svg" alt="" />
          <p>Internet</p>
        </div>
        <img
          slot="icon-popup"
          src="/pages/reservation/home/icons/wifi.svg"
          alt=""
        />
        <div slot="content">
          <network-content
            network-name="HotelVivenzo"
            network-password="vivenzo2020"
          ></network-content>
        </div>
      </modal-popup>
      <modal-popup class="home-container-box-option-icon">
        <div slot="button-content">
          <img src="/pages/reservation/home/icons/safe.svg" alt="" />
          <p>Cofre</p>
        </div>
        <img
          slot="icon-popup"
          src="/pages/reservation/home/icons/safe.svg"
          alt=""
        />
        <div slot="content">
          <safe-content></safe-content>
        </div>
      </modal-popup>
      <modal-popup class="home-container-box-option-icon">
        <div slot="button-content">
          <img src="/pages/reservation/home/icons/minibar.svg" alt="" />
          <p>Frigoba</p>
        </div>
        <img
          slot="icon-popup"
          src="/pages/reservation/home/icons/minibar.svg"
          alt=""
        />
        <div slot="content">
          <minibar-content></minibar-content>
        </div>
      </modal-popup>
    </div>
  </details>

  <!-- Controles -->
  <details class="home-skeleton home-container-box">
    <summary>
      <div class="home-container-box-option-title">
        <h3>Controles</h3>
        <img src="/pages/reservation/home/icons/arrow-up.svg" alt="" />
      </div>
    </summary>
    <div class="home-container-box-option">
      <modal-popup class="home-container-box-option-icon">
        <div slot="button-content">
          <img src="/pages/reservation/home/icons/lamp.svg" alt="" />
          <p>Iluminação</p>
        </div>
        <img
          slot="icon-popup"
          src="/pages/reservation/home/icons/lamp.svg"
          alt=""
        />
        <div slot="content">
          <lighting-content></lighting-content>
        </div>
      </modal-popup>
      <modal-popup class="home-container-box-option-icon">
        <div slot="button-content">
          <img
            src="/pages/reservation/home/icons/air-conditioning.svg"
            alt=""
          />
          <p>Climatização</p>
        </div>
        <img
          slot="icon-popup"
          src="/pages/reservation/home/icons/air-conditioning.svg"
          alt=""
        />
        <div slot="content">
          <air-conditioning-content></air-conditioning-content>
        </div>
      </modal-popup>
      <modal-popup class="home-container-box-option-icon">
        <div slot="button-content">
          <img src="/pages/reservation/home/icons/tv.svg" alt="" />
          <p>TV</p>
        </div>
        <img
          slot="icon-popup"
          src="/pages/reservation/home/icons/tv.svg"
          alt=""
        />
        <div slot="content">
          <tv-content></tv-content>
        </div>
      </modal-popup>
    </div>
  </details>
</div>
</main>
<footer-page class="home-skeleton"></footer-page>
</section>
`;

class HomeWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    let clone = templateHomeWebComponent.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);

    this.allHomeSkeleton = this.shadowRoot.querySelectorAll(".home-skeleton");

    this.isInHomeSection = false;

    this.footer = this.shadowRoot.querySelector("footer-page");
    this.header = this.shadowRoot.querySelector("header-page");

    document.addEventListener("DOMContentLoaded", () => {
      window.onload = () => this.verifyURL();
      window.addEventListener("hashchange", () => this.verifyURL());
      this.shadowRoot.querySelector('main').addEventListener('scroll', () => {
        this.header.headerSize('sm')
        this.shadowRoot.querySelector('.home-container').style.paddingTop = '4rem';
      })

      this.shadowRoot
        .querySelectorAll(".reservation-container-buttons-details")
        .forEach((element) => {
          element.addEventListener("click", () => this.nextPage());
        });

      this.shadowRoot
        .querySelector(".home-container room-information")
        .addEventListener("focusInInput", (event) => {
          event.detail
            ? (this.footer.style.display =
                "none")
            : (this.footer.querySelector("footer-page").style.display =
                "flex");
        });

        this.shadowRoot.querySelectorAll("details").forEach((element) => {
            element.addEventListener("toggle", function () {
              if (element.hasAttribute("open")) {
                element.scrollIntoView()
              }
            });
          });
          
    });
  }

  executeFunctionWhenElementInViewport() {
    if (this.isInHomeSection) {
      this.shadowRoot.querySelector('.home-container').style.paddingTop = '7rem'
      this.footer.style.display = "flex";
      this.header.style.display = "flex";
      this.header.headerSize('lg')
      let skeletons = this.allHomeSkeleton;
      document.body.classList.add('home-body')
      setTimeout(function () {
        skeletons.forEach((item) => {
          item.classList.remove("home-skeleton");
        });
      }, 3000);
    } else {
      this.footer.style.display = "none";
      this.header.style.display = "none";
    }
  }

  verifyURL() {
    let id = window.location.href.split("#")[1];
    this.isInHomeSection = id === "home";
    if (this.isInHomeSection) {
      this.executeFunctionWhenElementInViewport();
    }
  }
}

customElements.define("home-webcomponent", HomeWebComponent);
