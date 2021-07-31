class Canvas {
  constructor(id) {
    this.CANVAS = document.getElementById(id);
    this.CTX = this.CANVAS.getContext('2d');
    this.SCALE = window.devicePixelRatio;
  }

  init() {
    const { CANVAS, SCALE } = this;

    CANVAS.width = SCALE * CANVAS.offsetWidth;
    CANVAS.height = SCALE * CANVAS.offsetHeight;
  }
}

export default Canvas;
