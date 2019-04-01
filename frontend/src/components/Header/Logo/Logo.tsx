import React from 'react';

import { withRouter, RouteComponentProps } from 'react-router';

import './Logo.scss';

const Logo = ({ history }: RouteComponentProps) => {
  return (
    <div className="logo" onClick={() => history.push('/home')}>
      <div className="logo__icon" />
      <div className="logo__splash">Yes|No</div>
    </div>
  );
};

export default withRouter(Logo);
