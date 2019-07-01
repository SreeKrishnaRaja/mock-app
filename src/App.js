import React, { useState } from 'react';
import './App.css';

import Home from './containers/Home';
import Login from './containers/Login';
import { Router } from "@reach/router";

function App() {
  const [userData, setUserData] = useState({ username: '', email: '' });
  return (
    <div className="App">
      <Router>
        <Login path="/login" setUserData={setUserData} userData={userData} />
        <Home path="/" userData={userData} />
        <Home path="/post/:id" userData={userData} />
      </Router>
    </div>
  );
}

export default App;
