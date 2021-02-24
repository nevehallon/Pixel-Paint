class Detector {
  constructor() {
    window.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mouseup', this.handleMouseUp);
  }

  isMouseDown = false;

  handleMouseDown = (): void => {
    this.isMouseDown = true;
  };

  handleMouseUp = (): void => {
    this.isMouseDown = false;
  };
}

export default new Detector();
