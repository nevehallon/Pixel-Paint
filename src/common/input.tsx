/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';

import { Divider } from 'primereact/divider';
import { Password } from 'primereact/password';

import { InputProps } from '../interfaces/InputProps';

const Input = ({ name, label, error, ...rest }: InputProps): any => {
  const [value, setValue] = useState('');
  const header = <h6>Pick a password</h6>;
  const footer = (
    <>
      <Divider />
      <p className="p-mt-2">Suggestions</p>
      <ul className="p-pl-2 p-ml-2 p-mt-0" style={{ lineHeight: '1.5' }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </>
  );
  return (
    <div className="form-group">
      {rest.type === 'password' ? (
        <span className="p-float-label">
          <Password
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
        <>
          <label htmlFor={name}>{label}</label>
          <input
            className="form-control"
            id={name}
            name={name}
            type="text"
            {...rest}
          />
        </>
      )}
      {error && <span className="text-danger">{error}</span>}
    </div>
  );
};

export default Input;
