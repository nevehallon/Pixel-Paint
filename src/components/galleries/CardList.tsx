import { useRouteMatch } from 'react-router-dom';

import Card from './Card';

export const List = ({
  drawings,
  emitDelete,
  emitFavoriteAction,
}: {
  drawings: any;
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

export const FavoritesList = ({
  drawings,
  emitFavoriteAction,
}: {
  drawings: any;
  emitFavoriteAction: (dNum: string | number, isAdd: boolean) => void;
}): any => {
  const match: any = useRouteMatch('/my-favorites/:id');

  return (
    <ul className="d-card-list">
      {drawings.map((drawing: any) => (
        <Card
          isSelected={match?.params.id === drawing._id}
          {...drawing}
          key={drawing._id}
          onFavoriteAction={(isAdd: boolean) => {
            emitFavoriteAction(drawing.drawingNumber, isAdd);
          }}
        />
      ))}
    </ul>
  );
};

export default { List, FavoritesList };
