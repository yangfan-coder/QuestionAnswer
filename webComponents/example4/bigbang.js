// 参考链接
// https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components/Using_custom_elements
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement/assignedNodes

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
      button{
        font-size: 1.2rem;
        border: none;
        background-color: #222;
        color: #eee;
        padding: 0.25rem 2rem;
        cursor: pointer;
      }
      button:active{
        background-color: #eee;
        color: #222;
      }
      
    </style>
    <div class="root">
      <h1>Big Bang Theory</h1>
      <slot name="title">我是默认的插槽【标题】</slot>
      <p>
        <button><slot name="done"></slot></button>
      </p>
    </div>
`;

class BigBang extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "closed" });

    let clone = template.content.cloneNode(true);
    this.root.append(clone);

    let btnSlot = this.root.querySelector("slot[name=done]");
    let htmlSlot = btnSlot.assignedNodes()[0]; // 找到分配给Slot的元素

    if (htmlSlot) {
      btnSlot.addEventListener("slotchange", (ev) => {
        console.log(htmlSlot, "===>slotchange");
      });

      btnSlot.parentElement.addEventListener("click", (ev) => {
        let action =
          this.action && typeof window[this.action] === "function"
            ? window[this.action]
            : this.defaultActionForBigBangButton;

        action(ev);
      });
    } else {
      // btnSlot.parentElement.remove();
    }
  }

  defaultActionForBigBangButton() {
    console.log("Missing a VALID action attribute value");
  }

  // 加载
  connectedCallback() {
    console.log("added to page");
    if (this.color) {
      this.color = "red";
    }
  }

  // 卸载
  disconnectedCallback() {
    console.log("removed from page");
  }

  // Attributes and Properties...
  static get observedAttributes() {
    return ["color", "action"];
  }

  get color() {
    return this.getAttribute("color");
  }
  set color(value) {
    this.setAttribute("color", value);
  }


  get action() {
    return this.getAttribute("action");
  }
  set action(value) {
    this.setAttribute("action", value);
  }


  get customAttribute() {
    return this.getAttribute("customAttribute");
  }
  set customAttribute(value) {
    this.setAttribute("customAttribute", value);
  }


  attributeChangedCallback(attributeName, oldVal, newVal) {

    console.log(attributeName,'===>attributeName')
    if (attributeName.toLowerCase() === "color") {
      this.style.backgroundColor = newVal;
    }
  }
}

customElements.define("big-bang", BigBang);
// <big-bang>
