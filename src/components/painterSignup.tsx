import React from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import Joi from 'joi';

import { Form, PageHeader } from '../common';
import { apiUrl } from '../config.json';
import httpService from '../services/httpService';
import { getCurrentUser, login } from '../services/userService';

interface PainterSignupState {
  formData: {
    name: string;
    password: string;
    email: string;
  };
  errors: any;
}

class PainterSignup extends Form {
  state: PainterSignupState = {
    formData: {
      name: '',
      password: '',
      email: '',
    },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().min(5),
    password: Joi.string().required().min(6),
    name: Joi.string().required().min(2),
  };

  async doSubmit(): Promise<void> {
    // eslint-disable-next-line prefer-const
    let { errors, formData } = this.state;
    const body = { ...formData, painter: true };

    try {
      await httpService.post(`${apiUrl}/users`, body);

      const { email, password } = body;
      await login({ email, password });

      toast.success('You have successfully registered painter account!!', {
        position: 'top-center',
        autoClose: 2500,
      });

      setTimeout(() => {
        window.location.href = '/create-drawing';
      }, 2500);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data, {
          position: 'top-center',
          autoClose: error.response.data.length * 65,
        });
        errors = { name: '', password: '', email: '' };
        errors[error.response.data.split('"')[1]] = error.response.data;

        this.setState({ errors, formData });
      }
    }
  }

  render(): React.ReactNode {
    if (getCurrentUser()) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container">
        <PageHeader titleText="Painter Registration Form" />
        <div className="row text-center">
          <div className="col-12">
            <p>Open a new painter account</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 m-auto">
            <form noValidate onSubmit={this.handleSubmit}>
              {this.renderInput('email', 'Email', 'email')}
              {this.renderInput('password', 'Password', 'password')}
              {this.renderInput('name', 'Name')}
              {this.renderButton('Next')}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default PainterSignup;
