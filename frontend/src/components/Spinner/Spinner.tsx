import React from 'react';

import './Spinner.scss';

type Props = {
  mimicClass?: string;
};

const Spinner = ({ mimicClass = '' }: Props) => {
  return <div className={`${mimicClass} spinner`} />;
};

export default Spinner;
