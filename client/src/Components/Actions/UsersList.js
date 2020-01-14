import React, { Component } from "react";
import { Link } from "react-router-dom"
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

  render() {
    return (
      <div className="container center">
        <div class="row">
          <div class="col s12 m3">
            <Link
              to="/dashboard"
              className="btn-flat waves-effect white-text text-darken-1"
            >
              <i className="material-icons left">keyboard_backspace</i> Back to
              dashboard
            </Link>
            {this.state.users.map(user => (
              <div class="card teal darken-1">
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
