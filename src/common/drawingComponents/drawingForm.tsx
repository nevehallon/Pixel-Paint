/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { createRef, RefObject } from 'react';

import GridOnIcon from '@material-ui/icons/GridOn';
import { Button } from 'primereact/button';
import { toPng } from 'html-to-image';
import Joi from 'joi';
import { ColorPicker } from 'primereact/colorpicker';
import { InputNumber, InputNumberProps } from 'primereact/inputnumber';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Badge } from 'primereact/badge';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime, take } from 'rxjs/operators';

import { initialGrid } from '../../services/drawingsService';
import GlobalListener from '../../services/globalListener';
import PaintCanvas from './paintCanvas';

import { Form } from '..';

export interface inputNumberEvent {
  originalEvent: Event;
  value: any;
}
export interface GridItem {
  fill: string;
  touched: string;
}
export interface DrawingState {
  addedStyle: { border: string };
  gateKeep: boolean;
  canvasStateTimeline: GridItem[][];
  currentStateIndex: number;
  formData: {
    drawingName: string;
    description: string;
  };
  errors: { [key: string]: any };
  grid: GridItem[];
  currentColor: string;
  isInitial: boolean;
  dataUrl: string;
}

class DrawingForm extends Form {
  constructor(
    props: { [x: string]: any } | Readonly<{ [x: string]: any }>,
    private gridRef: RefObject<any>
  ) {
    super(props);
    this.gridRef = createRef();
  }

  convert2image = async (): Promise<string> => {
    const imgRef: HTMLElement = this.gridRef.current;

    Array.from(imgRef.children).forEach((x: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      x.dataset.touched ? false : (x.style.backgroundColor = 'transparent');
      x.style.border = 'none';
    });
    imgRef.style.minWidth = '175px';
    imgRef.style.minHeight = '175px';
    imgRef.style.width = '175px';
    imgRef.style.height = '175px';
    return toPng(imgRef, {
      backgroundColor: 'transparent',
      style: { margin: 'auto', width: '100%', height: '100%' },
      width: imgRef.offsetWidth,
      height: imgRef.offsetHeight,
      pixelRatio: 1,
      skipFonts: true,
    });
  };

  schema: { [key: string]: Joi.StringSchema | Joi.ArraySchema } = {
    drawingName: Joi.string().min(2).max(26).required().label('Drawing Name'),
    description: Joi.string().min(2).max(225).required().label('Description'),
    grid: Joi.array().min(225).max(1225).required().label('canvas'),
    dataUrl: Joi.string().required().label('src'),
  };

  validate = (isSubmit = false): any => {
    const {
      state: { formData, grid, dataUrl },
      schema: { drawingName, description, _id },
    } = this;

    const schema: { [key: string]: Joi.StringSchema | Joi.ArraySchema } = {
      drawingName,
      description,
    };
    if (_id) schema._id = _id;
    if (grid && isSubmit) {
      formData.grid = [...grid].filter((x) => x.touched);
      schema.grid = this.schema.grid;
      formData.dataUrl = dataUrl;
      schema.dataUrl = this.schema.dataUrl;
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    } else delete formData.grid && delete formData.dataUrl;

    const { error } = Joi.object(schema)!.validate(formData, {
      abortEarly: false,
    });

    if (!error) return null;

    const errors: { [name: string]: any } = {};

    error.details.forEach(({ path, message }: any) => {
      errors[path[0]] = message;
    });

    return errors;
  };

  handleFill = (newGrid: GridItem[]): void => {
    const { currentStateIndex, canvasStateTimeline } = this.state;
    this.setState({
      grid: newGrid,
      currentStateIndex: currentStateIndex + 1,
      canvasStateTimeline: [
        ...canvasStateTimeline.slice(0, currentStateIndex + 1),
        newGrid,
      ],
      isInitial: false,
    });
  };

  handleChangeComplete = ({ r, g, b }: { [key: string]: any }): void => {
    this.setState({ currentColor: `rgb(${[r, g, b].join(', ')})` });
  };

  handleNumberChange = (e: inputNumberEvent): void => {
    const newNumber = +e.value;
    if (newNumber < 15 || newNumber > 35) return;
    const newGrid = Array(newNumber ** 2)
      .fill('')
      .map((_, i) => ({
        fill: i % 2 === 0 ? 'lightgrey' : 'white',
        touched: '',
      }));

    const resetTimeline = [newGrid];

    this.setState({
      grid: newGrid,
      canvasStateTimeline: resetTimeline,
      currentStateIndex: 0,
      isInitial: true,
    });
  };

  handleUndo = (): void => {
    const { canvasStateTimeline, currentStateIndex, grid } = this.state;
    if (currentStateIndex < 1) return;
    const size = Math.sqrt(grid.length);
    const newIdex = currentStateIndex - 1;

    this.setState({
      grid: canvasStateTimeline[newIdex],
      canvasStateTimeline: [...canvasStateTimeline],
      currentStateIndex: newIdex,
      isInitial:
        JSON.stringify(canvasStateTimeline[newIdex]) ===
        JSON.stringify(initialGrid(size)),
    });
  };

  handleRedo = (): void => {
    const { canvasStateTimeline, currentStateIndex, grid } = this.state;
    // prettier-ignore
    if (currentStateIndex === canvasStateTimeline.length - 1) return;
    const size = Math.sqrt(grid.length);
    const newIdex = currentStateIndex + 1;
    this.setState({
      grid: canvasStateTimeline[newIdex],
      canvasStateTimeline: [...canvasStateTimeline],
      currentStateIndex: newIdex,
      isInitial:
        JSON.stringify(canvasStateTimeline[newIdex]) ===
        JSON.stringify(initialGrid(size)),
    });
  };

