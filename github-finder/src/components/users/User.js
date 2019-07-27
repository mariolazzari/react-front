import React, { Component } from "react";
import PropTypes from "prop-types";

class User extends Component {
  componentDidMount() {
    console.log("object", this.props.match.params.login);
    this.props.getUser(this.props.match.params.login);
  }

  render() {
    console.log("user", this.props);

    const {
      name,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable
    } = this.props.user;

    const { loading } = this.props;

    return <div>{name}</div>;
  }
}

export default User;
