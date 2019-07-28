import React, { useState, Fragment } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";

import GithubState from "./context/github/githubContext";

import axios from "axios";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/pages/About";
import User from "./components/users/User";

const id = process.env.REACT_APP_GITHUB_CLIENT_ID;
const secret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const searchUsers = async text => {
    try {
      const api = `https://api.github.com/search/users?q=${text}&client_id=${id}&client_secret=${secret}`;
      setLoading(true);
      const res = await axios.get(api);
      setUsers(res.data.items);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const clearUsers = () => this.setUsers([]);

  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => {
      this.setState({ alert: null });
    }, 5000);
  };

  const getUserRepos = async username => {
    try {
      const api = `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${id}&client_secret=${secret}`;
      setLoading(true);
      const res = await axios.get(api);
      setRepos(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async username => {
    try {
      const api = `https://api.github.com/users/${username}?client_id=${id}&client_secret=${secret}`;
      setLoading(true);
      const res = await axios.get(api);
      setUser(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert} />

            <Switch>
              <Route
                path="/"
                exact
                render={props => (
                  <Fragment>
                    <Search
                      searchUsers={searchUsers}
                      clearUsers={clearUsers}
                      showClear={users.length > 0}
                      setAlert={showAlert}
                    />
                    <Users users={users} loading={loading} />
                  </Fragment>
                )}
              />
              <Route path="/about" component={About} />
              <Route
                path="/user/:login"
                render={props => (
                  <User
                    {...props}
                    getUser={getUser}
                    user={user}
                    getUserRepos={getUserRepos}
                    repos={repos}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
