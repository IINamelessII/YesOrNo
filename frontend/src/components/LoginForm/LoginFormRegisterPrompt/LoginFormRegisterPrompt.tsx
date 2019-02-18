import React from 'react';

import './LoginFormRegisterPrompt.scss';

type Props = {
  messages: Array<string>;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
};

const LoginFormRegisterPrompt = ({
  messages: [first, second],
  onClick,
}: Props) => {
  return (
    <span className="register-prompt">
      <span>{first}</span>
      <span className="register-prompt__action" onClick={onClick}>
        {second}
      </span>
    </span>
  );
};

export default React.memo(
  LoginFormRegisterPrompt,
  ({ messages: [lfirst, lsecond] }, { messages: [nfirst, nsecond] }) =>
    lfirst === nfirst || lsecond === nsecond
);
