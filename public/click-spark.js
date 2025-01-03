class ClickSpark extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = this.createSpark();
    this.svg = this.shadowRoot.querySelector('svg');
    this._parent = this.parentNode;
    this._parent.addEventListener('click', this);
  }

  disconnectedCallback() {
    this._parent.removeEventListener('click', this);
    delete this._parent;
  }

  handleEvent(event) {
    this.setSparkPosition(event);
    this.animateSpark();
  }

  animateSpark() {
    const sparks = [...this.svg.children];
    const size = parseInt(sparks[0].getAttribute('y1'));
    const offset = `${size / 2}px`;

    const keyframes = (i) => {
      const deg = `calc(${i} * (360deg / ${sparks.length}))`;

      return [
        {
          strokeDashoffset: size * 3,
          transform: `rotate(${deg}) translateY(${offset})`
        },
        {
          strokeDashoffset: size,
          transform: `rotate(${deg}) translateY(0)`
        }
      ];
    };

    const options = {
      duration: 660,
      fill: 'forwards',
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
    };

    sparks.forEach((spark, i) => spark.animate(keyframes(i), options));
  }

  setSparkPosition(event) {
    this.style.left = `${event.pageX - this.clientWidth / 2}px`;
    this.style.top = `${event.pageY - this.clientHeight / 2}px`;
  }

  createSpark() {
    return `
      <style>
        :host {
          position: absolute;
          pointer-events: none;
        }
      </style>
      <svg width="30" height="30" viewBox="0 0 100 100" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" stroke="#FF8F00">
        ${Array.from({ length: 8 }, () => `<line x1="50" y1="30" x2="50" y2="4" stroke-dasharray="30" stroke-dashoffset="30" style="transform-origin: center" />`).join('')}
      </svg>
    `;
  }
}

customElements.define('click-spark', ClickSpark);
