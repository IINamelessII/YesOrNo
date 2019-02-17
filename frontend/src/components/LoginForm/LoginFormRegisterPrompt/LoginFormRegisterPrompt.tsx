import React from 'react';

import './LoginFormRegisterPrompt.scss';

type Props = {
  messages: Array<string>;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
};

const LoginFormRegisterPrompt = (props: Props) => {
  const {
    messages: [first, second],
    onClick,
  } = props;

  return (
    <span className="register-prompt">
      <span>{first}</span>
      <span className="register-prompt__action" onClick={onClick}>
        {second}
      </span>
    </span>
  );
};

export default LoginFormRegisterPrompt;
