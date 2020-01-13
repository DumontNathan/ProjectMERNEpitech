import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class Dashboard extends Component {
  constructor() {
    super();
    //Set default message
    this.state = {
      username : "",
      email : "",
      redirect : false
    };
  }

  componentDidMount() {
    axios
      .get(`/api/users/dashboard`)
      .then(res => {
        console.log(res);
        this.setState({ username: res.data.username, email : res.data.email});
      })
      .catch(error => {
        // this.setState({ redirect: true });
        console.log(error.response);
      });
  }

  onLogoutClick = e => {
    e.preventDefault();
  };

  render() {
    const { redirection } = this.state;
    if (redirection) {
    return <Redirect to={{ pathname: "/login", state: "You must log in..."}}/>;
    }
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <p className="flow-text grey-text text-darken-1">
                Hello, {this.state.username}. Your email is {this.state.email}
              </p>
            </h4>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
