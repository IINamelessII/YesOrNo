import React from 'react';
import { classNames } from '../../../utilities';

import './LoginFormField.scss';

interface LoginFormFieldProps {
  type: 'password' | 'text';
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginFormField = (props: LoginFormFieldProps) => {
  const { value, label, onChange, type } = props;

  return (
    <label
      className={classNames('login-form__field', {
        'login-form__field--not-empty': value,
      })}
    >
      <span className="login-form__field__label">{label}</span>
      <input
        type={type}
        className="login-form__field__input"
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

export default LoginFormField;
