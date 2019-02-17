import React from 'react';

import LoginFormField from './LoginFormField';
import LoginFormButton from './LoginFormButton/';
import { classNames } from '../../utilities';

import './LoginForm.scss';

// TODO: PASSWORD SHOULD BE ENCODED

type InputEvent = React.ChangeEvent<HTMLInputElement>;

interface State {
  isMinified: boolean;
  login: string;
  password: string;
}

class LoginForm extends React.Component {
  state: State = {
    isMinified: true,
    login: '',
    password: '',
  };

  // to keep login data or not to keep? (login: '', password: '' below)
  onToggleExpand = () => {
    this.setState(
      (prevState: State) => {
        return {
          isMinified: !prevState.isMinified,
          login: '',
          password: '',
        };
      },
      () =>
        !this.state.isMinified
          ? window.addEventListener('click', this.hideWhenClickSomewhereElse)
          : window.removeEventListener('click', this.hideWhenClickSomewhereElse)
    );
  };

  hideWhenClickSomewhereElse: EventListener = (e: Event): void => {
    e.cancelBubble = true;

    const target = e.target as HTMLElement;

    console.log(target.className);

    if (!target.className.includes('form')) {
      this.onToggleExpand();
    }
  };

  onInputChange = (e: InputEvent): void => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  render() {
    const { isMinified, login, password } = this.state;

    return (
      <div
        className={classNames('login-form', {
          'login-form--minified': isMinified,
        })}
      >
        <LoginFormButton
          label={isMinified ? 'Sign in' : 'X'}
          onClick={this.onToggleExpand}
          flat={!isMinified}
          style={{ justifySelf: 'flex-end' }}
        />

        {!isMinified && (
          <React.Fragment>
            <LoginFormField
              type="text"
              name="login"
              label="Username"
              value={login}
              onChange={this.onInputChange}
            />
            <LoginFormField
              type="password"
              name="password"
              label="Password"
              value={password}
              onChange={this.onInputChange}
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default LoginForm;
