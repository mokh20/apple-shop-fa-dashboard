import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEn from "../locales/translationEn.json";
import translationFa from "../locales/translationFa.json";

const resources = {
  en: { translation: translationEn },
  fa: { translation: translationFa },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
