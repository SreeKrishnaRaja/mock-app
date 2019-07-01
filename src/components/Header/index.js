import React from 'react';
import { navigate } from '@reach/router';
import './styles.css';

var login = '/login';

export default function Header(props) {
  if (window.location.pathname === login) {
    return null;
  }

  return (
    <div className="header-wrapper">
      <h1 id="logo" onClick={() => navigate('/')}>Mock-App</h1>
      <nav>
        <ul>
          <li onClick={() => navigate('/')}>Home</li>
          {false && <li>About</li>}
        </ul>
      </nav>
    </div>
  );
}
