import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { loginUser, loginGoogle } from '../../../store/actions';
import logo from '../google.png';
import backgroundImage from '../background.jpg';

const styles = {
  backgroundImage: `url(${backgroundImage})`,
};

class SignIn extends Component {
  state = {
    username: '',
    password: '',
  };

  loginUser = e => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.loginUser(username, password, this.props.history);
  };

  loginGoogle = e => {
    e.preventDefault();
    // this.props.loginGoogle();
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className="signin" style={styles}>
        {/* <img src={background} /> */}
        <div className="signin--box">
          <h1 className="signin--header">Sign In</h1>
          <div className="signin--buttons">
            <button className="signin--buttons__facebook">
              <i className="fab fa-facebook-square" />facebook
            </button>
            <a href="http://localhost:5000/auth/google" onClick={() => this.loginGoogle}>
              <button
                className="signin--buttons__google"
                // onClick={e => this.loginGoogle(e)}
              >
                <img src={logo} alt="google logo" className="signin--buttons__google--logo" />Google
              </button>
            </a>
          </div>
          {this.state.requestError ? <h5>Invalid Email or Password</h5> : null}
          <form className="signin--signin">
            Username:<br />
            <input
              name="username"
              className="signin--signin__username"
              placeholder="Username"
              onChange={this.handleInputChange}
            />
            <br />
            Password
            <br />
            <input
              name="password"
              className="signin--signin__password"
              placeholder="Password"
              onChange={this.handleInputChange}
            />
            <br />
            <input
              className="signin--signin__button"
              type="submit"
              value="Sign In"
              onClick={e => this.loginUser(e)}
            />
          </form>
          <p className="signin--notmember">
            Not a member? <Link to="/signup"> Sign up </Link>
          </p>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     login: state.login,
//   };
// };

export default withRouter(connect(null, { loginUser, loginGoogle })(SignIn));
