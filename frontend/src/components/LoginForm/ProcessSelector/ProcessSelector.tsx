import React from 'react';

import { Process } from '../process.type';
import { getProcessName } from '../helpers';
import { classNames } from '../../../utilities';

import './ProcessSelector.scss';

type Props = {
  process: Process;
  onProcessSelect: (process: Process) => void;
};

export const ProcessSelector = ({ process, onProcessSelect }: Props) => {
  const processes: Process[] = ['signIn', 'register'];
  if (process === 'resetPassword') {
    processes.push('resetPassword');
  }

  return (
    <div className="process-select">
      {processes.map((proc, idx) => (
        <span
          className={classNames('process-select__process', {
            'process-select__process--selected': proc === process,
          },
          {
            'process-select__process--reset-pass': proc === 'resetPassword'
          })}
          key={`proc-${process}-${idx}`}
          onClick={() => (proc !== process ? onProcessSelect(proc) : null)}
        >
          {getProcessName(proc).toUpperCase()}
        </span>
      ))}
    </div>
  );
};