import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// English
import commonEn from "../locales/common/en.json";
import homeEn from "../locales/home/en.json";
import footerEn from "../locales/footer/en.json";
import dashboardEn from "../locales/dashboard/en.json";
// Persian
import commonFa from "../locales/common/fa.json";
import homeFa from "../locales/home/fa.json";
import footerFa from "../locales/footer/fa.json";
import dashboardFa from "../locales/dashboard/fa.json";

const resources = {
  en: {
    common: commonEn,
    home: homeEn,
    footer: footerEn,
    dashboard: dashboardEn,
  },
  fa: {
    common: commonFa,
    home: homeFa,
    footer: footerFa,
    dashboard: dashboardFa,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  lng: "en",
  ns: ["common", "home", "footer", "dashboard"],
  defaultNS: "common",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
