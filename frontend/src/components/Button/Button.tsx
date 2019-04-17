import React from 'react';

import { classNames } from '../../utilities';

import './Button.scss';

type StyleProps = {
  flat?: boolean;
  secondary?: boolean;
  small?: boolean;
  large?: boolean;
};

type Props = {
  label: string;
} & StyleProps;

const Button = React.memo(
  ({
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
  }
);

type ContentButtonProps = StyleProps;

export const ContentButton = ({
  children = 'Button',
  flat,
  secondary,
  small,
  large,
  className = '',
  ...buttonProps
}: React.HTMLProps<HTMLDivElement> & ContentButtonProps) => {
  return (
    <div
      className={classNames(
        'content-button',
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
