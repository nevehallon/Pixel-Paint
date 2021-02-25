/* eslint-disable newline-per-chained-call */
import React from 'react';
import { toast } from 'react-toastify';

import Joi from 'joi';

import { Form, PageHeader } from '../../common';
import PaintCanvas from '../../common/paintCanvas';
import { createDrawing } from '../../services/drawingsService';

export interface createDrawingState {
  formData: {
    drawingName: string;
    description: string;
    grid: string[];
  };
  errors: { [key: string]: any };
}
class CreateDrawing extends Form {
  state: createDrawingState = {
    formData: {
      drawingName: '',
      description: '',
      grid: Array(35 ** 2)
        .fill('')
        .map((x, i) => (i % 2 === 0 ? 'lightgrey' : 'white')),
      // TODO:
    },
    errors: {},
  };

  schema = {
    drawingName: Joi.string().min(2).max(255).required().label('drawingName'),
    description: Joi.string().min(2).max(1024).required().label('description'),
    // TODO:
  };

  currentColor = '#000';

  handleFill = (grid: string[]): void => {
    const { formData } = this.state;

    formData.grid = grid;

    this.setState({ ...this.state, formData });
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

  render(): React.ReactNode {
    return (
      <div>
        <PageHeader titleText="Create pixel art" />
        <div className="row text-center">
          <div className="col-12">
            <p>Lets make a new drawing!</p>
          </div>
          <PaintCanvas
            // prettier-ignore
            currentColor={this.currentColor}
            fillAction={(grid: string[]): any => this.handleFill(grid)}
            grid={this.state.formData.grid}
          />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto">
              <form noValidate onSubmit={this.handleSubmit}>
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
