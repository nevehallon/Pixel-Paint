/* eslint-disable newline-per-chained-call */
import React from 'react';
import { toast } from 'react-toastify';

import Joi from 'joi';

import { Form, PageHeader } from '../common';
import { createDrawing } from '../services/drawingsService';

class CreateDrawing extends Form {
  state = {
    formData: {
      drawingName: '',
      description: '',
      // TODO:
    },
    errors: {},
  };

  schema = Joi.object({
    drawingName: Joi.string().min(2).max(255).required().label('drawingName'),
    description: Joi.string().min(2).max(1024).required().label('description'),
    // TODO:
  });

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
      <div className="container">
        <PageHeader titleText="Create pixel art" />
        <div className="row text-center">
          <div className="col-12">
            <p>Lets make a new drawing!</p>
          </div>
        </div>
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
    );
  }
}

export default CreateDrawing;
