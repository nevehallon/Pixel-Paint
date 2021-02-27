/* eslint-disable newline-per-chained-call */
import React, { ChangeEvent } from 'react';
import { CirclePicker } from 'react-color';
import { toast } from 'react-toastify';

import { InputLabel, TextField } from '@material-ui/core';
import Joi from 'joi';

import { Form, PageHeader } from '../../common';
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
    currentColor: '#000',
  };

  schema = {
    drawingName: Joi.string().min(2).max(255).required().label('drawingName'),
    description: Joi.string().min(2).max(1024).required().label('description'),
    // TODO:
  };

  handleFill = (newGrid: string[]): void => {
    this.state.grid = newGrid;

    this.setState({ ...this.state });
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
    const newGrid = Array((+e.target.value) ** 2)
      .fill('')
      .map((_, i) => (i % 2 === 0 ? 'lightgrey' : 'white'));
    // prettier-ignore
    this.setState({ grid: newGrid }/* , () => console.log(this.state) */);
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
            // prettier-ignore
            currentColor={currentColor}
            fillAction={(newGrid: string[]): any => this.handleFill(newGrid)}
            grid={this.state.grid}
          />
        </div>
        <span>Current Color:</span>
        <CirclePicker
          circleSize={22}
          className="d-flex justify-content-center m-2"
          color={currentColor}
          onChangeComplete={this.handleChangeComplete}
          width="100%"
        />
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto">
              <form noValidate onSubmit={this.handleSubmit}>
                {/* range 15x15 - 35x35 */}
                {/* <label htmlFor="gridSize" /> */}
                <InputLabel htmlFor="gridSize">Grid size</InputLabel>
                <TextField
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
