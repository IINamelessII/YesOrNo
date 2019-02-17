import React from 'react';

import Logo from './Logo';
import LoginForm from '../LoginForm';

import './Header.scss';

function Header() {
  return (
    <header className="app-header">
      <Logo />
      <LoginForm />
    </header>
  );
}

export default Header;
