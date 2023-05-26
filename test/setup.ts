import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import homeRU from "./../public/locales/ru/home.json";
import homeEN from "./../public/locales/en/home.json";

i18n.use(initReactI18next).init({
  lng: "en",
  resources: {
    en: {
      home: homeEN,
    },
    ru: {
      home: homeRU,
    },
  },
  fallbackLng: "en",
  debug: false,
});

export default i18n;
