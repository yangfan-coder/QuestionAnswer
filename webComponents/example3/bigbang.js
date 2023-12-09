// 参考链接
// https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components/Using_custom_elements

const template = document.createElement("template");
template.innerHTML = `
    <style>
      :host{
        /* the shadow root */
        background-color: #333; /* default */
        color: white;
        display: block; /* critical */
      }
      ::slotted(h2){
        /* represents an h2 element that has been placed into a slot */
        font-weight: 300;
      }
      .root{
        position: relative;
        padding: 2rem;
      }
      .character{
        position: absolute;
        z-index: 10;
        top: -10rem;
        right: 0;
        font-size: 10rem;
        line-height:1;
        color:#000
      }
    </style>
    <div class="root">
      <h1>Big Bang Theory</h1>
      <slot name="title">我是默认的插槽【标题】</slot>
    </div>
`;

class BigBang extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "closed" });
    let clone = template.content.cloneNode(true);
    this.root.append(clone);
  }

  static get observedAttributes() {
    return ["character", "color"];
  }

  get character() {
    return this.getAttribute("character");
  }
  set character(value) {
    // 可以进行数据过滤处理~
    this.setAttribute("character", value);
  }

  get color() {
    return this.getAttribute("color");
  }
  set color(value) {
    // 可以进行数据过滤处理~
    this.setAttribute("color", value);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name.toLowerCase() === "character") {
      const div = this.root.querySelector(".root");

      let p = div.querySelector("p")
        ? div.querySelector("p")
        : document.createElement("p");
      p.className = "character";
      p.textContent = newValue;
      div.append(p);
    }
    if (name.toLowerCase() === "color") {
      this.style.backgroundColor = newValue;
    }
  }
}

customElements.define("big-bang", BigBang);
// <big-bang>
