import React from 'react';

import './Spinner.scss';

type Props = {
  mimicClass?: string;
};

const Spinner = ({ mimicClass = '' }: Props) => {
  return <div className={`loader ${mimicClass}`} />;
};

export default Spinner;
