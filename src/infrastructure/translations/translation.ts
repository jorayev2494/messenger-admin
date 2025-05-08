import type { RouteLocationRaw } from 'vue-router'
import i18n from './index'
import { nextTick } from 'vue'

const Trans = {
  get defaultLocale() {
    return process.env.VUE_APP_DEFAULT_LOCALE
  },
  get supportedLocales() {
    return process.env.VUE_APP_SUPPORTED_LOCALES.split(',')
  },
  set currentLocale(newLocale) {
    i18n.global.locale.value = newLocale
  },
  async switchLanguage(newLocale: string): Promise<void> {
    // await Trans.loadLocaleMessages(newLocale);
    Trans.currentLocale = newLocale
    document.querySelector('html')?.setAttribute('lang', newLocale)
    localStorage.setItem('user-locale', newLocale)
  },
  isLocaleSupported(locale: string | null) {
    return Trans.supportedLocales.includes(locale)
  },
  getUserLocale() {
    const locale =
      window.navigator.language || window.navigator?.userLanguage || Trans.defaultLocale

    // const locale = i18n.global.locale.value; // localStorage.getItem('user-locale');
    // const locale = localStorage.getItem('user-locale');

    return {
      locale: locale,
      localeNoRegion: locale.split('-')[0],
    }
  },
  get currentLocale() {
    return i18n.global.locale.value
  },
  getPersistedLocale(): string | null {
    const persistedLocale: string | null = localStorage.getItem('user-locale')

    if (Trans.isLocaleSupported(persistedLocale)) {
      return persistedLocale
    } else {
      return null
    }
  },
  guessDefaultLocale(): string {
    const userPersistedLocale = Trans.getPersistedLocale()

    if (userPersistedLocale) {
      return userPersistedLocale
    }

    const userPreferredLocale = Trans.getUserLocale()

    if (Trans.isLocaleSupported(userPreferredLocale.locale)) {
      return userPreferredLocale.locale
    }

    if (Trans.isLocaleSupported(userPreferredLocale.localeNoRegion)) {
      return userPreferredLocale.localeNoRegion
    }

    return Trans.defaultLocale
  },
  async routeMiddleware(to, _from, next) {
    const paramLocale = to.params.locale

    if (!Trans.isLocaleSupported(paramLocale)) {
      return next(Trans.guessDefaultLocale())
    }

    await Trans.switchLanguage(paramLocale)

    return next()
  },
  async loadLocaleMessages(locale: string) {
    if (!i18n.global.availableLocales.includes(locale)) {
      const messages = await import(`@/services/translations/locales/${locale}.json`)
      i18n.global.setLocaleMessage(locale, messages.default)
    }

    return nextTick()
  },
  route(to: RouteLocationRaw): RouteLocationRaw {
    return {
      ...to,
      params: {
        ...to.params,
        locale: Trans.currentLocale,
      },
    }
  },
}

export default Trans
