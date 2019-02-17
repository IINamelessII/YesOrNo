import React from 'react';

import LoginFormField from './LoginFormField';
import LoginFormButton from './LoginFormButton';
import withCentered from '../hoc/withCentered';
import { classNames } from '../../utilities';

import './LoginForm.scss';

// TODO: PASSWORD SHOULD BE ENCODED

type InputEvent = React.ChangeEvent<HTMLInputElement>;

interface Props {
  login?: string;
  password?: string;
  children?: never;
}

interface State {
  login: string;
  password: string;
}

const getInitialState = (props: Props) => ({
  login: props.login || '',
  password: props.password || '',
});

class LoginForm extends React.Component<Props, State> {
  state: State = getInitialState(this.props);

  onInputChange = (e: InputEvent): void => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;

    this.setState((prevState) => ({ ...prevState, [name]: value }));
  };

  render() {
    const { login, password } = this.state;

    // #region Input Components
    const passwordInput = (
      <LoginFormField
        type="password"
        name="password"
        label="Password"
        value={password}
        onChange={this.onInputChange}
      />
    );

    const loginInput = (
      <LoginFormField
        type="text"
        name="login"
        label="Username"
        value={login}
        onChange={this.onInputChange}
      />
    );
    // #endregion

    return (
      <form className="login-form">
        {loginInput}
        {passwordInput}
      </form>
    );
  }
}

export default withCentered(LoginForm)((onToggleShow, isShown) => (
  <LoginFormButton label="Sign in" onClick={onToggleShow} flat={isShown} />
));
