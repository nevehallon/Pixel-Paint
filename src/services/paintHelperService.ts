class Detector {
  constructor() {
    window.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mouseup', this.handleMouseUp);
  }

  newGrid!: string[];

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
}

export default new Detector();
