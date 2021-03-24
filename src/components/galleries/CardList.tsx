import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

import Card from './Card';

export const List = ({
  drawings,
  favorites,
  emitDelete,
  emitFavoriteAction,
}: {
  drawings: any;
  favorites: any[];
  emitDelete: (id: string, i: number) => void;
  emitFavoriteAction: (dNum: string | number, isAdd: boolean) => void;
}): any => {
  const match: any = useRouteMatch('/my-drawings/:id');

  return (
    <ul className="d-card-list">
      {drawings.map((drawing: any, i: number) => (
        <Card
          isSelected={match?.params.id === drawing._id}
          {...drawing}
          favorites={favorites}
          key={drawing._id}
          onDelete={() => emitDelete(drawing._id, i)}
          onFavoriteAction={(isAdd: boolean) =>
            emitFavoriteAction(drawing.drawingNumber, isAdd)
          }
        />
      ))}
    </ul>
  );
};

export default List;
