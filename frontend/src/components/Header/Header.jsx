import React from 'react';

import Logo from './Logo';
import LoginButton from './LoginButton/LoginButton';

import './Header.scss';

function Header() {
  return (
    <header className="app-header">
      <Logo />
      <LoginButton />
    </header>
  );
}

export default Header;
