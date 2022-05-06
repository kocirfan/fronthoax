import React from "react";
import ApiProgress from "../shared/ApiProgress";
import UserSignupPage from "../pages/UserSignupPage";
import LoginPage from "../pages/LoginPage";
import LanguageSelector from "../components/LanguageSelector";

//path="/api/1.0/auth

function App() {
  return (
    <div>
      
      <LoginPage />
      
      <LanguageSelector />
    </div>
  );
}

export default App;
