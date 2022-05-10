import React from "react";
import { withRouter } from "react-router-dom";
//import { Authentication } from "../shared/AuthenticationContext";
import { connect } from "react-redux";

const ProfileCard = (props) => {
  const pathUsername = props.match.params.username;
  let message = "We cannot edit";
  if (pathUsername === props.loggedInUsername) {
    message = "We can edit";
  }
  return <div> {message}</div>;
};

const mapStateProps = (store) => {
  return {
    loggedInUsername: store.username,
  };
};

export default connect(mapStateProps)(withRouter(ProfileCard));
