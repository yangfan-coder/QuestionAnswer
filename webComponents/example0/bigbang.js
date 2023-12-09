
class BigBang extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "closed" });
    let div = document.createElement("h1");
    div.textContent = "Hello, BigBang!";
    shadowRoot.append(div)
  }
}

customElements.define("big-bang", BigBang);
