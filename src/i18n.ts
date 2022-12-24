import i18n from "i18next"
import {initReactI18next} from 'react-i18next';
import en from './assets/locales/en/translation.json'
import am from './assets/locales/am/translation.json'

export default i18n
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        lng: "am",
        fallbackLng: 'en',
        resources: {en, am},
        debug: true,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    });