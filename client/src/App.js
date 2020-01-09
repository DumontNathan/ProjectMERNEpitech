import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./Components/Layout/Navbar";
import Landing from "./Components/Layout/Landing";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import "./App.css"

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <br></br>
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}
export default App;