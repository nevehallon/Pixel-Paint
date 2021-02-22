import { Link } from 'react-router-dom';

import { DrawingProps } from '../interfaces/DrawingProps';

const Drawing = ({
  drawing: { _id, drawingName, description },
  onDelete,
}: DrawingProps): any => (
  <div
    className="card col-md-6 col-lg-4 my-4 mx-auto"
    style={{ width: '18rem' }}
  >
    <div className="card-body d-flex justify-content-end flex-column">
      <h5 className="card-title">{drawingName}</h5>
      <p className="card-text">{description}</p>
      <Link className="btn btn-primary" to={`./edit/${_id}`}>
        Edit
      </Link>
      <button className="btn btn-danger my-2" onClick={onDelete} type="button">
        Delete
      </button>
    </div>
  </div>
);

export default Drawing;
