class Detector {
  constructor() {
    window.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mouseup', this.handleMouseUp);
  }

  isMouseDown = false;

  handleMouseDown = (): void => {
    console.log('MouseDown');

    this.isMouseDown = true;
  };

  handleMouseUp = (): void => {
    console.log('MouseUp');
    this.isMouseDown = false;
  };
}

export default new Detector();
