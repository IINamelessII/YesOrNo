import React from 'react';

import './AppBody.scss';

const AppBody: React.FunctionComponent = ({ children }) => {
  return <div className="app-body">{children}</div>;
};

export default AppBody;
