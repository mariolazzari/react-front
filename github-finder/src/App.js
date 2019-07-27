import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import axios from "axios";

class App extends Component {
  state = {
    users: [],
    loading: false
  };

  loadUsers = async () => {
    const { REACT_APP_GITHUB_CLIENT_ID, REACT_APP_GITHUB_SECRET } = process.env;
    const api = `https://api.github.com/users?client_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_SECRET}`;

    try {
      this.setState({ loading: true });
      const res = await axios.get(api);
      this.setState({ users: res.data, loading: false });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.loadUsers();
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Users users={users} />
        </div>
      </div>
    );
  }
}

export default App;
