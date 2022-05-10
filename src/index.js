import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./bootstrap-ovveride.scss";
import App from "./container/App";
import reportWebVitals from "./reportWebVitals";
import "./i18n";
//import AuthenticationContext from "./shared/AuthenticationContext";
import { Provider } from "react-redux";
//import {createStore} from 'redux';
//import { legacy_createStore as createStore } from "redux";
import configureStore from "./redux/configureStore";

const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
