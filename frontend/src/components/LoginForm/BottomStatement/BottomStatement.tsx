import React from 'react';

import { Process } from '../process.type';

import './BottomStatement.scss';

type Props = {
  process: Process;
  onProcessSelect: (process: Process) => void;
};

export const BottomStatement = ({ process, onProcessSelect }: Props) => {
  return (
    <div className="bottom-statement">
      {process === 'signIn' ? (
        <div
          className="bottom-statement__phrase"
          onClick={() => onProcessSelect('resetPassword')}
        >
          Forgot password?
        </div>
      ) : process === 'register' ? (
        <div
          className="bottom-statement__phrase"
          onClick={() => onProcessSelect('signIn')}
        >
          Already have an account?
        </div>
      ) : null}
    </div>
  );
};
