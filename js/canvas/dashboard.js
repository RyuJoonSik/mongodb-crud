import Canvas from './canvas.js';

class Dashboard extends Canvas {
  constructor(id, name) {
    super(id);

    this.NAME = name;
    this.X = 0;
    this.Y = 0;
    this.RADIUS = 0;
    this.INNER_RADIUS = 0;
    this.ARROW_LENGTH = 0;
    this.ROTATE_ANGLE = (Math.PI / 180) * 105;
    this.DIVIDED_COUNT = 12;
    this.ANGLE = Math.PI / (12 / 2);
    this.COLORS = [
      '#3ff9ba',
      '#56ffc2',
      '#6eff93',
      '#9eff86',
      '#ccfd84',
      '#fff575',
      '#fcd371',
      '#fc8375',
      '#ea5b69',
      '#f0166b',
    ];
    this.VALUE = 0;
    this.VALUES =
      name === '온도'
        ? Array.from({ length: 11 }, (value, idx) => 25 + idx)
        : Array.from({ length: 11 }, (value, idx) => 50 + idx * 5);
  }

  init() {
    const { CANVAS, CTX } = this;
    super.init();

    this.X = CANVAS.width / 2;
    this.Y = CANVAS.height / 2;

    const { X, Y } = this;

    this.RADIUS = Math.min(Y, X);
    this.INNER_RADIUS = this.RADIUS * 0.8;
    this.ARROW_LENGTH = this.INNER_RADIUS * 0.7;
    CTX.translate(X, Y);
    CTX.font = 'bold 24px sans-serif';
    CTX.textBaseline = 'middle';
  }

  convertToRadian(angle) {
    return (Math.PI / 180) * angle;
  }

  setValue(val) {
    this.VALUE = val;
  }

  drawCircle() {
    const { CTX, RADIUS, ROTATE_ANGLE, INNER_RADIUS, ANGLE, COLORS } = this;
    const LENGTH_COLOR = COLORS.length;

    for (let i = 0; i < 10; i += 1) {
      const START = ANGLE * i + ROTATE_ANGLE;
      const END = ANGLE * (i + 1) + ROTATE_ANGLE;
      CTX.fillStyle = COLORS[i % LENGTH_COLOR];

      CTX.beginPath();
      CTX.arc(0, 0, RADIUS, START, END);
      CTX.arc(0, 0, INNER_RADIUS, END, START, true);
      CTX.fill();
    }

    CTX.beginPath();
    CTX.arc(0, 0, INNER_RADIUS * 0.15, 0, Math.PI * 2);
    CTX.fillStyle = '#eee';
    CTX.fill();
  }

  drawText() {
    const { CTX, INNER_RADIUS, ANGLE, ROTATE_ANGLE, NAME, VALUES } = this;
    const VALUES_LENGH = VALUES.length;
    CTX.fillStyle = '#818688';

    CTX.beginPath();

    for (let i = 0; i < VALUES_LENGH; i += 1) {
      const TEXT_ANGLE = this.convertToRadian(270 / 10) * i + ROTATE_ANGLE;
      const TEXT_WIDTH = CTX.measureText(VALUES[i]).width;
      const TEXT_DISTANCE = INNER_RADIUS * 0.9;
      const TEXT_X = Math.cos(ANGLE + TEXT_ANGLE) * TEXT_DISTANCE - TEXT_WIDTH / 2;
      const TEXT_Y = Math.sin(ANGLE + TEXT_ANGLE) * TEXT_DISTANCE;

      CTX.fillText(VALUES[i], TEXT_X, TEXT_Y);
    }

    const KW_WIDTH = CTX.measureText(NAME).width / 2;

    CTX.fillText(NAME, 0 - KW_WIDTH, INNER_RADIUS * 0.3);
  }

  clear() {
    const { CTX, X, Y } = this;
    const { width: WIDHT, height: HEIGHT } = this.CANVAS;

    CTX.clearRect(-X, -Y, WIDHT, HEIGHT);
  }

  drawArrow() {
    const { CTX, ANGLE, ROTATE_ANGLE, ARROW_LENGTH, VALUE, VALUES } = this;
    const GAP = Math.abs(VALUES[0] - VALUES[1]);
    const VAL = (VALUE - VALUES[0]) / GAP;
    CTX.lineWidth = '2';

    CTX.beginPath();

    CTX.strokeStyle = '#818688';
    const VAL_X = Math.cos(ANGLE + (this.convertToRadian(270 / 10) * VAL + ROTATE_ANGLE)) * ARROW_LENGTH;
    const VAL_Y = Math.sin(ANGLE + (this.convertToRadian(270 / 10) * VAL + ROTATE_ANGLE)) * ARROW_LENGTH;

    CTX.moveTo(0, 0);
    CTX.lineTo(VAL_X, VAL_Y);
    CTX.stroke();
  }

  drawMeter() {
    this.clear();
    this.drawCircle();
    this.drawText();
    this.drawArrow();
  }
}

export default Dashboard;
