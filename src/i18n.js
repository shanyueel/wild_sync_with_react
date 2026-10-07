import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import LanguageDetector from 'i18next-browser-languagedetector';

// Bundle every locale file at build time so translations are ready on first render
const localeFiles = import.meta.glob('./locales/{en,zh}/[!_]*.json', {
  eager: true,
  import: 'default',
});

const resources = {};
Object.entries(localeFiles).forEach(([path, translations]) => {
  const [, lng, ns] = path.match(/\.\/locales\/(\w+)\/(\w+)\.json$/);
  resources[lng] = { ...resources[lng], [ns]: translations };
});

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    initAsync: false,
    fallbackLng: 'en',
    supportedLngs: ['en', 'zh'],
    defaultNS: 'common',
    debug: true,
    detection: {
      order: ['cookie', 'htmlTag', 'localStorage', 'path', 'subdomain'],
      caches: ['cookie'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
