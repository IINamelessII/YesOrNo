import React from 'react';
import DjangoReactCSRFToken from 'django-react-csrftoken';

import Button from '../Button';
import LoginFormField from './LoginFormField';
import LoginFormRegisterPrompt from './LoginFormRegisterPrompt';

import withCentered from '../hoc/withCentered';

import './LoginForm.scss';

// TODO: PASSWORD SHOULD BE ENCODED

type InputEvent = React.ChangeEvent<HTMLInputElement>;

type Props = {
  login?: string;
  password?: string;
  email?: string;
  children?: never;
  onToggleShow?: Function;
};

type State = {
  login: string;
  password: string;
  email: string;
  registering: boolean;
  canSubmit: boolean;
};

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
    const usernameInput = (
      <LoginFormField
        type="text"
        name="login"
        label="Username"
        value={login}
        onChange={this.onInputChange}
      />
    );

    const passwordInput = (
      <LoginFormField
        type="password"
        name="password"
        label="Password"
        value={password}
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
      <form className="login-form" onSubmit={this.onSubmit}>
        <DjangoReactCSRFToken />

        <h2 className="login-form__splash">{nameOfProcedure}</h2>
        <div className="login-form__fields">
          {registering && emailInput}
          {usernameInput}
          {passwordInput}
        </div>
        <Button label={nameOfProcedure} />
        <LoginFormRegisterPrompt
          messages={
            registering
              ? ['Already have an account?', 'Sign in then!']
              : ["Don't have an account yet?", 'Create a new one!']
          }
          onClick={this.toggleRegistration}
        />
      </form>
    );
  }
}

export default withCentered(LoginForm)((onToggleShow, isShown) => (
  <Button label="Sign in" onClick={onToggleShow} flat={isShown} />
));
