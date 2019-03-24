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
  name,
  type = 'text',
  error = false,
  onChange,
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
        className={`input-field__input ${className}`}
        type={type}
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
};

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

export default Input;

// export default React.memo(
//   Input,
//   (prevProps: Props, nextProps: Props) => prevProps.value === nextProps.value
// );
