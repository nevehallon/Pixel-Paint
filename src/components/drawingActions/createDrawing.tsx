/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable newline-per-chained-call */
import React, { ChangeEvent } from 'react';
import { toast } from 'react-toastify';

import { Button, IconButton, InputLabel, TextField } from '@material-ui/core';
import GridOffIcon from '@material-ui/icons/GridOff';
import GridOnIcon from '@material-ui/icons/GridOn';
import RedoIcon from '@material-ui/icons/Redo';
import UndoIcon from '@material-ui/icons/Undo';
import Joi from 'joi';

import { Form, PageHeader } from '../../common';
import ColorPicker from '../../common/colorPicker';
import PaintCanvas from '../../common/paintCanvas';
import { createDrawing } from '../../services/drawingsService';
import GlobalListener from '../../services/globalListener';

const initialGrid = (size = 35): { fill: string; touched: string }[] =>
  Array(size ** 2)
    .fill('')
    .map((_, i) => ({
      fill: i % 2 === 0 ? 'lightgrey' : 'white',
      touched: '',
    }));
export interface createDrawingState {
  addedStyle: { border: string };
  gateKeep: boolean;
  canvasStateTimeline: { fill: string; touched: string }[][];
  currentStateIndex: number;
  formData: {
    drawingName: string;
    description: string;
  };
  errors: { [key: string]: any };
  grid: { fill: string; touched: string }[];
  currentColor: string;
  isInitial: boolean;
}
class CreateDrawing extends Form {
  state: createDrawingState = {
    addedStyle: { border: '1px solid #00000065' },
    gateKeep: true,
    canvasStateTimeline: [[...initialGrid()]],
    currentStateIndex: 0,
    formData: {
      drawingName: '',
      description: '',
      // TODO:
    },
    errors: {},
    grid: [...initialGrid()],
    currentColor: 'rgb(63, 81, 181)',
    isInitial: true,
  };

  schema = {
    drawingName: Joi.string().min(2).max(255).required().label('drawingName'),
    description: Joi.string().min(2).max(1024).required().label('description'),
    // TODO:
  };

  doSubmit = async (): Promise<void> => {
    const { ...data } = this.state.formData;

    await createDrawing(data);
    toast.success('A new drawing was created', {
      position: 'top-center',
      autoClose: 2500,
    });
    (this.props as any).history.replace('/my-drawings');
  };

  handleFill = (newGrid: { fill: string; touched: string }[]): void => {
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

  handleChangeComplete = (color: { rgb: any }): void => {
    this.setState({ currentColor: color.rgb });
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

  handleGridOff = (hideGrid: boolean): void => {
    const { grid, gateKeep } = this.state;
    if (hideGrid) {
      this.setState({
        addedStyle: { border: 'none' },
        grid: grid.map((x) => ({
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

  render(): React.ReactNode {
    const { grid, currentColor } = this.state;
    const inputProps = {
      step: 2,
      min: 15,
      max: 35,
      value: Math.sqrt(grid.length),
    };

    return (
      <div>
        <PageHeader titleText="Create pixel art" />
        <div className="row text-center">
          <div className="col-12">
            <p>Lets make a new drawing!</p>
          </div>
          <PaintCanvas
            addedStyle={this.state.addedStyle}
            currentColor={currentColor}
            fillAction={(newGrid: { fill: string; touched: string }[]): any =>
              this.handleFill(newGrid)
            }
            grid={this.state.grid}
          />
        </div>
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
            color="secondary"
            endIcon={<GridOffIcon />}
            onMouseDown={() => this.handleGridOff(true)}
            size="small"
            variant="contained"
          >
            <GlobalListener
              eventType="mouseup"
              handler={() => this.handleGridOff(false)}
            />
            <small>Demo</small>
          </Button>
        </div>
        <hr />
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto">
              <form noValidate onSubmit={this.handleSubmit}>
                <InputLabel htmlFor="gridSize">Grid size</InputLabel>
                <TextField
                  className="form-control mb-4"
                  id="gridSize"
                  inputProps={inputProps}
                  label="15x15 - 35x35"
                  onChange={this.handleNumberChange}
                  type="number"
                />
                {this.renderInput('drawingName', 'Name')}
                {this.renderInput('description', 'description')}
                {this.renderButton('Create Drawing')}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateDrawing;
