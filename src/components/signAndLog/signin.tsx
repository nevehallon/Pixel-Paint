import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import Joi from 'joi';

import { Form, PageHeader } from '../../common';
import { getCurrentUser, login } from '../../services/userService';

interface SigninState {
  formData: {
    password: string;
    email: string;
  };
  errors: { [key: string]: any };
}

class Signin extends Form {
  state: SigninState = {
    formData: {
      password: '',
      email: '',
    },
    errors: {},
  };

  schema = {
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } })
      .min(5)
      .label('Email'),
    password: Joi.string().required().min(6).label('Password'),
  };

  componentDidMount(): void {
    if (getCurrentUser()) return;
    localStorage.clear();
  }

  doSubmit = async (): Promise<void> => {
    // eslint-disable-next-line prefer-const
    let { errors, formData } = this.state;

    try {
      await login(formData);
      setTimeout(() => {
        window.location.href = '/';
      }, 2200);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data, {
          position: 'top-center',
          autoClose: error.response.data.length * 65,
        });
        errors = { name: '', password: '', email: '' };

        // prettier-ignore
        (errors as any)[error.response.data.split('"')[1]] = error.response.data;

        this.setState({ errors, formData });
      }
    }
  };

  render(): React.ReactNode {
    if (getCurrentUser()) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container">
        <PageHeader titleText="Sign in with your PixelPaint account" />
        <div className="row text-center">
          <div className="col-12">
            <p>You can open a new account for free</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 m-auto">
            <form noValidate onSubmit={this.handleSubmit}>
              {this.renderInput('email', 'Email', 'email')}
              {this.renderInput('password', 'Password', 'password')}
              {this.renderButton('Sign In')}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;
