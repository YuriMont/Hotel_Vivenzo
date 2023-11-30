const templateActionContainer = document.createElement("template");
templateActionContainer.innerHTML = `
<div style="background: red;">
<slot name="action">

</slot>
</div>
`;

class ActionContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    let clone = templateActionContainer.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);
    this.actionContent = this.shadowRoot.querySelector('div');

    document.addEventListener("DOMContentLoaded", () => {
      this.actionContent.addEventListener("focusin", () => {
        const rect = element.getBoundingClientRect();
        const offsetTop = rect.top + window.scrollY + 100;

        const maxScrollTop = window.innerHeight;
        const scrollToTop = Math.min(offsetTop, maxScrollTop);

        window.scrollTo({
          top: scrollToTop,
          behavior: "smooth",
        });
      });
    });
  }
}

customElements.define("action-container", ActionContainer);
export { ActionContainer };
