import React, { useContext } from 'react';
import { withRouter } from 'react-router';

import { yonUser } from '../../../services';
import { UserdataContext } from '../../../contexts';

import Button from '../../Button';

import './Trigger.scss';

export const Trigger = withRouter(({ history, location }) => {
  const { userdata, updateProfile } = useContext(UserdataContext);

  const isInForm = /\/user\//.test(location.pathname);

  const onSignout = () => yonUser.logout().then(() => updateProfile());

  return (
    <div className="login-section">
      {userdata.is_auth ? (
        <>
          <span className="login-section__greeting">{`Hello, ${
            userdata.username
          }!`}</span>
          <Button label="Sign out" onClick={onSignout} flat />
        </>
      ) : (
        <Button
          label="Sign in"
          onClick={() => history.push(isInForm ? '/home' : '/user/signin')}
          flat={isInForm}
        />
      )}
    </div>
  );
});
