import React from 'react';

import { Process } from '../process.type';
import { getProcessName } from '../helpers';
import { classNames } from '../../../utilities';

type Props = {
  process: Process;
  onProcessSelect: (process: Process) => void;
};

export const ProcessSelector = React.memo(
  ({ process, onProcessSelect }: Props) => {
    const processes: Process[] = ['signin', 'signup'];
    if (process === 'resetpassword') {
      processes.push('resetpassword');
    }

    return (
      <>
        {processes.map((proc, idx) => (
          <span
            className={classNames(
              'process',
              {
                'process--selected': proc === process,
              },
              {
                'process--reset-pass': proc === 'resetpassword',
              }
            )}
            key={`proc-${process}-${idx}`}
            onClick={() => (proc !== process ? onProcessSelect(proc) : null)}
          >
            {getProcessName(proc).toUpperCase()}
          </span>
        ))}
      </>
    );
  },
  ({ process: pr }, { process: newPr }) => pr === newPr
);
