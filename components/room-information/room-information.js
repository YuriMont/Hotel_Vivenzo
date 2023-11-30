import "/components/open-door-button/open-door-button.js";

const templateRoomInformation = document.createElement("template");
templateRoomInformation.innerHTML = `
<link rel="stylesheet" href="/components/room-information/room-information.css" />
<div class="room-information-container">
<h2>Suite Presidencial</h2>
<div class="room-information-container-data">
  <div class="room-information-container-data-description">
    <span>Código da Reserva</span>
    <span>Número do quarto</span>
    <span>Senha da porta</span>
  </div>
  <div class="room-information-container-data-item">
    <span id="reservation-code"></span>  
    <span id="number-room"></span>
    <span class="room-information-container-data-item-password">
      <input id="password" type="text" inputmode="numeric" maxlength="4"/>
      <span class="room-information-container-data-item-password-bubble"><img src="" alt="edit"/></span>
    </span>
  </div>
  <div class="room-information-container-data-open-door">
    <open-door-button></open-door-button>
  </div>
</div>

<div class="room-information-container-inputs">
  <div class="room-information-container-inputs-date">
  <label for="checkout">Check In</label>
  <div class="room-information-container-inputs-date-custom">
      <input type="date" id="checkin"/>
      <div class="room-information-container-inputs-date-calendar-icon">
        <img
          src="/components/room-information/icons/edit.svg"
          alt=""
        />
      </div>
  </div>
  </div>
  <div class="room-information-container-inputs-date">
      <label for="checkout">Check Out</label>
      <div class="room-information-container-inputs-date-custom">
          <input type="date" id="checkout"/>
          <div class="room-information-container-inputs-date-calendar-icon">
            <img
              src="/components/room-information/icons/edit.svg"
              alt=""
            />
          </div>
      </div>
  </div>
</div>

<div class="room-information-container-address">
  <img src="/components/room-information/icons/marker.svg" alt=""/>
  <div>
    <span>Rua Rio Grande do Norte 704</span>
    <span>Belo Horizonte/MG Brasil</span>
  </div>
  <img src="/components/room-information/icons/map.svg" alt=""/>
</div>
</div>`;

class RoomInformation extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    let clone = templateRoomInformation.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);
    this.editButton = this.shadowRoot.querySelector(
      ".room-information-container-data-item-password img"
    );
    this.passwordInput = this.shadowRoot.getElementById("password");

    document.addEventListener("DOMContentLoaded", () => {
      this.shadowRoot.getElementById("checkin").value = new Date()
        .toISOString()
        .split("T")[0];
      this.shadowRoot.getElementById("checkout").value = new Date()
        .toISOString()
        .split("T")[0];

      this.shadowRoot
        .getElementById("checkout")
        .addEventListener("change", () => {
          this.blur();
        });

      this.shadowRoot
        .getElementById("checkin")
        .addEventListener("change", () => {
          this.blur();
        });

      this.passwordInput.disabled = true;
      this.editButton.src = "/components/room-information/icons/edit.svg";
      this.editButton.addEventListener("click", this.changePassword.bind(this));
    });
  }

  changePassword() {
    this.passwordInput.disabled = !this.passwordInput.disabled;

    if (this.passwordInput.disabled) {
      this.editButton.src = "/components/room-information/icons/edit.svg";
      !this.passwordInput.value.includes("#")
        ? (this.passwordInput.value += "#")
        : null;
    } else {
      this.passwordInput.value = this.passwordInput.value.replace("#", "");
      this.passwordInput.focus();
      this.editButton.src = "/components/room-information/icons/check.svg";
    }
  }

  set codReservation(product) {
    this.shadowRoot.getElementById("reservation-code").textContent = product;
  }

  set numberRoom(number_room) {
    this.shadowRoot.getElementById("number-room").textContent = number_room;
  }

  set password(passwordRoom) {
    this.passwordInput.value = passwordRoom;
  }

  connectedCallback() {
    this.codReservation = this.getAttribute("reservation-code") || "";
    this.numberRoom = this.getAttribute("number-room") || "";
    this.password = this.getAttribute("password-room") || "";

    this.shadowRoot.querySelectorAll("input").forEach((item) => {
      item.addEventListener("focus", () => {
        this.dispatchEvent(new CustomEvent("focusInInput", { detail: true }));
      });

      item.addEventListener("blur", () => {
        this.dispatchEvent(new CustomEvent("focusInInput", { detail: false }));
      });
    });
  }
}

customElements.define("room-information", RoomInformation);

export { RoomInformation }