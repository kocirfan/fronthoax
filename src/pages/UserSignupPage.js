import React, { Component } from "react";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { withApiProgress } from "../shared/ApiProgress";
import { connect } from "react-redux";
import { signupHandler } from "../redux/authAction";
//bir class Component- statefull

class UserSignupPage extends Component {
  //ovveride metot state
  state = {
    username: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
    errors: {},
  };

  onChange = (event) => {
    const { t } = this.props;
    const { name, value } = event.target; //object destruction
    const errors = { ...this.state.errors }; // errors objesinin kopyasını oluşturmak ...
    errors[name] = undefined;
    if (name === "password" || name === "passwordRepeat") {
      if (name === "password" && value !== this.state.passwordRepeat) {
        errors.passwordRepeat = t("Password mismatch");
      } else if (name === "passwordRepeat" && value !== this.state.password) {
        errors.passwordRepeat = t("Password mismatch");
      } else {
        errors.passwordRepeat = undefined;
      }
    }

    //event.target.value forma girilen değeri tutuyor
    // event.target.name formda ilgili alanı tutuyor

    this.setState({
      [name]: value, //[name]: value name ile value set ediliyor
      errors,
    });
  };

  onClickSignup = async (event) => {
    event.preventDefault();

    const { history, dispatch } = this.props;
    const { push } = history;

    const { username, displayName, password } = this.state; //object destruction

    const body = {
      //key-value aynı ise
      username,
      displayName,
      password,
    };

    try {
      await dispatch(signupHandler(body));
      push("/");
    } catch (error) {
      if (error.response.data.validationErrors) {
        this.setState({ errors: error.response.data.validationErrors });
      }
    }

    // aktif sorgu olduğu durumda tekrarlayan işlemi önlemk adına axios da durum yönetimi
  };

  //ovveride ettiği metot/ class componentlerde render zorunlu
  render() {
    const { errors } = this.state;
    const { username, displayName, password, passwordRepeat } = errors;
    const { t, pendingApiCall } = this.props;
    // render metodu bir jsx dönmelidir
    return (
      <div className="container">
        <form>
          <h1 className="text-center">{t("Sign Up")}</h1>
          <Input
            name="username"
            label={t("Username")}
            error={username}
            onChange={this.onChange}
          />
          <Input
            name="displayName"
            label={t("Display Name")}
            error={displayName}
            onChange={this.onChange}
          />
          <Input
            name="password"
            label={t("Password")}
            error={password}
            type="password"
            onChange={this.onChange}
          />
          <Input
            name="passwordRepeat"
            label={t("Password Repeat")}
            error={passwordRepeat}
            type="password"
            onChange={this.onChange}
          />

          <div className="text-center">
            <ButtonWithProgress
              onClick={this.onClickSignup}
              disabled={pendingApiCall || passwordRepeat !== undefined}
              pendingApiCall={pendingApiCall}
              text={t("Sign Up")}
            />
          </div>
        </form>
      </div>
    );
  }
}

// Koşullu Render örneği- Conditional rendering {this.state.pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}

// translation için

const UserSignupPageWithApiProgressForSignupRequest = withApiProgress(
  UserSignupPage,
  "/api/1.0/users"
); // Higher Order Component
const UserSignupPageWithApiProgressForAuthRequest = withApiProgress(UserSignupPageWithApiProgressForSignupRequest, '/api/1.0/auth');

const UserSignupPageWithTranslation = withTranslation()(
  UserSignupPageWithApiProgressForAuthRequest
); // Higher Order Component
export default connect()(UserSignupPageWithTranslation);
