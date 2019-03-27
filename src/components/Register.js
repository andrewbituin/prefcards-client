import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth-api-service";
import './Register.css';

export default class Register extends React.Component {
  state = {
    error: null
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ error: null });

    const obj = {};
    const form = new FormData(e.target);
    form.forEach((val, key) => (obj[key] = val));
    
    AuthService.postRegistration(obj)
      .then(() => this.props.history.push("/login"))
      .catch(res => this.setState({ error: res.error }));
  };
  render() {
    const { error } = this.state;
    return (
      <div>
        <header className="register-header">
          <h1 className="register-title">prefcards</h1>
        </header>
        <form className="register-form" onSubmit={e => this.handleSubmit(e)}>
          <div role="alert">{error && <p className="error">{error}</p>}</div>
          <h3 className="register-form-title">Create account</h3>
          <label>Name </label>
          <input type="text" className="name" name="full_name" />
          <select className="position" name="position">
            <option>doctor</option>
            <option>nurse</option>
            <option>tech</option>
          </select>
          <br />
          <label>Username </label>
          <input type="text" className="userName" name="user_name" />
          <br />
          <label>Password </label>
          <input type="text" className="password" name="password" />
          <br />
          <button type="submit">Submit</button>
          <Link to="/">
            <button type="click">Cancel</button>
          </Link>
        </form>
      </div>
    );
  }
}
