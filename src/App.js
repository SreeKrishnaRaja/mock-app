import React from 'react';
import logo from './logo.svg';
import './App.css';

import Home from './containers/Home';
import Login from './containers/Login';
import { Router, Link } from "@reach/router";

function App() {
  return (
    <div className="App">
      <Router>
        <Home path="/" />
        <Login path="/login" />
      </Router>
    </div>
  );
}

export default App;
