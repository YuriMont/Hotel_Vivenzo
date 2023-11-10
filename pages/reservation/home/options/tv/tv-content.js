
const templateTvContent = document.createElement("template");
templateTvContent.innerHTML = `
<link rel="stylesheet" href="/pages/reservation/home/options/tv/tv-content.css"/>
<div class="tv-content-container">
<h2>TV</h2>
<img src="/pages/reservation/home/options/tv/image/tv.svg" alt=""/>
</div>
`;

class TvContent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    let clone = templateTvContent.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);
  }
}

customElements.define("tv-content", TvContent);
