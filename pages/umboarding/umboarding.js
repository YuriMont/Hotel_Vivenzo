const templateUmboardingPage = document.createElement("template");
templateUmboardingPage.innerHTML = `
<link rel="stylesheet" href="pages/umboarding/umboarding.css" />
<section id="initial" class="umboarding-initial-container">
        <language-select
          class="umboarding-initial-container-select-language"
          
          is-open="true"
        ></language-select>
        <img src="/pages/umboarding/images/person.svg" alt="" />
        <h1>Você está prestes a usufruir de sua estadia no hotel Vivenzo</h1>
        <a
          href="/pages/umboarding/parts/identification/identification.html"
          class="umboarding-initial-container-next"
          >Continuar</a>
      </section>
</div>
`;

class UmboardingPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    let clone = templateUmboardingPage.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);
    document.addEventListener("DOMContentLoaded", function() {
      fetch('/pages/umboarding/parts/identification/identification.html');
    });
  }

}

customElements.define("umboarding-page", UmboardingPage);
