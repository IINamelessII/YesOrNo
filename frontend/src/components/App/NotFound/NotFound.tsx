import React from 'react';
import { withRouter } from 'react-router';

import Button from '../../Button';

import './NotFound.scss';

const NotFound = withRouter(({ history }) => {
  return (
    <div className="not-found">
      <span className="not-found__headline">404!</span>
      <span className="not-found__message">
        Seems like there's no such page!
      </span>
      <Button
        className="not-found__to-home"
        label="Go to the homepage"
        onClick={() => history.push('/home')}
      />
    </div>
  );
});

export default NotFound;
