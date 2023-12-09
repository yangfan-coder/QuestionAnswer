// https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/template#%E5%B1%9E%E6%80%A7
const template = document.createElement("template");

template.innerHTML = `
  <div>
    <h1>hello 我是测试</h1>
    <slot name="title">我是默认的插槽【标题】</slot>
    <slot name="list">我是默认的插槽【列表】</slot>
  </div>
`;

class BigBang extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "closed" }); // https://developer.mozilla.org/zh-CN/docs/Web/API/Element/attachShadow

    let clone = template.content.cloneNode(true);
    shadowRoot.append(clone);
  }
}

customElements.define("big-bang", BigBang);
