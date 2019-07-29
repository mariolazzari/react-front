import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from "../types";

const id = process.env.REACT_APP_GITHUB_CLIENT_ID;
const secret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  const searchUsers = async text => {
    try {
      const api = `https://api.github.com/search/users?q=${text}&client_id=${id}&client_secret=${secret}`;
      setLoading();
      const res = await axios.get(api);
      dispatch({ type: SEARCH_USERS, payload: res.data.items });

      console.log(dispatch);
    } catch (error) {
      console.log(error);
    }
  };

  const setLoading = () => dispatch({ type: SET_LOADING });

  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  const getUser = async username => {
    try {
      const api = `https://api.github.com/users/${username}?client_id=${id}&client_secret=${secret}`;
      setLoading();
      const res = await axios.get(api);
      dispatch({ type: GET_USER, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };

  const getUserRepos = async username => {
    try {
      const api = `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${id}&client_secret=${secret}`;
      setLoading();
      const res = await axios.get(api);
      dispatch({ type: GET_REPOS, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GithubContext.Provider
      value={{
        ...state,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
