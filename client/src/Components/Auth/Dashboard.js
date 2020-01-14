import React, { Component } from "react";
import axios from "axios";

class Dashboard extends Component {
  constructor() {
    super();
    //Set default message
    this.state = {
      username: "",
      email: ""
    };
  }

  componentDidMount() {
    axios
      .get(`/api/users/dashboard`)
      .then(res => {
        console.log(res);
        this.setState({ username: res.data.username, email: res.data.email });
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  onLogoutClick = e => {
    e.preventDefault();
    axios
      .get(`/api/users/logout`)
      .then(this.props.history.push("/"))
      .catch(error => {
        console.log(error.response);
      });
  };

  onListClick = e => {
    e.preventDefault();
    this.props.history.push('/userslist')
  }

  render() {
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
            <br></br>
            <button
              style={{
                width: "200px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onListClick}
              className="btn btn-large waves-effect waves-light"
            >
              Show users
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
