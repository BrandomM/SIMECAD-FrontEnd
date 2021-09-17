import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en_global from "./translations/en_global.json";
import es_global from "./translations/es_global.json";

const resources = {
  es: {
    translation: es_global,
  },
  en: {
    translation: en_global,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    detection: {
      caches: [],
    },
    fallbackLng: "es",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
