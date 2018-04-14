import React, { Component } from 'react';
import './SignUp.css';
import logo from './google.png';

class SignUp extends Component {
  state = {};
  render() {
    return (
      <div className="signin">
        <div className="signin--box">
          <h1 className="signin--header">Sign in With</h1>
          <div className="signin--buttons">
            <button className="signin--buttons__facebook">
              <i className="fab fa-facebook-square" />facebook
            </button>
            <button className="signin--buttons__google">
              <img
                src={logo}
                alt="google logo"
                className="signin--buttons__google--logo"
              />Google
            </button>
          </div>
          <form className="signin--signin">
            Username:<br />
            <input className="signin--signin__username" placeholder="Username" />
            <br />
            Password
            <br />
            <input className="signin--signin__password" placeholder="Password" />
            <br />
            <input className="signin--signin__button" type="submit" value="Sign In" />
          </form>
          <p className="signin--notmember"> Not a member? Sign up now</p>
        </div>
      </div>
    );
  }
}

export default SignUp;
