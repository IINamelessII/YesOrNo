import React from 'react';

import { classNames } from '../../utilities';

import './Input.scss';

type Props = {
  label: string;
  value: string;
  name: string;
  error?: boolean | string;
};

const Input = ({
  label,
  value,
  type = 'text',
  error = false,
  className,
  ...otherProps
}: React.HTMLProps<HTMLInputElement> & Props) => {
  return (
    <label
      className={classNames(
        'input-field',
        {
          'input-field--not-empty': !!value,
        },
        {
          'input-field--error': error,
        }
      )}
    >
      <span className="input-field__label">{label}</span>
      <input
        className={`input-field__input ${className || ''}`}
        type={type}
        value={value}
        autoComplete="off"
        {...otherProps}
      />
      {error && (
        <div className="input-field__error-message">
          {typeof error === 'boolean' ? `Enter valid ${name}` : error}
        </div>
      )}
    </label>
  );
};

export default React.memo(
  Input,
  (
    { value: val, error: err, className: CN },
    { value: newVal, error: newErr, className: newCN }
  ) => val === newVal && err === newErr && CN === newCN
);

export const Textarea = React.memo(
  ({
    label,
    value,
    name,
    error,
    onChange,
    className,
    ...otherProps
  }: React.HTMLProps<HTMLTextAreaElement> & Props) => {
    return (
      <label
        className={classNames(
          'input-field',
          {
            'input-field--not-empty': !!value,
          },
          {
            'input-field--error': error,
          }
        )}
      >
        <span className="input-field__label">{label}</span>
        <textarea
          className={`input-field__input ${className}`}
          name={name}
          value={value}
          onChange={onChange}
          autoComplete="off"
          {...otherProps}
        />
        {error && (
          <div className="input-field__error-message">
            {typeof error === 'boolean' ? `Enter valid ${name}` : error}
          </div>
        )}
      </label>
    );
  },
  ({ value, error }: Props, nextProps: Props) =>
    value === nextProps.value && error === nextProps.error
);
