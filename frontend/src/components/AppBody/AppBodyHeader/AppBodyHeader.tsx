import React from 'react';

import './AppBodyHeader.scss';

// TODO: globalize AppBodyHeader

type Props = {
  label: string;
};

const AppBodyHeader = ({ label }: Props) => {
  return <h1 className="body-header">{label}</h1>;
};

export default AppBodyHeader;
