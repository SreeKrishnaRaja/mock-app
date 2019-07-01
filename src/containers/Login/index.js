import React from 'react';
import { navigate } from '@reach/router';
import './styles.css';
import axios from '../../config/axios.js';

export default class Login extends React.PureComponent {

  state = {
    username: '',
    password: '',
    cnfmpwd: '',
    email: '',
    loginUsername: '',
    loginPassword: '',
    focus: null,
    active: 'signup',
    error: {},
    inProgress: false
  }

  handleChange = (e, type) => {
    switch(type) {
      case 'username':
        this.setState({ username: e.target.value });
        break;
      case 'email':
        this.setState({ email: e.target.value });
        break;
      case 'password':
        this.setState({ password: e.target.value });
        break;
      case 'cnfmpwd':
        this.setState({ cnfmpwd: e.target.value });
        break;
      case 'loginUsername':
        this.setState({ loginUsername: e.target.value });
        break;
      case 'loginPassword':
        this.setState({ loginPassword: e.target.value });
        break;
      default:
        break;
    }
    if (Object.values(this.state.error).length > 0) {
      this.setState({ error: {} });
    }
  }

  handleFocus = (focus) => {
    this.setState({ focus });
  }

  handleBlur = () => {
    this.setState({ focus: null });
  }

  handleLabelClick = (type) => {
    document.getElementById(type).click();
  }

  toggleActive = () => {
    this.setState({ active: this.state.active === 'login' ? 'signup' : 'login' });
  }

  submitLogin = (event) => {
    event.preventDefault();
    const savedThis = this;
    const {
      loginUsername,
      loginPassword
    } = this.state;
    let error = {};
    if (loginUsername.length < 4) {
      error.loginUsername = 'Username should be atleast 4 characters.';
    }
    if (loginPassword.length < 6) {
      error.loginPassword = 'Password should be atleast 6 characters.';
    }
    if (Object.values(error).length === 0) {
      this.setState({ inProgress: true });
      axios.post('/login', {
        username: loginUsername,
        password: loginPassword
      })
      .then(function (response) {
        return response.data.body;
      })
      .then(function (response) {
        localStorage.setItem('token', response.token);
        savedThis.props.setUserData({ username: response.username, email: response.token, inProgress: false });
        navigate('/');
      })
      .catch(function (error) {
        savedThis.loginFailed();
      });
    } else {
      this.setState({ error });
    }
  }

