import React from 'react';

import { classNames } from '../../utilities';

import './Button.scss';

type Props = {
  label: string;
  flat?: boolean;
  secondary?: boolean;
  small?: boolean;
  large?: boolean;
};

const Button = ({
  label = 'Button',
  flat,
  secondary,
  small,
  large,
  className = '',
  ...buttonProps
}: React.HTMLProps<HTMLButtonElement> & Props) => {
  return (
    <button
      className={classNames(
        'button',
        { 'button--flat': flat },
        { 'button--secondary': secondary },
        { 'button--small': small },
        { 'button--large': large },
        className
      )}
      {...buttonProps}
    >
      {label}
    </button>
  );
};

export const ContentButton = ({
  children = 'Button',
  flat,
  secondary,
  small,
  large,
  className = '',
  ...buttonProps
}: React.HTMLProps<HTMLDivElement> & Props) => {
  return (
    <div
      className={classNames(
        'button',
        { 'button--flat': flat },
        { 'button--secondary': secondary },
        { 'button--small': small },
        { 'button--large': large },
        className
      )}
      {...buttonProps}
    >
      {children}
    </div>
  );
};

export default Button;
