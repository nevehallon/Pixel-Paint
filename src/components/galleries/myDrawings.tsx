import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// import DrawingCard from '../../common/drawingCard';
import PageHeader from '../../common/pageHeader';
import { deleteDrawing, getMyDrawings } from '../../services/drawingsService';
import FavoritesContext from '../../services/favoritesContext';
import {
  addFavorite,
  getCurrentUserDetails,
  removeFavorite,
} from '../../services/userService';
import { List } from './CardList';

import './styles.scss';

interface MyDrawingsState {
  drawings: any[];
  favorites: any[];
  loading: boolean;
  // [x: string]: any;
}

class MyDrawings extends Component {
  state: MyDrawingsState = {
    drawings: [],
    favorites: [],
    loading: true,
  };

  async componentDidMount(): Promise<void> {
    await this.getData();
  }

  componentWillUnmount(): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.setState = (state, callback) => {};
    // ? making sure there are no data leaks
  }

  async getData(): Promise<void> {
    try {
      const { data } = await getMyDrawings();

      const {
        data: { favorites },
      } = await getCurrentUserDetails();

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      data.length
        ? this.setState({ loading: false, drawings: data, favorites })
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

  handleFavorite = async (
    drawingNumber: string | number,
    isAdd = false
  ): Promise<void> => {
    try {
      const { data } = isAdd
        ? await addFavorite(drawingNumber)
        : await removeFavorite(drawingNumber);

      this.setState({
        favorites: data.favorites,
      });
    } catch (error) {
      // console.error(error);
    }
  };

  render(): React.ReactNode {
    const { drawings, loading, favorites } = this.state;

    return (
      <div className="container">
        <PageHeader titleText="Drawing Collection" />
        <div className="my-4 col-12 text-center">
          <h6>Your drawing Collection</h6>

          <div className="row drawingListContainer">
            {drawings.length ? (
              // path={['/:id', '/']}
              <FavoritesContext.Provider value={favorites}>
                <List
                  drawings={drawings}
                  emitDelete={(id: string, i: number) =>
                    this.handleDeleteDrawing(id, i)
                  }
                  emitFavoriteAction={(dNum: string | number, isAdd: boolean) =>
                    this.handleFavorite(dNum, isAdd)
                  }
                />
              </FavoritesContext.Provider>
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
    );
  }
}

export default MyDrawings;
