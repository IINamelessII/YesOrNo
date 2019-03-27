import React, { useContext } from 'react';

import { UserdataContext } from '../../contexts';
import { yonUser } from '../../services';

import Button from '../Button';
import Logo from './Logo';
import LoginForm from '../LoginForm';

import './Header.scss';

// TODO: move user sign in logics to loginform

const Header = () => {
  const { userdata, updateProfile } = useContext(UserdataContext);

  const onSignout = () => yonUser.logout().then(() => updateProfile());

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
          <LoginForm showAsPopup />
        )}
      </div>
    </header>
  );
};

export default Header;
