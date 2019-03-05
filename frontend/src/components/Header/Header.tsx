import React, { useContext } from 'react';

import { ProfileUpdateContext, UserdataContext } from '../../contexts';
import { YonApiService } from '../../services';

import Button from '../Button';
import Logo from './Logo';
import LoginForm from '../LoginForm';

import './Header.scss';

// TODO: move user sign in logics to loginform

const Header = () => {
  const userdata = useContext(UserdataContext);
  const profileUpdate = useContext(ProfileUpdateContext);

  const onSignout = () =>
    new YonApiService().logout().then(() => profileUpdate());

  return (
    <header className="app-header">
      <Logo />
      <div className="app-header__login-section">
        {userdata.is_auth ? (
          <>
            <span>{`Hello, ${userdata.username}!`}</span>
            <Button label="Sign out" onClick={onSignout} flat />
          </>
        ) : (
          <LoginForm profileUpdate={profileUpdate} centered showAsPopup />
        )}
      </div>
    </header>
  );
};

export default Header;
