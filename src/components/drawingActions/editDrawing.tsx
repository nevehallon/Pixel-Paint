/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable newline-per-chained-call */

import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import Joi from 'joi';

import { DrawingForm, PageHeader } from '../../common';
import { Drawing } from '../../interfaces/Drawing';
import {
  editDrawing,
  getDrawing,
  initialGrid,
} from '../../services/drawingsService';

class EditDrawing extends DrawingForm {
  constructor(props: { [x: string]: any } | Readonly<{ [x: string]: any }>) {
    super(props);
    this.schema._id = Joi.string();
  }

  state = {
    addedStyle: { border: '1px solid #00000065' },
    gateKeep: true,
    canvasStateTimeline: [],
    currentStateIndex: 0,
    formData: {
      _id: '',
      drawingName: '',
      description: '',
    },
    errors: {},
    grid: initialGrid(),
    currentColor: 'rgb(63, 81, 181)',
    isInitial: false,
  };

  async componentDidMount(): Promise<void> {
    try {
      const { data }: any = await getDrawing(
        (this.props as any).match.params.id
      );
      const { drawingName, description, grid, _id } = this.mapToState(data);

      const savedGrid = grid.map(({ fill, touched }) => ({ fill, touched }));

      this.setState({
        formData: { drawingName, description, _id },
        grid: savedGrid,
        canvasStateTimeline: [savedGrid],
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  mapToState = (drawing: Drawing): Drawing => {
    const { drawingName, description, grid, _id }: Drawing = drawing;
    return { drawingName, description, grid, _id };
  };

  doSubmit = async (): Promise<void> => {
    const { formData, grid } = this.state;
    const data = { ...formData, grid };

    await editDrawing(data);

    toast.success('Drawing was updated', {
      position: 'top-center',
      autoClose: 2500,
    });
    (this.props as any).history.replace('/my-drawings');
  };

  render(): React.ReactNode {
    const { grid } = this.state;
    return (
      <div>
        <PageHeader titleText="Edit drawing" />
        <div className="row text-center">
          <div className="col-12">
            <p>Edit your drawing</p>
          </div>
          {grid.length ? this.renderPaintCanvas() : null}
        </div>
        {this.renderTools()}
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto">
              <form noValidate onSubmit={this.handleSubmit}>
                {this.renderSizePicker()}
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
      </div>
    );
  }
}

export default EditDrawing;
