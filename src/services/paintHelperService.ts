class Detector {
  constructor() {
    window.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mouseup', this.handleMouseUp);
  }

  drawStart = false;

  newGrid!: { fill: string; touched: string }[];

  canCallBack = false;

  callback = () => {};

  isMouseDown = false;

  handleMouseDown = (): void => {
    this.isMouseDown = true;
  };

  handleMouseUp = (): void => {
    this.isMouseDown = false;

    this.callback();
  };

  cleanup = () => {
    window.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('mouseup', this.handleMouseUp);
  };
}

export default new Detector();