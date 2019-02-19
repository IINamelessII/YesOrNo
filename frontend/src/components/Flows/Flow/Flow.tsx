import React from 'react';

import { classNames } from '../../../utilities';

import './Flow.scss';

type Props = {
  label: string;
  selected?: boolean;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
};

const Flow = ({ label, selected, onClick }: Props) => (
  <div
    className={classNames('flows__flow', {
      'flows__flow--selected': selected,
    })}
    onClick={onClick}
  >
    {label}
  </div>
);

export default React.memo(
  Flow,
  ({ selected }, props) => selected === props.selected
);
