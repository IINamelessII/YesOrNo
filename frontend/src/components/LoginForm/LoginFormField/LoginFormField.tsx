import React from 'react';

import { classNames } from '../../../utilities';

import './LoginFormField.scss';

interface LoginFormFieldProps {
  type: 'password' | 'text';
  name: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginFormField = (props: LoginFormFieldProps) => {
  const { value, label, onChange, type, name, ...otherProps } = props;

  return (
    <label
      className={classNames('form-field', {
        'form-field--not-empty': !!value,
      })}
    >
      <span className="form-field__label">{label}</span>
      <input
        className="form-field__input"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete="off"
        {...otherProps}
      />
    </label>
  );
};

export default LoginFormField;