  handleReset = (): void => {
    if (this.state.isInitial) return;
    const { currentStateIndex, canvasStateTimeline, grid } = this.state;
    const size = Math.sqrt(grid.length);
    this.setState({
      grid: initialGrid(size),
      currentStateIndex: currentStateIndex + 1,
      canvasStateTimeline: [
        ...canvasStateTimeline.slice(0, currentStateIndex + 1),
        initialGrid(size),
      ],
      isInitial: true,
    });
  };

  handleGridOff = (hideGrid: boolean): void => {
    const { grid, gateKeep } = this.state;
    if (hideGrid) {
      this.setState({
        addedStyle: { border: 'none' },
        grid: grid.map((x: GridItem) => ({
          ...x,
          fill: x.touched ? x.fill : 'transparent',
        })),
        gateKeep: false,
      });
      return;
    }

    if (gateKeep) return;

    const { currentStateIndex, canvasStateTimeline } = this.state;

    this.setState({
      addedStyle: { border: '1px solid #00000065' },
      grid: canvasStateTimeline[currentStateIndex],
    });
  };

  renderSizePicker(): JSX.Element {
    const { grid } = this.state;
    const root = Math.sqrt(grid.length);
    const inputProps: InputNumberProps = {
      step: 2,
      min: 15,
      max: 35,
      value: root,
      format: true,
      readOnly: true,
    };
    return (
      <>
        <div className="p-grid p-fluid">
          <div className=" p-field p-col-12">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="gridSize">Grid Size (15x15 - 35x35)</label>
            <InputNumber
              buttonLayout="horizontal"
              decrementButtonClassName=" p-button-outlined p-button-danger"
              decrementButtonIcon="pi pi-minus"
              id="gridSize"
              incrementButtonClassName=" p-button-outlined p-button-info"
              incrementButtonIcon="pi pi-plus"
              name="gridSize"
              onChange={(e) => this.handleNumberChange(e)}
              showButtons
              suffix={`x${root}`}
              {...inputProps}
            />
          </div>
        </div>
      </>
    );
  }

  renderPaintCanvas(): JSX.Element {
    const { currentColor } = this.state;
    return (
      <>
        <PaintCanvas
          addedStyle={this.state.addedStyle}
          currentColor={currentColor}
          fillAction={(newGrid: GridItem[]): any => this.handleFill(newGrid)}
          grid={this.state.grid}
          ref={this.gridRef}
        />
      </>
    );
  }

  renderTools(): JSX.Element {
    const onChange$ = new Subject();
    const handleSearch = (rgb: { [key: string]: any }) => {
      onChange$.next(rgb);
    };
    onChange$.pipe(debounceTime(100), take(1)).subscribe((rgb: any) => {
      this.handleChangeComplete(rgb);
    });

    const [r, g, b] = this?.state?.currentColor?.match(/[0-9]{1,3}/g);

    const cpStyles = {
      color: `rgb(${[r, g, b].join(', ')})`,
      filter: `drop-shadow(0 0 2px white) invert(1) grayscale(1) contrast(4)`,
    };

    return (
      <ScrollPanel
        className="sp contain mx-auto p-card"
        style={{ height: '58px' }}
      >
        <div className="tools p-2">
          <div className="leftContents d-flex align-items-center justify-content-start">
            <Button
              aria-label="undo"
              className="p-button-rounded p-button p-button-text"
              icon="pi pi-replay"
              onClick={this.handleUndo}
            />
            <Button
              aria-label="redo"
              className="p-button-rounded p-button p-button-text"
              icon="pi pi-refresh"
              onClick={this.handleRedo}
            />
            {/* <Divider layout="vertical" style={{ padding: 0 }} /> */}
            <div className="p-float-label p-overlay-badge">
              <ColorPicker
                appendTo={this.gridRef.current}
                format="rgb"
                onChange={({ value }) =>
                  // eslint-disable-next-line no-restricted-globals
                  !isNaN(value.r) && handleSearch(value)
                }
                value={{ r, g, b }}
              />
              <Badge
                style={{
                  backgroundColor: cpStyles.color,
                  boxShadow: '0 0 1px 1px',
                  filter: `drop-shadow(0 0 2px white)`,
                }}
              />
              <label
                className="pi pi-palette"
                style={{
                  transform: 'scale(1.8)',
                  ...cpStyles,
                }}
              />
            </div>
            {/* <Divider layout="vertical" style={{ padding: 0 }} /> */}
          </div>
          <div className="rightContents d-flex align-content-center justify-content-around">
            <Button
              aria-label="reset"
              className="p-button-rounded p-button-text p-button-danger"
              // endIcon={<GridOnIcon />}
              label="Clear"
              onClick={this.handleReset}
            >
              {/* TODO: whileTap={{ scale: 0.9 }} */}
              <GridOnIcon />
            </Button>
            <Button
              aria-label="see results"
              className="p-button-rounded p-button-text p-button-success"
              icon="pi pi-eye"
              label="Demo"
              onPointerDown={() => this.handleGridOff(true)}
            >
              <GlobalListener
                eventType={['pointerup', 'touchend']}
                handler={[() => this.handleGridOff(false), true]}
              />
            </Button>
          </div>
        </div>
      </ScrollPanel>
    );
  }
}

export default DrawingForm;
