import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Drawing from '../common/drawing';
import PageHeader from '../common/pageHeader';
import { deleteDrawing, getMyDrawings } from '../services/drawingsService';

interface MyDrawingsProps {
  drawings: any[];
  [x: string]: any;
}

class MyDrawings extends Component {
  state: MyDrawingsProps = {
    drawings: [],
  };

  async componentDidMount(): Promise<void> {
    await this.getData();
  }

  async getData(): Promise<void> {
    try {
      const { data } = await getMyDrawings();

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      data.length
        ? this.setState({ drawings: data })
        : this.setState({ drawings: [] });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  handleDeleteDrawing = async (id: string): Promise<void> => {
    try {
      await deleteDrawing(id);
      this.getData();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  render(): React.ReactNode {
    const { drawings } = this.state;

    return (
      <div className="container">
        <PageHeader titleText="Drawing Collection" />
        <div className="row">
          <div className="col-12 text-center">
            <p>Your drawing Collection</p>

            <div className="row">
              {drawings.length ? (
                drawings.map((drawing) => (
                  <Drawing
                    drawing={drawing}
                    key={drawing._id}
                    onDelete={() => this.handleDeleteDrawing(drawing._id)}
                  />
                ))
              ) : (
                <div className=" mx-auto">No drawings yet...</div>
              )}
            </div>
            <Link className="btn btn-info mt-2" to="/create-drawing">
              Create a new drawing
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default MyDrawings;
