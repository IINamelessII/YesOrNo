import React from 'react';

import { Process } from '../process.type';

type Props = {
  process: Process;
  onProcessSelect: (process: Process) => void;
};

export const BottomStatement = React.memo(
  ({ process, onProcessSelect }: Props) => {
    switch (process) {
      case 'signin':
        return (
          <span onClick={() => onProcessSelect('resetpassword')}>
            Forgot password?
          </span>
        );
      case 'signup':
        return (
          <span onClick={() => onProcessSelect('signin')}>
            Already have an account?
          </span>
        );
      default:
        return null;
    }
  },
  ({ process: pr }, { process: newPr }) => pr === newPr
);
