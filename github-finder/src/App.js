import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import axios from "axios";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null
  };

  searchUsers = async text => {
    const id = process.env.REACT_APP_GITHUB_CLIENT_ID;
    const secret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
    const api = `https://api.github.com/search/users?q=${text}&client_id=${id}&client_secret=${secret}`;

    try {
      this.setState({ loading: true });
      const res = await axios.get(api);
      this.setState({ users: res.data.items, loading: false });
    } catch (error) {
      console.log(error);
    }
  };

  clearUsers = () => this.setState({ users: [], loading: false });

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => {
      this.setState({ alert: null });
    }, 5000);
  };

  render() {
    const { users, loading, alert } = this.state;

    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0}
            setAlert={this.setAlert}
          />
          <Users users={users} loading={loading} />
        </div>
      </div>
    );
  }
}

export default App;
