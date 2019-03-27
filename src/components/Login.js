import React from "react";
import { Link } from "react-router-dom";
import AuthApiService from "../services/auth-api-service";
import TokenService from "../services/token-service";
import "./Login.css";

export default class Login extends React.Component {
  state = {
    userName: "",
    password: "",
    error: null
  };
  handleLoginChange = e => {
    const stateProperty = e.target.className;
    this.setState({ [stateProperty]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ error: null });

    AuthApiService.postLogin({
      user_name: this.state.userName,
      password: this.state.password
    })
      .then(res => {
        TokenService.saveAuthToken(res.authToken);
        console.log(this.props);
        this.props.history.push("/all");
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };
  render() {
    const { error } = this.state;
    return (
      <div className="form-container">
        <form className="login-form" onSubmit={e => this.handleSubmit(e)}>
          <div role="alert">{error && <p className="error">{error}</p>}</div>
          <div className="username-container">
            <label className="username-label">Username </label>
            <input
              type="text"
              className="userName"
              onChange={e => this.handleLoginChange(e)}
            />
          </div>
          <div className="password-container">
            <label className="password-label">Password </label>
            <input
              type="password"
              className="password"
              onChange={e => this.handleLoginChange(e)}
            />
          </div>
          <div className="home-buttons">
            <button type="submit" className="login-submit-button">
              Log in
            </button>
            <Link to="/register">
              <button type="click" className="register-button">
                Register
              </button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
