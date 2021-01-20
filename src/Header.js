import React from 'react';
import './Header.css';
import { Avatar } from '@material-ui/core';

function Header() {
  return (
    <div className="header">
      <div className="header__left">
        <h2>Social</h2>
      </div>
      <div className="header__right">
        <Avatar />
        <h4>Aashish</h4>
      </div>
    </div>
  );
}

export default Header;