  submitSignUp = (event) => {
    event.preventDefault();
    const savedThis = this;
    const {
      username,
      email,
      password,
      cnfmpwd,
    } = this.state;
    let error = {};
    if (username.length < 4) {
      error.username = 'Username should be atleast 4 characters.';
    }
    if (password.length < 6) {
      error.password = 'Password should be atleast 6 characters.';
    }
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
      error.email = 'Email should be vaild.';
    }
    if (password !== cnfmpwd) {
      error.cnfmpwd = 'Password and Confirm Password should be the same.';
    }
    if (Object.values(error).length === 0) {
      this.setState({ inProgress: true });
      axios.post('/sign-up', {
        username: username,
        password: password,
        email: email
      })
      .then(function (response) {
        return response.data.body;
      })
      .then(function (response) {
        localStorage.setItem('token', response.token);
        savedThis.props.setUserData({ username: response.username, email: response.token, inProgress: false });
        navigate('/');
      })
      .catch(function (err) {
        savedThis.signUpFailed();
      });
    } else {
      this.setState({ error });
    }
  }

  clear = (event) => {
    event.preventDefault()
    this.setState({
      username: '',
      password: '',
      cnfmpwd: '',
      email: '',
      loginUsername: '',
      loginPassword: '',
      focus: null,
      inProgress: false,
      error: {}
    });
  }

  signUpFailed = () => {
    this.setState({
      username: '',
      password: '',
      cnfmpwd: '',
      email: '',
      loginUsername: '',
      loginPassword: '',
      focus: null,
      inProgress: false,
      error: { message: 'Sign-up failed' }
    });
  }

  loginFailed = () => {
    this.setState({
      username: '',
      password: '',
      cnfmpwd: '',
      email: '',
      loginUsername: '',
      loginPassword: '',
      focus: null,
      inProgress: false,
      error: { message: 'Login failed, Please check username and password' }
    });
  }

  render() {
    const {
      username,
      email,
      password,
      cnfmpwd,
      focus,
      loginUsername,
      loginPassword,
      active,
      error,
      inProgress
    } = this.state;
    console.log(this.state.error);
    return(
      <div className="login-wrapper">
        <div className="login-container">
          <div className="sub-container">
            <div className="tab-wrapper">
              <div className={`tab ${active === 'signup' ? 'active' : ''}`} onClick={this.toggleActive}>Sign Up</div>
              <div className={`tab ${active === 'login' ? 'active' : ''}`} onClick={this.toggleActive}>Login</div>
            </div>
            <h4 className="sub-header">{active === 'login' ? 'Login' :'Sign Up'}</h4>
            {active === 'signup' && <form>
              <div className="input-wrapper">
                <label
                  htmlFor="username"
                  className={`${username.length > 0 || focus === 'username' ? '' : 'unempty'}`}
                  onClick={() => this.handleLabelClick('username')}
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  value={username}
                  className={`${error.username ? 'invalid' : ''}`}
                  onChange={(e) => this.handleChange(e, 'username')}
                  onFocus={() => this.handleFocus('username')}
                  onBlur={this.handleBlur}
                />
                {error.username && <p className="input-error">{error.username}</p>}
              </div>
              <div className="input-wrapper">
                <label
                  htmlFor="email"
                  className={`${email.length > 0 || focus === 'email' ? '' : 'unempty'}`}
                  onClick={() => this.handleLabelClick('email')}
                >
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  value={email}
                  className={`${error.email ? 'invalid' : ''}`}
                  onChange={(e) => this.handleChange(e, 'email')}
                  onFocus={() => this.handleFocus('email')}
                  onBlur={this.handleBlur}
                />
                {error.email && <p className="input-error">{error.email}</p>}
              </div>
              <div className="input-wrapper">
                <label
                  htmlFor="password"
                  className={`${password.length > 0 || focus === 'password' ? '' : 'unempty'}`}
                  onClick={() => this.handleLabelClick('password')}
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  value={password}
                  type="password"
                  className={`${error.password ? 'invalid' : ''}`}
                  onChange={(e) => this.handleChange(e, 'password')}
                  onFocus={() => this.handleFocus('password')}
                  onBlur={this.handleBlur}
                />
                {error.password && <p className="input-error">{error.password}</p>}
              </div>
              <div className="input-wrapper">
                <label
                  htmlFor="cnfmpwd"
                  className={`${cnfmpwd.length > 0 || focus === 'cnfmpwd' ? '' : 'unempty'}`}
                  onClick={() => this.handleLabelClick('cnfmpwd')}
                >
                  Confirm Password
                </label>
                <input
                  id="cnfmpwd"
                  name="cnfmpwd"
                  value={cnfmpwd}
                  type="password"
                  className={`${error.cnfmpwd ? 'invalid' : ''}`}
                  onChange={(e) => this.handleChange(e, 'cnfmpwd')}
                  onFocus={() => this.handleFocus('cnfmpwd')}
                  onBlur={this.handleBlur}
                />
                {error.cnfmpwd && <p className="input-error">{error.cnfmpwd}</p>}
              </div>
              {!inProgress && <div className="input-wrapper">
                <button className="button-primary" type="submit" onClick={this.submitSignUp}>Sign Up</button>
                <button className="button-secondary" type="submit" onClick={this.clear}>Clear</button>
              </div>}
              {inProgress && <div className="input-wrapper">
                <button className="button-disabled" type="submit" onClick={() => {}}>Sign Up</button>
                <button className="button-disabled" type="submit" onClick={() => {}}>Clear</button>
              </div>}
            </form>}
            {active === 'login' && <form className="login-container">
              <div className="input-wrapper">
                <label
                  htmlFor="loginUsername"
                  className={`${loginUsername.length > 0 || focus === 'loginUsername' ? '' : 'unempty'}`}
                  onClick={() => this.handleLabelClick('loginUsername')}
                >
                  Username
                </label>
                <input
                  id="loginUsername"
                  name="loginUsername"
                  value={loginUsername}
                  className={`${error.loginUsername ? 'invalid' : ''}`}
                  onChange={(e) => this.handleChange(e, 'loginUsername')}
                  onFocus={() => this.handleFocus('loginUsername')}
                  onBlur={this.handleBlur}
                />
                {error.loginUsername && <p className="input-error">{error.loginUsername}</p>}
              </div>
              <div className="input-wrapper">
                <label
                  htmlFor="loginPassword"
                  className={`${loginPassword.length > 0 || focus === 'loginPassword' ? '' : 'unempty'}`}
                  onClick={() => this.handleLabelClick('loginPassword')}
                >
                  Password
                </label>
                <input
                  id="loginPassword"
                  name="loginPassword"
                  value={loginPassword}
                  type="password"
                  className={`${error.loginPassword ? 'invalid' : ''}`}
                  onChange={(e) => this.handleChange(e, 'loginPassword')}
                  onFocus={() => this.handleFocus('loginPassword')}
                  onBlur={this.handleBlur}
                />
                {error.loginPassword && <p className="input-error">{error.loginPassword}</p>}
              </div>
              {error.message && <p className="input-error">{error.message}</p>}
              {!inProgress && <div className="input-wrapper">
                <button className="button-primary" onClick={this.submitLogin} type="submit">Login</button>
                <button className="button-secondary" type="submit" onClick={this.clear}>Clear</button>
              </div>}
              {inProgress && <div className="input-wrapper">
                <button className="button-disabled" type="submit" onClick={() => {}}>Login</button>
                <button className="button-disabled" type="submit" onClick={() => {}}>Clear</button>
              </div>}
            </form>}
          </div>
        </div>
      </div>
    );
  }
}
