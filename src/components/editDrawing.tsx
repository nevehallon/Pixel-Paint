/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable newline-per-chained-call */
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import Joi from 'joi';

import { Form, PageHeader } from '../common';
import { Drawing } from '../interfaces/Drawing';
import { editDrawing, getDrawing } from '../services/drawingsService';

class EditDrawing extends Form {
  state = {
    formData: {
      _id: '',
      drawingName: '',
      description: '',
      // TODO:
    },
    errors: {},
  };

  schema = Joi.object({
    _id: Joi.string(),
    drawingName: Joi.string().min(2).max(255).required().label('drawingName'),
    description: Joi.string().min(2).max(1024).required().label('description'),
    // TODO:
  });

  async componentDidMount(): Promise<void> {
    try {
      const { data }: any = await getDrawing(
        (this.props as any).match.params.id
      );
      this.setState({ formData: this.mapToState(data) });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  mapToState = (drawing: Drawing): Drawing => {
    const { drawingName, description, _id }: Drawing = drawing;
    return { drawingName, description, _id };
  };

  doSubmit = async (): Promise<void> => {
    const { ...data } = this.state.formData;

    await editDrawing(data);

    toast.success('Drawing was updated', {
      position: 'top-center',
      autoClose: 2500,
    });
    (this.props as any).history.replace('/my-drawings');
  };

  render(): React.ReactNode {
    return (
      <div className="container">
        <PageHeader titleText="Edit drawing" />
        <div className="row text-center">
          <div className="col-12">
            <p>Edit your drawing</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 m-auto">
            <form noValidate onSubmit={this.handleSubmit}>
              {this.renderInput('drawingName', 'Name')}
              {this.renderInput('description', 'description')}

              <div className="text-center mx-5 my-3">
                <Link className="btn btn-block btn-danger" to="/my-drawings">
                  Cancel
                </Link>
              </div>

              {this.renderButton('Update Drawing')}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditDrawing;
