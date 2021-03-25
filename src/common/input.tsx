/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';

import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Password } from 'primereact/password';

import { InputProps } from '../interfaces/InputProps';

const Input = ({ name, label, error, ...rest }: InputProps): any => {
  const [value, setValue] = useState('');
  const header = <h6>Pick a password</h6>;
  const footer = (
    <>
      <Divider />
      <p className="p-mt-2">Requirements</p>
      <div className="p-pl-2 p-ml-2 p-mt-0" style={{ lineHeight: '1.5' }}>
        <span> - Minimum 6 characters</span>
      </div>
    </>
  );

  const { feedback } = rest;

  return (
    <div className="my-4 p-fluid">
      {rest.type === 'password' ? (
        <span className="p-float-label p-field">
          <Password
            feedback={feedback}
            footer={feedback && footer}
            header={feedback && header}
            id={name}
            name={name}
            onInput={(e) => setValue((e.target as HTMLInputElement).value)}
            toggleMask
            value={value}
            {...rest}
          />
          <label htmlFor={name}>{label}</label>
        </span>
      ) : rest.type === 'textarea' ? (
        <span className="p-float-label p-field">
          <InputTextarea
            autoResize
            id={name}
            name={name}
            rows={1}
            /* prettier-ignore */
            {...rest}
          />
          <label htmlFor={name} style={{ width: '90%' }}>
            {label}
          </label>
        </span>
      ) : (
        <span className="p-float-label p-field">
          <InputText
            id={name}
            name={name}
            type="text"
            /* prettier-ignore */
            {...rest}
          />
          <label htmlFor={name} style={{ width: '90%' }}>
            {label}
          </label>
        </span>
      )}
      {error && <span className="text-danger">{error}</span>}
    </div>
  );
};

export default Input;
