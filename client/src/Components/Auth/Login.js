import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import passport from "passport";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  onChange = e => {
    // Modify state according to what is writen on the inputs
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(userData);
    console.log(this.state);

    // axios
    //   .post(
    //     `/api/users/login`,
    //     passport.authenticate("jwt", userData),
    //     function(req, res) {
    //       res.send(req.user.profile);
    //       console.log(req.user.profile);
    //     }
    //   )
    //   .catch(error => {
    //     console.log(error.response);
    //     this.setState({ errors: error.response.data });
    //   });
  };
  render() {
    return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link
              to="/"
              className="btn-flat waves-effect white-text text-darken-1"
            >
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <span className="green-text">{this.props.location.state}</span>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4 className="white-text text-darken-1">
                <b>Login</b> here
              </h4>
              <p className="white-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
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
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
