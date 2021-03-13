class Detector {
  constructor() {
    window.addEventListener('pointerdown', this.handleMouseDown);
    window.addEventListener('pointerup', this.handleMouseUp);
  }

  drawStart = false;

  newGrid!: { fill: string; touched: string }[];

  canCallBack = false;

  callback = (): void => {};

  isMouseDown = false;

  handleMouseDown = (): void => {
    this.isMouseDown = true;
  };

  handleMouseUp = (): void => {
    this.isMouseDown = false;

    this.callback();
  };

  cleanup = (): void => {
    window.removeEventListener('pointerdown', this.handleMouseDown);
    window.removeEventListener('pointerup', this.handleMouseUp);
  };
}

export default Detector;
