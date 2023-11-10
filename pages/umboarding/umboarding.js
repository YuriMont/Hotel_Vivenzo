const templateUmboardingPage = document.createElement("template");
templateUmboardingPage.innerHTML = `
<link rel="stylesheet" href="pages/umboarding/umboarding.css" />
<section id="initial" class="umboarding-initial-container">
        <language-select
          class="umboarding-initial-container-select-language"
          size-language="lg"
          is-open="true"
        ></language-select>
        <img src="/pages/umboarding/images/person.svg" alt="" />
        <h1>Você está prestes a usufruir de sua estadia no hotel Vivenzo</h1>
        <a
          href="/pages/umboarding/parts/identification/identification.html"
          class="umboarding-initial-container-next"
          ><img src="/pages/umboarding/images/left.svg" alt=""
        /></a>
      </section>
</div>
`;

class UmboardingPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    let clone = templateUmboardingPage.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);
  }

}

customElements.define("umboarding-page", UmboardingPage);
