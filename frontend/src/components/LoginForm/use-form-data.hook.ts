import { useState, useEffect } from 'react';

import { Process } from './process.type';

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

export const useData = (process: Process = 'signin') => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [errors, setErrors] = useState(initialErrors);
  const [message, setMessage] = useState(null as string | null);
  const [initial, setInitial] = useState(true);

  const calculateErrors = (): boolean => {
    const errors =
      !initial && process === 'signup'
        ? {
            username: username.length === 0 && 'Enter username',
            password: password.length < 8 && 'Too short',
            email: !/^[\w.+-]+@[\w-]+\.\w{2,}$/.test(email),
          }
        : initialErrors;

    setInitial(false);
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
