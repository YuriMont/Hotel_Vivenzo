const templateNetwork = document.createElement("template");
templateNetwork.innerHTML = `
<link rel="stylesheet" href="/pages/reservation/home/options/network/network-content.css" />
<div class="network-content-container">
<h2>Internet</h2>
<div class="network-content-container-access">
      <div class="network-content-container-access-info">
        <span>Rede</span>
        <span>Senha</span>
      </div>
      <div class="network-content-container-access-data">
        <span id="network-name"></span>
        <span id="network-password"></span>
      </div>
</div>
</div>
`;

class NetworkContent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    let clone = templateNetwork.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);
    this._networkName = "";
    this._networkPassword = "";
  }

  set networkName(network_name) {
    this.shadowRoot.getElementById("network-name").textContent = network_name;
  }

  set networkPassword(network_password) {
    this.shadowRoot.getElementById("network-password").textContent =
      network_password;
  }

  connectedCallback() {
    this.networkName = this.getAttribute("network-name") || "";
    this.networkPassword = this.getAttribute("network-password") || "";
  }
}

customElements.define("network-content", NetworkContent);

export { NetworkContent }