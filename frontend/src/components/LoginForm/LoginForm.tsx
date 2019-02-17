import React from 'react';

import LoginFormField from './LoginFormField';

import './LoginForm.scss';
import { classNames } from '../../utilities';

// TODO: PASSWORD SHOULD BE ENCODED

type InputEvent = React.ChangeEvent<HTMLInputElement>;

interface State {
  isExpanded: boolean;
  login: string;
  password: string;
}

class LoginForm extends React.Component {
  state: State = {
    isExpanded: false,
    login: '',
    password: '',
  };

  // to keep login data or not to keep? (login: '', password: '' below)
  onToggleExpand = () => {
    this.setState((prevState: State) => {
      return {
        isExpanded: !prevState.isExpanded,
        login: '',
        password: '',
      };
    });
  };

  onEnterLogin = (e: InputEvent): void => {
    const target = e.target as HTMLInputElement;
    this.setState({ login: target.value });
  };

  onEnterPassword = (e: InputEvent): void => {
    const target = e.target as HTMLInputElement;
    this.setState({ password: target.value });
  };

  render() {
    const { isExpanded, login, password } = this.state;

    return (
      <div
        className={classNames('login-form', {
          'login-form--minified': !isExpanded,
        })}
      >
        <button
          className="login-form__btn login-form__btn--sign-in"
          onClick={this.onToggleExpand}
        >
          Sign in
        </button>

        <LoginFormField
          type="text"
          label="Nickname"
          value={login}
          onChange={this.onEnterLogin}
        />
        <LoginFormField
          type="password"
          label="Password"
          value={password}
          onChange={this.onEnterPassword}
        />
      </div>
    );
  }
}

export default LoginForm;
