import React from 'react';
import DjangoReactCSRFToken from 'django-react-csrftoken';

import { yonUser } from '../../services';
import { withCentered } from '../hoc';

import Button from '../Button';
import Input from '../Input';
import LoginFormRegisterPrompt from './LoginFormRegisterPrompt';

import './LoginForm.scss';
import { UserdataContext } from '../../contexts';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

type FieldErrors = {
  login?: boolean | string;
  password?: boolean | string;
  email?: boolean | string;
};

type Props = {
  login?: string;
  password?: string;
  email?: string;
  children?: never;
  onToggleShow?: Function;
  updateProfile?: () => void;
};

type State = {
  login: string;
  password: string;
  email: string;
  errors: FieldErrors;
  registering: boolean;
  canSubmit: boolean;
};

const getInitialState = (props: Props): State => ({
  login: props.login || '',
  password: props.password || '',
  email: props.email || '',
  registering: !!props.email || false,
  canSubmit: false,
  errors: {},
});

// TODO: IMPLEMENT SERVER RESPONSE ERRORS WHEN SUBMITTING LOGIN DATA

class LoginForm extends React.Component<Props, State> {
  state: State = getInitialState(this.props);

  onInputChange = (e: InputEvent): void => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;

    const errors: FieldErrors = {};

    switch (name) {
      case 'login':
        errors.login = false;
        break;
      case 'password':
        errors.password = value
          ? this.state.registering && (value.length < 8 ? 'Too short' : false)
          : false;
        break;
      case 'email':
        errors.email = value ? !/^[\w.+-]+@[\w-]+\.\w{2,}$/.test(value) : false;
        break;
    }

    this.setState(
      (prevState): State => ({
        ...prevState,
        [name]: value,
        errors: { ...prevState.errors, ...errors },
      }),
      () =>
        this.setState((prevState) => ({
          canSubmit: this.allInputsValid(prevState),
        }))
    );
  };

  allInputsValid = (stateObj: State = this.state): boolean => {
    const { login, password, email, registering, errors } = stateObj;

    return (
      !!login &&
      !errors.login &&
      (!!password && !errors.password) &&
      (!registering || (!!email && !errors.email))
    );
  };

  toggleRegistration = () => {
    this.setState(
      ({ registering }) => ({ registering: !registering }),
      () =>
        this.setState((prevState) => ({
          canSubmit: this.allInputsValid(prevState),
        }))
    );
  };

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { login, password, email, canSubmit, registering } = this
      .state as State;

    if (canSubmit) {
      const { updateProfile } = this.props;

      (registering
        ? yonUser.register(email, login, password)
        : yonUser.auth(login, password)
      )
        .then(() => {
          this.setState(getInitialState({}));
          updateProfile && updateProfile();
        })
        .catch((err) => console.warn(err));

      // this.props.onToggleShow && this.props.onToggleShow();
    }
  };

  render() {
    const {
      login,
      password,
      email,
      registering,
      canSubmit,
      errors,
    } = this.state;

    const nameOfProcedure = registering ? 'Sign up' : 'Sign in';

    // #region Input Elements
    const usernameInput = (
      <Input
        type="text"
        name="login"
        label="Username"
        error={errors.login}
        value={login}
        onChange={this.onInputChange}
      />
    );

    const passwordInput = (
      <Input
        type="password"
        name="password"
        label="Password"
        error={errors.password}
        value={password}
        onChange={this.onInputChange}
      />
    );

    const emailInput = (
      <Input
        type="text"
        name="email"
        label="Email"
        error={errors.email}
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
        <Button label={nameOfProcedure} flat={!canSubmit} />
        <LoginFormRegisterPrompt
          messages={
            registering
              ? ['Already have an account?', 'Sign in then!']
              : ["Don't have an account yet?", 'Create a new one!']
          }
          onClick={this.toggleRegistration}
        />
        <UserdataContext.Consumer>
          {({ userdata }) =>
            userdata.message && (
              <div className="login-form__error-message">
                {userdata.message}
              </div>
            )
          }
        </UserdataContext.Consumer>
      </form>
    );
  }
}

export default withCentered(LoginForm)((onToggleShow, isShown) => (
  <Button label="Sign in" onClick={onToggleShow} flat={isShown} />
));
