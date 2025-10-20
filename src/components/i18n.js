import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// English
import commonEn from "../locales/common/en.json";
import footerEn from "../locales/footer/en.json";
// Persian
import commonFa from "../locales/common/fa.json";
import footerFa from "../locales/footer/fa.json";

const resources = {
  en: { common: commonEn, footer: footerEn },
  fa: { common: commonFa, footer: footerFa },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  lng: "en",
  ns: ["common", "footer"],
  defaultNS: "common",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
