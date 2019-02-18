import React from 'react';

import { classNames } from '../../../utilities';

import './LoginFormButton.scss';

type Props = {
  label: string;
  flat?: boolean;
};

const LoginFormButton = ({
  label = 'Button',
  flat = false,
  ...buttonProps
}: React.HTMLProps<HTMLButtonElement> & Props) => {
  return (
    <button
      className={classNames('form-button', { 'form-button--flat': flat })}
      {...buttonProps}
    >
      {label}
    </button>
  );
};

export default React.memo(LoginFormButton);
