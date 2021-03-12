import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import DrawingCard from '../../common/drawingCard';
import PageHeader from '../../common/pageHeader';
import { deleteDrawing, getMyDrawings } from '../../services/drawingsService';

interface MyDrawingsProps {
  drawings: any[];
  [x: string]: any;
}

class MyDrawings extends Component {
  state: MyDrawingsProps = {
    drawings: [],
    loading: true,
  };

  async componentDidMount(): Promise<void> {
    await this.getData();
  }

  componentWillUnmount(): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.setState = (state, callback) => {};
  }

  async getData(): Promise<void> {
    try {
      const { data } = await getMyDrawings();

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      data.length
        ? this.setState({ loading: false, drawings: data })
        : this.setState({ loading: false, drawings: [] });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  handleDeleteDrawing = async (id: string, index: number): Promise<void> => {
    const { drawings } = this.state;
    try {
      this.setState({ drawings: [...drawings].filter((_, i) => i !== index) });
      await deleteDrawing(id);
      this.getData();
    } catch (error) {
      this.setState({ drawings });
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  render(): React.ReactNode {
    const { drawings, loading } = this.state;

    return (
      <div className="container">
        <PageHeader titleText="Drawing Collection" />
        <div className="row">
          <div className="col-12 text-center">
            <p>Your drawing Collection</p>

            <div className="row">
              {drawings.length ? (
                drawings.map((drawing, i) => (
                  <DrawingCard
                    drawing={drawing}
                    key={drawing._id}
                    onDelete={() => this.handleDeleteDrawing(drawing._id, i)}
                  />
                ))
              ) : (
                <div className={`mx-auto ${loading ? 'text-info' : ''}`}>
                  {loading ? 'LOADING' : 'No drawings yet'}...
                </div>
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
