import React, { useState, useEffect, useContext } from 'react';
import DjangoReactCSRFToken from 'django-react-csrftoken';
import { withRouter, RouteComponentProps } from 'react-router';

import { yonUser } from '../../services';
import { Process } from './process.type';
import { getProcessName } from './helpers';
import { UserdataContext } from '../../contexts';

import Button from '../Button';
import { InputSection } from './InputSection';
import { BottomStatement } from './BottomStatement';
import { ProcessSelector } from './ProcessSelector';

import './LoginForm.scss';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

type FieldErrors = {
  username: string | boolean;
  password: string | boolean;
  email: string | boolean;
};

const initialErrors: FieldErrors = {
  username: false,
  password: false,
  email: false,
};

const useData = (process: Process) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [errors, setErrors] = useState(initialErrors);
  const [message, setMessage] = useState(null as string | null);

  const calculateErrors = (): boolean => {
    const errors =
      process === 'signup'
        ? {
            username: username.length === 0 && 'Enter username',
            password: password.length < 8 && 'Too short',
            email: !/^[\w.+-]+@[\w-]+\.\w{2,}$/.test(email),
          }
        : initialErrors;

    setErrors(errors);

    return !!(errors.username || errors.password || errors.email);
  };

  const onInputChange = ({ target: { value, name } }: InputEvent) => {
    switch (name) {
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'email':
        setEmail(value);
        break;
    }
  };

  useEffect(() => {
    calculateErrors();
    setMessage(null);
  }, [email, username, password]);

  return {
    values: { username, password, email },
    onInputChange,
    errors,
    calculateErrors,
    message,
    setMessage,
  };
};

type Props = {
  children?: never;
} & RouteComponentProps<{ process?: Process }>;

const LoginForm = ({ match, history }: Props) => {
  const process = match.params.process || 'signin';
  const {
    values,
    onInputChange,
    errors,
    calculateErrors,
    message,
    setMessage,
  } = useData(process);

  const [uploading, setUploading] = useState(false);
  const { userdata, updateProfile } = useContext(UserdataContext);

  const closeForm = () => {
    history.push('/');
  };

  useEffect(() => {
    if (userdata.is_auth) {
      closeForm();
    }
  }, [userdata.is_auth]);

  const blockSubmit =
    uploading ||
    (process === 'signup' &&
      !!(errors.username || errors.password || errors.email));

  const switchProcess = (newProcess: Process) => {
    history.push(`/user/${newProcess}`);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!uploading) {
      const { username, password, email } = values;

      const onActionPerformed = () => {
        updateProfile().then(({ message }) => {
          if (message) {
            setMessage(message);
            setUploading(false);
          }
        });
      };

      switch (process) {
        case 'signin':
          setUploading(true);
          yonUser.auth(username, password).then(onActionPerformed);
          break;
        case 'signup':
          if (!calculateErrors()) {
            setUploading(true);
            yonUser.register(email, username, password).then(onActionPerformed);
          }
          break;
        case 'resetPassword':
          setUploading(true);
          yonUser.resetPassword(email).then(onActionPerformed);
          break;
        default:
          throw 'Something went wrong! (wrong process)';
      }
    }
  };

  return (
    <form className="login-form" onSubmit={onSubmit}>
      <DjangoReactCSRFToken />

      <ProcessSelector process={process} onProcessSelect={switchProcess} />

      <InputSection
        process={process}
        values={values}
        errors={errors}
        onInputChange={onInputChange}
      />

      <Button
        className="login-form__submit"
        label={getProcessName(process)}
        flat={uploading || blockSubmit}
        disabled={uploading || blockSubmit}
      />

      {message && (
        <div
          className={`login-form__message${
            !message.includes('link') ? ' login-form__message--error' : ''
          }`}
        >
          {message}
        </div>
      )}

      <BottomStatement process={process} onProcessSelect={switchProcess} />
    </form>
  );
};

export default withRouter(({ staticContext, children, ...props }) => (
  <LoginForm {...props} />
));
