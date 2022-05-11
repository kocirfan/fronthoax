import React from "react";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "../api/apiCalls";

const LanguageSelector = (props) => {
  const { i18n } = useTranslation();

  const onChangeLanguage = (language) => {
    i18n.changeLanguage(language);
    changeLanguage(language);
  };
  return (
    <div className="container mt-2">
      <img
        src="https://countryflagsapi.com/tr/flat/24.png"
        alt="Turkey flag"
        onClick={() => onChangeLanguage("tr")}
        style={{ cursor: "pointer" }}
      />
      <img
        src="https://countryflagsapi.com/us/flat/24.png"
        alt="England flag"
        onClick={() => onChangeLanguage("en")}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

export default LanguageSelector;
