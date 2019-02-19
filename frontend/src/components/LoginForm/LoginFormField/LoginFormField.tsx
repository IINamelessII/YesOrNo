import React from 'react';

import { classNames } from '../../../utilities';

import './LoginFormField.scss';

type Props = {
  label: string;
  value: string;
  name: string;
  type: 'password' | 'text';
  error?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const LoginFormField = ({
  label,
  value,
  name,
  type,
  error = false,
  onChange,
  ...otherProps
}: React.HTMLProps<HTMLInputElement> & Props) => {
  return (
    <label
      className={classNames(
        'form-field',
        {
          'form-field--not-empty': !!value,
        },
        {
          'form-field--error': error,
        }
      )}
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
      {error && (
        <div className="form-field__error-message">Invalid {name}!</div>
      )}
    </label>
  );
};

export default React.memo(
  LoginFormField,
  (prevProps: Props, nextProps: Props) => prevProps.value === nextProps.value
);
