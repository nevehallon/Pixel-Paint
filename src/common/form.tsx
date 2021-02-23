import React, { Component, FormEvent } from 'react';

import Joi from 'joi';

import { Input } from '.';

class Form extends Component<{ [x: string]: any }, { [x: string]: any }> {
  schema: Joi.ObjectSchema<any> | any;

  handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const errors = this.validate();

    this.setState({ errors: errors || {} });
  };

  validateProperty = (name: string, value: string): string | null => {
    const schema = Joi.object({ [name]: this.schema[name] })!;

    const obj = { [name]: value };

    /*
    schema = Joi.object({
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } })
      .min(5),
    password: Joi.string().required().min(6),
    name: Joi.string().required().min(2),
  }); */

    const { error } = schema.validate(obj, {
      abortEarly: false,
    });
    return error ? error.details[0].message : null;
  };

  validate = (): any => {
    const {
      state: { formData },
      schema,
    } = this;

    const { error } = schema!.validate(formData, {
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
          type="button"
        >
          {label}
        </button>
      </div>
    );
  }
}

export default Form;
