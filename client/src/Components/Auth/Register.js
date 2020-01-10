import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
      redirection: false
    };
  }
  onChange = e => {
    // Modify state according to what is writen on the inputs
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    console.log(newUser);

    // POST newUser to database
    axios
      .post(`/api/users/register`, newUser)
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({ redirection: true });
      })
      .catch(error => {
        console.log(error.response.data);
        this.setState({ errors: error.response.data });
      });
  };
  render() {
    const { redirection } = this.state;
    if (redirection) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link
              to="/"
              className="btn-flat waves-effect white-text text-darken-1"
            >
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4 className="white-text text-darken-1">
                <b>Register</b> here
              </h4>
              <p className="white-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.username}
                  id="username"
                  type="text"
                  className="white-text text-darken-1"
                />
                <label htmlFor="name">Username</label>
                <span className="red-text">{this.state.errors.username}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  id="email"
                  type="email"
                  className="white-text text-darken-1"
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">{this.state.errors.email}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  id="password"
                  type="password"
                  className="white-text text-darken-1"
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">{this.state.errors.password}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  id="password2"
                  type="password"
                  className="white-text text-darken-1"
                />
                <label htmlFor="password2">Confirm Password</label>
                <span className="red-text">{this.state.errors.password2}</span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;
