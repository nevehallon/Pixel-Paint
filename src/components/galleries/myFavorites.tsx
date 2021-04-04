import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// import DrawingCard from '../../common/drawingCard';
import PageHeader from '../../common/pageHeader';
import FavoritesContext from '../../services/favoritesContext';
import {
  addFavorite,
  getCurrentUserDetails,
  getDrawingsFromAllUsers,
  removeFavorite,
} from '../../services/userService';
import { FavoritesList } from './CardList';

import './styles.scss';

interface MyDrawingsState {
  drawings: any[];
  favorites: any[];
  loading: boolean;
  // [x: string]: any;
}

class MyFavorites extends Component {
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
      const {
        data: { favorites },
      } = await getCurrentUserDetails();

      const { data } = await getDrawingsFromAllUsers(favorites);
      console.log(data);

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      data.length
        ? this.setState({ loading: false, drawings: data, favorites })
        : this.setState({ loading: false, drawings: [] });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  handleFavorite = async (
    drawingNumber: string | number,
    isAdd = false
  ): Promise<void> => {
    const { drawings } = this.state;
    try {
      const { data } = isAdd
        ? await addFavorite(drawingNumber)
        : await removeFavorite(drawingNumber);

      this.setState({
        favorites: data.favorites,
        drawings: [...drawings].filter(
          (x) => x.drawingNumber !== drawingNumber
        ),
      });
    } catch (error) {
      // console.error(error);
    }
  };

  render(): React.ReactNode {
    const { drawings, loading, favorites } = this.state;

    return (
      <div className="container">
        <PageHeader titleText="Favorite Drawing Collection" />
        <div className="my-4 col-12 text-center">
          <h6>Your Favorites</h6>

          <div className="row drawingListContainer">
            {drawings.length ? (
              // path={['/:id', '/']}
              <FavoritesContext.Provider value={favorites}>
                <FavoritesList
                  drawings={drawings}
                  emitFavoriteAction={(dNum: string | number, isAdd: boolean) =>
                    this.handleFavorite(dNum, isAdd)
                  }
                />
              </FavoritesContext.Provider>
            ) : (
              <div className={`mx-auto ${loading ? 'text-info' : ''}`}>
                {loading ? 'LOADING' : 'No favorites yet'}...
              </div>
            )}
          </div>
          {/* <Link className="btn btn-info mt-2" to="/create-drawing">
            Create a new drawing
          </Link>
          // TODO: link to drawing browser
          */}
        </div>
      </div>
    );
  }
}

export default MyFavorites;
