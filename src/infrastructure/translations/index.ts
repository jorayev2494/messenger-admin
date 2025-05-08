import { createI18n } from 'vue-i18n'

import en from '@/infrastructure/translations/locales/en.js'
import ru from '@/infrastructure/translations/locales/ru.js'

import dEn from '@/infrastructure/translations/locales/datetime/en'
import dRu from '@/infrastructure/translations/locales/datetime/ru'

const i18n = createI18n({
  locale: process.env.VUE_APP_DEFAULT_LOCALE,
  fallbackLocale: process.env.VUE_APP_FALLBACK_LOCALE,
  globalInjection: true,
  legacy: false,
  messages: {
    en,
    ru,
  },
  datetimeFormats: {
    en: dEn,
    ru: dRu,
  },
})

export default i18n
