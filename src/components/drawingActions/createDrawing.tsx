/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable newline-per-chained-call */
import React, { ChangeEvent } from 'react';
import { toast } from 'react-toastify';

import { IconButton, InputLabel, TextField } from '@material-ui/core';
import RedoIcon from '@material-ui/icons/Redo';
import UndoIcon from '@material-ui/icons/Undo';
import Joi from 'joi';

import { Form, PageHeader } from '../../common';
import ColorPicker from '../../common/colorPicker';
import PaintCanvas from '../../common/paintCanvas';
import { createDrawing } from '../../services/drawingsService';

export interface createDrawingState {
  stateTimeline: createDrawingState[];
  currentStateIndex: number;
  formData: {
    drawingName: string;
    description: string;
  };
  errors: { [key: string]: any };
  grid: string[];
  currentColor: string;
}
class CreateDrawing extends Form {
  state: createDrawingState = {
    stateTimeline: [],
    currentStateIndex: 0,
    formData: {
      drawingName: '',
      description: '',
      // TODO:
    },
    errors: {},
    grid: Array(35 ** 2)
      .fill('')
      .map((_, i) => (i % 2 === 0 ? 'lightgrey' : 'white')),
    currentColor: '#3f51b5',
  };

  schema = {
    drawingName: Joi.string().min(2).max(255).required().label('drawingName'),
    description: Joi.string().min(2).max(1024).required().label('description'),
    // TODO:
  };

  getNewState(): {
    stateTimeline: createDrawingState[];
    currentStateIndex: number;
  } {
    const { stateTimeline } = this.state;
    const newStateTimeline = [...stateTimeline, { ...this.state }];
    const newIndex = stateTimeline.length + 1;

    return { stateTimeline: newStateTimeline, currentStateIndex: newIndex };
  }

  handleFill = (newGrid: string[]): void => {
    this.setState({ grid: newGrid, ...this.getNewState() });
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

  handleChangeComplete = (color: { hex: any }): void => {
    this.setState({ currentColor: color.hex, ...this.getNewState() });
  };

  handleNumberChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newNumber = +e.target.value;
    if (newNumber < 15 || newNumber > 35) return;
    const newGrid = Array(newNumber ** 2)
      .fill('')
      .map((_, i) => (i % 2 === 0 ? 'lightgrey' : 'white'));

    this.setState({ grid: newGrid, ...this.getNewState() });
  };

  handleUndo = (): void => {
    const { stateTimeline, currentStateIndex } = this.state;
    // console.log({ stateTimeline, currentStateIndex });
    if (currentStateIndex < 1) return;
    const newIdex = currentStateIndex - 1;

    // if (newIdex < 1) {
    //   this.setState(
    //     {
    //       ...stateTimeline[newIdex],
    //     },
    //     () => console.log(this.state)
    //   );
    //   return;
    // }

    this.setState(
      {
        ...stateTimeline[newIdex],
        // stateTimeline: [...stateTimeline],
      },
      () => console.log(this.state)
    );
  };

  handleRedo = (): void => {
    const { stateTimeline, currentStateIndex } = this.state;
    // prettier-ignore
    if (currentStateIndex < 1 || currentStateIndex === stateTimeline.length - 1) return;
    const newIdex = currentStateIndex + 1;
    this.setState({ ...stateTimeline[newIdex] });
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
            currentColor={currentColor}
            fillAction={(newGrid: string[]): any => this.handleFill(newGrid)}
            grid={this.state.grid}
          />
        </div>
        <div className="tools container d-flex justify-content-around">
          <div className="colorPickerContainer">
            <span>Current Color:</span>
            <ColorPicker
              currentColor={this.state.currentColor}
              emitChangeComplete={this.handleChangeComplete}
            />
          </div>
          <IconButton aria-label="undo" onClick={this.handleUndo}>
            <UndoIcon />
          </IconButton>
          <IconButton aria-label="redo" onClick={this.handleRedo}>
            <RedoIcon />
          </IconButton>
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
