import React, { Component } from "react";
import logo from "../assets/hoaxify.png";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
//import { Authentication } from "../shared/AuthenticationContext";
import {connect} from 'react-redux';
import { logoutSuccess } from "../redux/authAction";


class TopBar extends Component {
  //static contextType = Authentication;
  // onClickLogout = () =>{
  //   this.props.dispatch(logoutSuccess());
  // }

  render() {
    const { t,isLoggedIn,username, onLogoutSuccess  } = this.props;
    //const  onLogoutSuccess = () =>{};
   

    let links = (
      <ul className="navbar-nav position-absolute top-0 end-0">
        <li>
          <Link className="nav-link" to="/login">
            {t("Login")}
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/signup">
            {t("Sign Up")}
          </Link>
        </li>
      </ul>
    );
    if (isLoggedIn) {
      links = (
        <ul className="navbar-nav position-absolute top-0 end-0">
          <Link className="nav-link" to={`/user/${username}`}>
            {username}
          </Link>
          <li
            className="nav-link"
            onClick={onLogoutSuccess}
            style={{ cursor: "pointer" }}
          >
            {t("Logout")}
          </li>
        </ul>
      );
    }

    return (
      <div className="shadow-sm bg-light mb-2">
        <nav className="navbar navbar-light  container navbar-expand">
          <Link className="navbar-brand" to="/">
            <img src={logo} width="60" alt="Hoaxify Logo" />
            Hoaxify
          </Link>
          {links}
        </nav>
      </div>
    );
  }
}

const TopBarWithTranslation = withTranslation()(TopBar);
const mapStateProps = store => {
  return {
    isLoggedIn: store.isLoggedIn,
    username: store.username
  };
};
const mapDispatchProps = dispatch => {
  return{
    onLogoutSuccess: () => dispatch(logoutSuccess())
  }
}

export default connect(mapStateProps, mapDispatchProps)(TopBarWithTranslation);