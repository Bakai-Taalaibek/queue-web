import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './ru.json'
import ky from './ky.json'
import en from './en.json'

i18n.use(initReactI18next).init({
  fallbackLng: 'ru',
  lng: 'ru',
  resources: {
    ru: {
      translations: ru
    },
    en: {
      translations: en
    },
    ky: {
      translations: ky
    }
  },
  ns: ['translations'],
  defaultNS: 'translations'
});

i18n.languages = ['ru', 'en', 'ky'];

export default i18n;
