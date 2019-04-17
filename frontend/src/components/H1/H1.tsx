import React from 'react';

import './H1.scss';

const H1 = ({ children }: React.ComponentPropsWithoutRef<any>) => {
  return <h1 className="body-header">{children}</h1>;
};

export default React.memo(H1);
