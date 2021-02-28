/* eslint-disable react/jsx-props-no-spreading */
import { InputProps } from '../interfaces/InputProps';

const Input = ({ name, label, error, ...rest }: InputProps): any => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <input
      className="form-control"
      id={name}
      name={name}
      type="text"
      {...rest}
    />
    {error && <span className="text-danger">{error}</span>}
  </div>
);

export default Input;
