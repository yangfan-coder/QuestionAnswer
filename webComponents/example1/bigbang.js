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

    // todo 不能自定义插入数据？？？
    // let div = document.createElement("div");
    // div.textContent = "Hello, BigBang!";
    // shadowRoot.append(div)

    // 试试下方的方式

    let clone = template.content.cloneNode(true);
    shadowRoot.append(clone);
  }
}

customElements.define("big-bang", BigBang);
