import React from "react";
import UserSignupPage from "../pages/UserSignupPage";
import LoginPage from "../pages/LoginPage";
import LanguageSelector from "../components/LanguageSelector";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import { HashRouter as Router , Route, Redirect, Switch } from "react-router-dom";
import TopBar from "../components/TopBar";
//import {Authentication} from "../shared/AuthenticationContext";
//path="/api/1.0/auth
import {connect} from 'react-redux';

class App extends React.Component {
  //static contextType = Authentication;

  render(){
   const {isLoggedIn} = this.props;
    return (
      <div>
      <Router>
        <TopBar  />
        <Switch>
          <Route exact path="/" component={HomePage} />
          {!isLoggedIn &&  <Route path="/login" component={LoginPage} />}
          <Route path="/signup" component={UserSignupPage} />
          <Route path="/user/:username" component={UserPage} />
          <Redirect to="/" />
        </Switch>
      </Router>
      <LanguageSelector />
    </div>
    );
  }
}

const mapStateProps = store => {
  return {
    isLoggedIn: store.isLoggedIn
    
  };
};

export default connect(mapStateProps)(App);

//exact -> birebir match varsa
//Redirect -> eşleşme yoksa yönledir
//Switch -> V6 da kaldırıldı Routes oldu
//HashRouter -> backend e sürekli sorgu atmayı önlenek için

/* 

*/
