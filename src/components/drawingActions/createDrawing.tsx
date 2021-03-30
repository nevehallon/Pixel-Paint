/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable newline-per-chained-call */
import React from 'react';
import { toast } from 'react-toastify';

import { DrawingForm, DrawingState, PageHeader } from '../../common';
import { GenericObjectProps } from '../../interfaces/genericObjectProps';
import { createDrawing, initialGrid } from '../../services/drawingsService';
import InputFeedback from './inputTextFeedback';

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
              <form
                className="p-card"
                noValidate
                onSubmit={(e) => {
                  if (this.state.isInitial) {
                    e.preventDefault();
                    toast.error('Canvas can not be blank', {
                      position: 'top-center',
                      autoClose: 2500,
                    });
                    return;
                  }
                  this.handleSubmit(e);
                }}
              >
                <div className="p-card-content m-3">
                  {this.renderSizePicker()}
                  <InputFeedback
                    label="Name"
                    maxLength={26}
                    renderInput={(rest: GenericObjectProps) =>
                      this.renderInput('drawingName', '', 'text', {
                        ...rest,
                      })
                    }
                  />
                  <InputFeedback
                    label="Description"
                    maxLength={225}
                    renderInput={(rest: GenericObjectProps) =>
                      this.renderInput('description', '', 'textarea', {
                        ...rest,
                      })
                    }
                  />
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
