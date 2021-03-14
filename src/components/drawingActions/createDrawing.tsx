/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable newline-per-chained-call */
import React from 'react';
import { toast } from 'react-toastify';

import { DrawingForm, DrawingState, PageHeader } from '../../common';
import { createDrawing, initialGrid } from '../../services/drawingsService';

class CreateDrawing extends DrawingForm {
  state: DrawingState = {
    addedStyle: { border: '1px solid #00000065' },
    gateKeep: true,
    canvasStateTimeline: [initialGrid()],
    currentStateIndex: 0,
    formData: {
      drawingName: '',
      description: '',
    },
    errors: {},
    grid: initialGrid(),
    currentColor: 'rgb(63, 81, 181)',
    isInitial: true,
    dataUrl: '',
  };

  doSubmit = async (): Promise<void> => {
    const { formData, grid, dataUrl } = this.state;
    const data = { ...formData, grid, dataUrl };

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
          {this.renderPaintCanvas()}
        </div>
        {this.renderTools()}
        <div className="container">
          <div className="row">
            <div className=" m-auto">
              <form className="p-card" noValidate onSubmit={this.handleSubmit}>
                <div className="p-card-content m-3">
                  {this.renderSizePicker()}
                  {this.renderInput('drawingName', 'Name')}
                  {this.renderInput('description', 'description')}
                  {this.renderButton('Create Drawing')}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateDrawing;
