/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable newline-per-chained-call */
import React, { ChangeEvent } from 'react';
import { toast } from 'react-toastify';

import { InputLabel, TextField } from '@material-ui/core';
import Joi from 'joi';

import { Form, PageHeader } from '../../common';
import ColorPicker from '../../common/colorPicker';
import PaintCanvas from '../../common/paintCanvas';
import { createDrawing } from '../../services/drawingsService';

export interface createDrawingState {
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

  handleFill = (newGrid: string[]): void => {
    this.setState({ grid: newGrid });
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
    this.setState({ currentColor: color.hex });
  };

  handleNumberChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newNumber = +e.target.value;
    if (newNumber < 15 || newNumber > 35) return;
    const newGrid = Array(newNumber ** 2)
      .fill('')
      .map((_, i) => (i % 2 === 0 ? 'lightgrey' : 'white'));

    this.setState({ grid: newGrid });
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
        <div className="tools container">
          <span>Current Color:</span>
          <ColorPicker
            currentColor={this.state.currentColor}
            emitChangeComplete={this.handleChangeComplete}
          />
        </div>
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
