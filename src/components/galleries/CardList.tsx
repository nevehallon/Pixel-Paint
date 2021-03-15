import { useRouteMatch } from 'react-router-dom';

import Card from './Card';

export const List = ({
  drawings,
  emitDelete,
}: {
  drawings: any;
  emitDelete: any;
}): any => {
  const match: any = useRouteMatch('/my-drawings/:id');

  return (
    <ul className="card-list">
      {drawings.map((drawing: any, i: number) => (
        <Card
          isSelected={match?.params.id === drawing._id}
          {...drawing}
          key={drawing._id}
          onDelete={() => emitDelete(drawing._id, i)}
        />
      ))}
    </ul>
  );
};

export default List;
