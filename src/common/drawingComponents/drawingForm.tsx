import { ChangeEvent, createRef, RefObject } from 'react';

import { Button, IconButton, InputLabel, TextField } from '@material-ui/core';
import GridOffIcon from '@material-ui/icons/GridOff';
import GridOnIcon from '@material-ui/icons/GridOn';
import RedoIcon from '@material-ui/icons/Redo';
import UndoIcon from '@material-ui/icons/Undo';
import html2canvas from 'html2canvas';
import Joi from 'joi';

import { initialGrid } from '../../services/drawingsService';
import GlobalListener from '../../services/globalListener';
import ColorPicker from './colorPicker';
import PaintCanvas from './paintCanvas';

import { Form } from '..';

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

  convert2image = (): void => {
    console.log('hit');

    // ?
    html2canvas(this.gridRef.current).then((canvas) => {
      // this.gridRef.current.parentNode.appendChild(canvas);
      // TODO: append canvas to DOM
    });
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

  handleChangeComplete = ({ rgb: { r, g, b, a } }: { rgb: any }): void => {
    this.setState({ currentColor: `rgb(${[r, g, b, a].join(', ')})` });
  };

  handleNumberChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newNumber = +e.target.value;
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
    const inputProps = {
      step: 2,
      min: 15,
      max: 35,
      value: Math.sqrt(grid.length),
    };
    return (
      <>
        <InputLabel htmlFor="gridSize">Grid size</InputLabel>
        <TextField
          className="form-control mb-4"
          id="gridSize"
          inputProps={inputProps}
          label="15x15 - 35x35"
          onChange={this.handleNumberChange}
          type="number"
        />
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
    return (
      <>
        <div className="tools d-flex justify-content-around mt-2 mx-auto">
          <div className="colorPickerContainer d-flex align-items-center">
            <small className="mr-2">Current Color:</small>
            <ColorPicker
              currentColor={this.state.currentColor}
              emitChangeComplete={this.handleChangeComplete}
            />
          </div>
          <IconButton aria-label="undo" onClick={this.handleUndo}>
            <UndoIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label="redo" onClick={this.handleRedo}>
            <RedoIcon fontSize="small" />
          </IconButton>
          <Button
            aria-label="reset"
            color="secondary"
            endIcon={<GridOnIcon />}
            onClick={this.handleReset}
            size="small"
            variant="contained"
          >
            <small>Clear</small>
          </Button>
          <Button
            aria-label="see results"
            color="primary"
            endIcon={<GridOffIcon />}
            onMouseDown={() => this.handleGridOff(true)}
            size="small"
            variant="contained"
          >
            <GlobalListener
              eventType={['mouseup']}
              handler={[() => this.handleGridOff(false)]}
            />
            <small>Demo</small>
          </Button>
        </div>
        <hr />
      </>
    );
  }
}

export default DrawingForm;
