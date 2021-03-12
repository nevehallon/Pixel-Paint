/* eslint-disable jsx-a11y/label-has-associated-control */
import { createRef, RefObject } from 'react';

import GridOffIcon from '@material-ui/icons/GridOff';
import { Button } from 'primereact/button';
import GridOnIcon from '@material-ui/icons/GridOn';
import { toPng } from 'html-to-image';
import Joi from 'joi';
import { ColorPicker } from 'primereact/colorpicker';
import { InputNumber, InputNumberProps } from 'primereact/inputnumber';
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
}

class DrawingForm extends Form {
  constructor(
    props: { [x: string]: any } | Readonly<{ [x: string]: any }>,
    private gridRef: RefObject<any>
  ) {
    super(props);
    this.gridRef = createRef();
  }

  convert2image = async (): Promise<void> => {
    const imgRef: HTMLElement = this.gridRef.current;
    const img = await toPng(imgRef, {
      backgroundColor: 'transparent',
      quality: 0.1,
      style: { margin: 'auto', width: '100%', height: '100%' },
      width: imgRef.offsetWidth,
      height: imgRef.offsetHeight,
      pixelRatio: 1,
    });
    console.log(img);
  };

  schema: { [key: string]: Joi.StringSchema | Joi.ArraySchema } = {
    drawingName: Joi.string().min(2).max(255).required().label('drawingName'),
    description: Joi.string().min(2).max(1024).required().label('description'),
    grid: Joi.array().min(1).max(1225).required().label('canvas'),
  };

  validate = (isSubmit = false): any => {
    const {
      state: { formData, grid },
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
    } else delete formData.grid;

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
    // console.log({ canvasStateTimeline, currentStateIndex });
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

  handleGridOff = (hideGrid: boolean, convert = false): void => {
    const { grid, gateKeep } = this.state;
    if (hideGrid) {
      this.setState(
        {
          addedStyle: { border: 'none' },
          grid: grid.map((x: GridItem) => ({
            ...x,
            fill: x.touched ? x.fill : 'transparent',
          })),
          gateKeep: false,
        },
        () => {
          if (!convert) return;
          // ? convert grid to image format
          this.convert2image();
        }
      );
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
              {...inputProps}
              onValueChange={(e) => this.handleNumberChange(e)}
              showButtons
              suffix={`x${root}`}
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
    onChange$
      .pipe(debounceTime(100), take(1))
      .subscribe((rgb: any) => this.handleChangeComplete(rgb));

    const [r, g, b] = this?.state?.currentColor?.match(/[0-9]{1,3}/g);

    const cpStyles = {
      color: `rgb(${[r, g, b].join(', ')})`,
      filter: `drop-shadow(0 0 2px white) invert(1) grayscale(1) contrast(4)`,
    };

    return (
      <div className="tools mx-auto p-card p-2">
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
              format="rgb"
              onChange={({ value }) => handleSearch(value)}
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
        <div className="rightContents d-flex align-content-center justify-content-end">
          <Button
            aria-label="reset"
            className="p-button-rounded p-button-text p-button-danger"
            // endIcon={<GridOnIcon />}
            label="Clear"
            onClick={this.handleReset}
          >
            {/* <small>&nbsp; Clear</small> */}
            <GridOnIcon />
          </Button>
          <Button
            aria-label="see results"
            className="p-button-rounded p-button-text p-button-success"
            // endIcon={<GridOffIcon />}
            icon="pi pi-eye"
            label="Demo"
            onMouseDown={() => this.handleGridOff(true)}
          >
            <GlobalListener
              eventType={['mouseup']}
              handler={[() => this.handleGridOff(false)]}
            />
          </Button>
        </div>
      </div>
    );
  }
}

export default DrawingForm;
