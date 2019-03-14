import React from 'react';

import './H2.scss';

type Props = {
  label: string;
};

const H2 = ({ label }: Props) => {
  return <h1 className="body-header">{label}</h1>;
};

export default H2;
