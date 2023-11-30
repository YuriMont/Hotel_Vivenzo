const templateHotelContainer = document.createElement("template");
templateHotelContainer.innerHTML = `
<link rel="stylesheet" href="/components/hotel-container/hotel-container.css" />
<div class="hotel-container">
<div class="hotel-container-header">
  <slot name="hotel"></slot>

  <div class="hotel-container-header-code">
    <span>Código</span>
    <span id="hotel-code">GHJO56</span>
  </div>

</div>

<div class="hotel-container-reservation">
  <div class="hotel-container-reservation-info">
    <span>
      <h4 id="room"></h4>
      <h5 id="room-number"></h5>
    </span>
    <div>
      <span class="hotel-container-reservation-description-date">Check in</span>
      <span class="hotel-container-reservation-date" id="checkin-date"></span>
      <span class="hotel-container-reservation-description-date">Check out</span>
      <span class="hotel-container-reservation-date" id="checkout-date"></span>
    </div>
  </div>

  
    <slot name="actions"></slot>

</div>
</div>
`;


class HotelContainer extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      let clone = templateHotelContainer.content.cloneNode(true);
      this.shadowRoot.appendChild(clone);
      this._code = ""
      this._room = "";
      this._roomNumber = "";
      this._checkinDate = "";
      this._checkoutDate = "";
    }

    set code(reservationCode){
        this.shadowRoot.getElementById('hotel-code').innerText = reservationCode;
    }

    set room(reservationRoom){
        this.shadowRoot.getElementById('room').innerText = reservationRoom;
    }

    set roomNumber(room_number){
        this.shadowRoot.getElementById('room-number').innerText = `Nº ${room_number}`;
    }

    set checkinDate(checkin){
        this.shadowRoot.getElementById('checkin-date').innerText = checkin;
    }

    set checkoutDate(checkout){
        this.shadowRoot.getElementById('checkout-date').innerText = checkout;
    }

    connectedCallback() {
      this.code = this.getAttribute('reservation-code') || "";
      this.room = this.getAttribute('reservation-room') || "";
      this.roomNumber = this.getAttribute('room-number') || "";
      this.checkinDate = this.getAttribute('checkin-date') || "";
      this.checkoutDate = this.getAttribute('checkout-date') || "";
    }
  }
  
  customElements.define("hotel-container", HotelContainer);

  export { HotelContainer }