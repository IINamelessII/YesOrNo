import React from 'react';

import Logo from './Logo';
import { Trigger as LoginFormTrigger } from '../LoginForm';

import './Header.scss';

const Header = () => {
  return (
    <header className="app-header">
      <Logo />

      <LoginFormTrigger />
    </header>
  );
};

export default Header;
