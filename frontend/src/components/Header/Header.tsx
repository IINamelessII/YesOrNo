import React from 'react';

import Logo from './Logo';
import LoginFormTrigger from '../LoginForm';

import './Header.scss';

const Header = () => {
  return (
    <header className="app-header">
      <Logo />

      <LoginFormTrigger showAsPopup />
    </header>
  );
};

export default Header;
