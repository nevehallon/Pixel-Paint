import { useHistory } from 'react-router-dom';

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

import { DrawingProps } from '../interfaces/DrawingProps';

const DrawingCard = ({
  _id,
  drawingName,
  description,
  dataUrl,
  onDelete,
}: DrawingProps): any => {
  const history = useHistory();
  const header = (
    <img
      alt="drawing thumbnail"
      loading="lazy"
      onError={(e) => {
        (e.target as any).src =
          'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png';
      }}
      src={dataUrl}
      width="100%"
    />
  );
  const footer = (
    <span className="p-fluid">
      <Button
        className="p-button-rounded p-button-text p-button-lg d-inline-block"
        icon="pi pi-pencil"
        label="Edit"
        onClick={() => history.push(`./edit/${_id}`)}
      />
      <Button
        className="p-button-rounded p-button-text p-button-danger p-button-lg d-inline-block"
        icon="pi pi-trash"
        label="Delete"
        onClick={onDelete}
      />
    </span>
  );
  return (
    <Card
      className="my-4 mx-auto"
      footer={footer}
      header={header}
      style={{ width: '25em' }}
      title={drawingName}
    >
      <p className="p-m-0" style={{ lineHeight: '1.5' }}>
        {description}
      </p>
    </Card>
  );
};

export default DrawingCard;
