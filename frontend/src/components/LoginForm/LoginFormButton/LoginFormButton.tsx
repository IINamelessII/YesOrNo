import React from 'react';

import { classNames } from '../../../utilities';

import './LoginFormButton.scss';

export interface LoginFormButtonProps {
  label: string;
  flat: boolean;
}

const LoginFormButton = ({
  label = 'Button',
  flat = false,
  ...buttonProps
}: LoginFormButtonProps) => {
  return (
    <button
      className={classNames('form-button', { 'form-button--flat': flat })}
      {...buttonProps}
    >
      {label}
    </button>
  );
};

export default LoginFormButton;
