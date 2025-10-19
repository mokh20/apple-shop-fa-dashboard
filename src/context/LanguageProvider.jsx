import { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("lng") || "en";
    setLanguage(savedLang);
    i18n.changeLanguage(savedLang);
  }, [i18n]);

  // switch lang
  const changeLanguage = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem("lng", lang);
  };
  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
