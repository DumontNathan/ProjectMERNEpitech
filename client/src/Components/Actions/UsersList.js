import React, { Component } from "react";
import axios from "axios";

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    axios.get("/api/users/userslist").then(res => {
      this.setState({ users: res.data });
      console.log(this.state.users);
    });
  }

  onDashBoardClick = e => {
    e.preventDefault();
    this.props.history.push("/dashboard");
  };

  render() {
    return (
      <div className="container center">
        <div class="row">
          <div class="col s12 m3">
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onDashBoardClick}
              className="btn btn-large waves-effect waves-light"
            >
              Dashboard
            </button>
            {this.state.users.map(user => (
              <div class="card blue-grey darken-1">
                <div class="card-content white-text">
                  <span class="card-title">{user.username}</span>
                  <p>{user.email}</p>
                </div>
                <div class="card-action">
                  <a href="">Follow</a>
                  <a href="">Check profile</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default UsersList;
