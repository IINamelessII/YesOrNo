import React from 'react';

import LoginFormField from './LoginFormField';
import LoginFormButton from './LoginFormButton';
import LoginFormRegisterPrompt from './LoginFormRegisterPrompt';

import withCentered from '../hoc/withCentered';

import './LoginForm.scss';

// TODO: PASSWORD SHOULD BE ENCODED

type InputEvent = React.ChangeEvent<HTMLInputElement>;

interface Props {
  login?: string;
  password?: string;
  email?: string;
  children?: never;
  onToggleShow?: Function;
}

interface State {
  login: string;
  password: string;
  email: string;
  registering: boolean;
  canSubmit: boolean;
}

const getInitialState = (props: Props): State => ({
  login: props.login || '',
  password: props.password || '',
  email: props.email || '',
  registering: !!props.email || false,
  canSubmit: false,
});

class LoginForm extends React.Component<Props, State> {
  state: State = getInitialState(this.props);

  onInputChange = (e: InputEvent): void => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;

    this.setState(
      (prevState): State => ({
        ...prevState,
        [name]: value,
        canSubmit: this.inputValid(prevState),
      })
    );
  };

  inputValid = (stateObj: State = this.state): boolean => {
    const { login, password, email, registering } = stateObj;

    return !!login && !!password && (!registering || !!email);
  };

  toggleRegistration = () => {
    this.setState(({ registering }) => ({ registering: !registering }));
  };

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { login, password, email, canSubmit } = this.state as State;

    if (canSubmit) {
      console.log(
        `SUCCESSFULLY submitted email:${email}, ${login}:${password}`
      );

      this.setState(getInitialState({}));

      this.props.onToggleShow && this.props.onToggleShow();
    }
  };

  render() {
    const { login, password, email, registering } = this.state;

    const nameOfProcedure = registering ? 'Sign up' : 'Sign in';

    // #region Input Elements
    const passwordInput = (
      <LoginFormField
        type="password"
        name="password"
        label="Password"
        value={password}
        onChange={this.onInputChange}
        required
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

    const emailInput = (
      <LoginFormField
        type="text"
        name="email"
        label="Email"
        value={email}
        onChange={this.onInputChange}
      />
    );
    // #endregion

    return (
      <form className="login-form">
        <h2 className="login-form__splash">{nameOfProcedure}</h2>
        <div className="login-form__fields">
          {registering && emailInput}
          {loginInput}
          {passwordInput}
        </div>
        <LoginFormButton label={nameOfProcedure} onClick={this.onSubmit} />
        <LoginFormRegisterPrompt
          messages={
            registering
              ? ['Already have an account?', 'Sign in then!']
              : ['Don\'t have an account yet?', 'Create a new one!']
          }
          onClick={this.toggleRegistration}
        />
      </form>
    );
  }
}

export default withCentered(LoginForm)(
  (onToggleShow: Function, isShown: boolean) => (
    <LoginFormButton label="Sign in" onClick={onToggleShow} flat={isShown} />
  )
);
