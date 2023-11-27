import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    english: {
      translation: require('./en/global.json'),
    },
    french: {
      translation: require('./fr/global.json'),
    },
    spanish: {
      translation: require('./es/global.json'),
    },
  },
  lng: 'english',
  fallbackLng: 'english',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
