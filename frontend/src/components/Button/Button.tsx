import React from 'react';

import { classNames } from '../../utilities';

import './Button.scss';

type Props = {
  label: string;
  flat?: boolean;
  secondary?: boolean;
};

const Button = ({
  label = 'Button',
  flat,
  secondary,
  className = '',
  ...buttonProps
}: React.HTMLProps<HTMLButtonElement> & Props) => {
  return (
    <button
      className={classNames(
        'button',
        { 'button--flat': flat },
        { 'button--secondary': secondary },
        className
      )}
      {...buttonProps}
    >
      {label}
    </button>
  );
};

export default Button;
