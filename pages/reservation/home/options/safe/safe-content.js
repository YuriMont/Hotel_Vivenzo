const templateSafeContent = document.createElement("template");
templateSafeContent.innerHTML = `
<link rel="stylesheet" href="/pages/reservation/home/options/safe/safe-content.css">
<div class="safe-content-container">
<h2>Cofre</h2>
    <h3>Como acessar o cofre:</h3>
    <ol class="safe-content-container-tutorial">
      <li>
        Escolha uma senha numérica de <strong>3</strong> a
        <strong>8</strong> dígitos;
      </li>
      <li>
        Com a porta aberta, aperte o botão inicializar
        <strong>(3)</strong> localizado atrás da porta, até ouvir um bip e
        acender a luz amarela (proceed) do painel eletrônico;
      </li>
      <li>
        Digite a senha escolhida e, em seguida, aperte um dos botões
        <strong>A</strong> ou <strong>B</strong>. Sua senha estará habilitada;
      </li>
      <li>
        Feche a porta e gire o botão central <strong>(5)</strong> no sentido
        antihorário para travá-la;
      </li>
    </ol>
    <img class="safe-content-container-info"
      src="/pages/reservation/home/options/safe/images/safe.png"
      alt=""
    />
    <div class="safe-content-container-alert">
      <div class="safe-content-container-alert-icon">
        <img
          src="/pages/reservation/home/options/safe/images/info.svg"
          alt=""
        />
      </div>
      ATENÇÃO: Se ao finalizar o procedimento o cofre emitir 3 bipes, sua senha
      não foi habilitada e será necessário reiniciar a operação de troca de
      senha.
    </div> 
</div>
`;

class SafeContent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    let clone = templateSafeContent.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);
  }
}

customElements.define("safe-content", SafeContent);
