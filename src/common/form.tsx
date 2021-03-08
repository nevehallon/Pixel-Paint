import React, { Component, FormEvent } from 'react';
import { toast } from 'react-toastify';

import Joi from 'joi';

import { Input } from '.';

class Form extends Component<{ [x: string]: any }, { [x: string]: any }> {
  schema!: { [key: string]: Joi.StringSchema | Joi.ArraySchema };

  doSubmit!: () => Promise<void>;

  handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const errors = this.validate(true);

    this.setState({ errors: errors || {} });

    if (errors !== null && errors.grid) {
      toast.error('Canvas can not be blank', {
        position: 'top-center',
        autoClose: 2500,
      });
    }

    if (!errors) this.doSubmit();
  };

  validateProperty = (name: string, value: string): string | null => {
    const schema = Joi.object({ [name]: this.schema[name] })!;

    const obj = { [name]: value };

    const { error } = schema.validate(obj, {
      abortEarly: false,
    });
    return error ? error.details[0].message : null;
  };

  validate = (isSubmit = false): any => {
    const {
      state: { formData, grid },
      schema: { drawingName, description },
    } = this;

    const schema: { [key: string]: Joi.StringSchema | Joi.ArraySchema } = {
      drawingName,
      description,
    };
    if (grid && isSubmit) {
      formData.grid = [...grid].filter((x) => x.touched);
      schema.grid = this.schema.grid;
    } else delete formData.grid;

    const { error } = Joi.object(schema)!.validate(formData, {
      abortEarly: false,
    });

    if (!error) return null;

    const errors: { [name: string]: any } = {};

    error.details.forEach(({ path, message }: any) => {
      errors[path[0]] = message;
    });

    return errors;
  };

  handleChange = ({
    target: { value, name },
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const { errors, formData } = this.state;

    // validate input
    const errorsCopy = { ...errors } || {};
    const errorMessage = this.validateProperty(name, value);

    // if (errorMessage) {
    errorsCopy[name] = errorMessage;
    // } else {
    //   delete errorsCopy[name];
    // }

    // formData
    const updatedFormData = { ...formData };
    updatedFormData[name] = value;

    // update state
    this.setState({ formData: updatedFormData, errors: errorsCopy });
  };

  renderInput(name: string, label: string, type = 'text'): React.ReactNode {
    const { formData, errors } = this.state;
    return (
      <Input
        error={errors && errors[name]}
        label={label}
        name={name}
        onChange={this.handleChange}
        type={type}
        value={formData[name]}
      />
    );
  }

  renderButton(label = ''): React.ReactNode {
    return (
      <div className="text-center">
        <button
          className="btn btn-block btn-primary"
          disabled={this.validate()}
          type="submit"
        >
          {label}
        </button>
      </div>
    );
  }
}

export default Form;
