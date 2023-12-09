// 参考链接：
// https://developer.mozilla.org/zh-CN/docs/Web/CSS/:host
// https://developer.mozilla.org/zh-CN/docs/Web/CSS/:host-context
// https://developer.mozilla.org/en-US/docs/Web/CSS/::slotted
// https://developer.mozilla.org/en-US/docs/Web/CSS/::part


// :host 选择器是 Shadow 专门的选择器，用于选择 Shadow DOM 的根元素。
//  host的优先级如下： :host < :host(big-bang) || :host-context(main) 
//  :host(big-bang) || :host-context(main) 取决于谁写在后面，谁的优先级高

const template = document.createElement("template");

// 类似于： styled-components [https://github.com/styled-components/styled-components]
template.innerHTML = `
  <style>
    @import url('./bigbang.css'); 

    .big-bang-box {
      border: 1px solid red; 
      padding:3rem;
      margin:3rem;
    }

    .big-bang-box h1 {
      color: #fff;
    }
    // :host-context(main) {
    //   background-color: red;
    // }
    
    // :host(big-bang) {
    //   background-color: #d698dd;
    //   display: block;
    // }
    /* shadow 专门的选择器 */
    :host {
      background-color: yellow;
      display: block;
    }

    /* ::slotted 选择器用于slot。 */
    ::slotted(h2)  {
      font-size: 4rem;
      background-color: #322533;
      color: #fff !important;
    }

    /* warn:  不能这样用 */
    slot {

    }
  </style>
  <div class='big-bang-box'>
    <h1 part="demo">我是Web Components <span>内部元素</span> </h1>
    <slot name="title">我是默认的插槽【标题】</slot>
  </div>
`;

class BigBang extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "closed" });
    let clone = template.content.cloneNode(true);
    shadowRoot.append(clone);
  }
}

customElements.define("big-bang", BigBang);
