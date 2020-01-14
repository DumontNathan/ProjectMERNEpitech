import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./Components/Layout/Navbar";
import Landing from "./Components/Layout/Landing";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import Dashboard from "./Components/Auth/Dashboard";
import withAuth from './Components/Auth/withAuth';
import withoutAuth from './Components/Auth/withoutAuth';
import "./App.css"
import UsersList from "./Components/Actions/UsersList";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <br></br>
          <Route exact path="/" component={withoutAuth(Landing)} />
          <Route exact path="/register" component={withoutAuth(Register)} />
          <Route exact path="/login" component={withoutAuth(Login)} />
          <Route exact path="/dashboard" component={withAuth(Dashboard)} />
          <Route exact path="/userslist" component={withAuth(UsersList)} />
        </div>
      </Router>
    );
  }
}
export default App;