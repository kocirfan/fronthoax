import React, { useState } from "react";
import Input from "../components/Input";
import { useTranslation } from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { withApiProgress } from "../shared/ApiProgress";
import { useDispatch } from "react-redux";
import { signupHandler } from "../redux/authAction";

const UserSignupPage = (props) => {
  //hooks-state
  const [form, setForm] = useState({
    username: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const onChange = (event) => {
    const { name, value } = event.target; //object destruction
    setErrors((previusErrors) => ({ ...previusErrors, [name]: undefined }));
    setForm((previusForm) => ({ ...previusForm, [name]: value }));
  };

  const onClickSignup = async (event) => {
    event.preventDefault();

    const { history } = props;
    const { push } = history;

    const { username, displayName, password } = form; //object destruction

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
        setErrors(error.response.data.validationErrors);
      }
    }
  };

  const {
    username: usernameError,
    displayName: displayNameError,
    password: passwordError,
  } = errors;

  const {t} = useTranslation();
  const {  pendingApiCall } = props;

  let passwordRepeatError;
  if (form.password !== form.passwordRepeat) {
    passwordRepeatError = t("Password mismatch");
  }

  return (
    <div className="container">
      <form>
        <h1 className="text-center">{t("Sign Up")}</h1>
        <Input
          name="username"
          label={t("Username")}
          error={usernameError}
          onChange={onChange}
        />
        <Input
          name="displayName"
          label={t("Display Name")}
          error={displayNameError}
          onChange={onChange}
        />
        <Input
          name="password"
          label={t("Password")}
          error={passwordError}
          type="password"
          onChange={onChange}
        />
        <Input
          name="passwordRepeat"
          label={t("Password Repeat")}
          error={passwordRepeatError}
          type="password"
          onChange={onChange}
        />

        <div className="text-center">
          <ButtonWithProgress
            onClick={onClickSignup}
            disabled={pendingApiCall || passwordRepeatError !== undefined}
            pendingApiCall={pendingApiCall}
            text={t("Sign Up")}
          />
        </div>
      </form>
    </div>
  );
};

// Koşullu Render örneği- Conditional rendering {this.state.pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}

// translation için

const UserSignupPageWithApiProgressForSignupRequest = withApiProgress(
  UserSignupPage,
  "/api/1.0/users"
); // Higher Order Component
const UserSignupPageWithApiProgressForAuthRequest = withApiProgress(
  UserSignupPageWithApiProgressForSignupRequest,
  "/api/1.0/auth"
);

 // Higher Order Component
export default UserSignupPageWithApiProgressForAuthRequest;
