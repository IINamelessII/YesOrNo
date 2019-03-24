import React, { useState, useEffect, useContext } from 'react';
import DjangoReactCSRFToken from 'django-react-csrftoken';

import { withCentered } from '../hoc';
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

type Props = {
  login?: string;
  password?: string;
  email?: string;
  children?: never;
  onToggleShow?: () => void;
  updateProfile?: () => void;
};

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

const useData = () => {
  const [process, setProcess] = useState('signIn' as Process);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [errors, setErrors] = useState(initialErrors);
  const [message, setMessage] = useState(null as string | null);

  const calculateErrors = (): boolean => {
    const errors =
      process === 'register'
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

  const switchProcess = (newProcess: Process) => {
    if (newProcess !== process) {
      setProcess(newProcess);
      setErrors(initialErrors);
    }
  };

  useEffect(() => {
    calculateErrors();
    setMessage(null);
  }, [email, username, password]);

  return {
    process,
    switchProcess,
    values: { username, password, email },
    onInputChange,
    errors,
    calculateErrors,
    message,
    setMessage,
  };
};

const LoginForm = ({  }: Props) => {
  const {
    process,
    switchProcess,
    values,
    onInputChange,
    errors,
    calculateErrors,
    message,
    setMessage,
  } = useData();
  const [uploading, setUploading] = useState(false);
  const { updateProfile } = useContext(UserdataContext);

  const blockSubmit =
    uploading ||
    (process === 'register' &&
      !!(errors.username || errors.password || errors.email));

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
        case 'signIn':
          setUploading(true);
          yonUser.auth(username, password).then(onActionPerformed);
          break;
        case 'register':
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

export default withCentered(LoginForm)((onToggleShow, isShown) => (
  <Button label="Sign in" onClick={onToggleShow} flat={isShown} />
));
