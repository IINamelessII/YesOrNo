import React from 'react';

import Logo from './Logo';
import LoginForm from '../LoginForm';

import './Header.scss';
import { ProfileUpdateContext } from '../../contexts';

const Header = () => {
  return (
    <header className="app-header">
      <Logo />
      <ProfileUpdateContext.Consumer>
        {(value) => <LoginForm profileUpdate={value} centered />}
      </ProfileUpdateContext.Consumer>
    </header>
  );
};

export default Header;
