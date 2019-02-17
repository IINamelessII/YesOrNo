import React from 'react';

import Logo from './Logo';
import LoginForm from '../LoginForm';

import './Header.scss';

const Header = () => {
  return (
    <header className="app-header">
      <Logo />
      <LoginForm centered />
    </header>
  );
};

export default Header;
