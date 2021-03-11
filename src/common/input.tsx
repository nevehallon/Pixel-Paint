/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';

import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

import { InputProps } from '../interfaces/InputProps';

const Input = ({ name, label, error, ...rest }: InputProps): any => {
  const [value, setValue] = useState('');
  const header = <h6>Pick a password</h6>;
  const footer = (
    <>
      <Divider />
      <p className="p-mt-2">Requirements</p>
      <ul className="p-pl-2 p-ml-2 p-mt-0" style={{ lineHeight: '1.5' }}>
        <li>Minimum 6 characters</li>
      </ul>
    </>
  );
  return (
    <div className="form-group pt-2 p-fluid">
      {rest.type === 'password' ? (
        <span className="p-float-label p-field">
          <Password
            // className="form-control"
            footer={footer}
            header={header}
            id={name}
            name={name}
            onInput={(e) => setValue((e.target as HTMLInputElement).value)}
            toggleMask
            value={value}
            {...rest}
          />
          <label htmlFor={name}>{label}</label>
        </span>
      ) : (
        <span className="p-float-label p-field">
          <InputText
            // className="form-control"
            id={name}
            name={name}
            type="text"
            {...rest}
          />
          <label htmlFor={name}>{label}</label>
        </span>
      )}
      {error && <span className="text-danger">{error}</span>}
    </div>
  );
};

export default Input;
