import React from 'react';
import { withRouter } from 'react-router';

import Button from '../../Button';

import './NotFound.scss';

const NotFound = withRouter(({ history }) => {
  return (
    <div className="not-found">
      <h1 className="not-found__headline">Whoops! 404!</h1>
      <h3 className="not-found__message">Seems like URL is not valid</h3>
      <Button
        label="Get to the homepage"
        onClick={() => history.push('/home')}
      />
    </div>
  );
});

export default NotFound;
