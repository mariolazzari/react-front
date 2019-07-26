import React from "react";
import PropTypes from "prop-types";

const UserItem = ({ user: { avatar_url, login, html_url } }) => (
  <div className="card text-center">
    <img
      src={avatar_url}
      alt=""
      className="round-image"
      style={{ backgroundColor: "red", width: "60px" }}
    />
    <h3>{login}</h3>
    <div>
      <a href={html_url} className="btn btn-dark btn-sm my-1">
        More
      </a>
    </div>
  </div>
);

UserItem.propTypes = {
  avatar_url: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  html_url: PropTypes.string.isRequired
};

export default UserItem;
