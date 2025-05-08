import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

const cherryPickedKeys = [
  'NODE_ENV',
  'VUE_APP_API_SERVER_ENDPOINT',
  'VUE_APP_WS_SERVER_ENDPOINT',
  'VUE_APP_DEFAULT_LOCALE',
  'VUE_APP_FALLBACK_LOCALE',
  'VUE_APP_SUPPORTED_LOCALES',
  'VUE_APP_STORAGE_ENDPOINT',
]

const importEnv = (mode: string): object => {
  const env = loadEnv(mode, process.cwd(), '')
  const processEnv: object = {}
  cherryPickedKeys.forEach((key: string) => (processEnv[key] = env[key]))

  return processEnv
}

// https://vite.dev/config/
export default defineConfig((mode) => {
  return {
    plugins: [vue(), vueDevTools()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    define: {
      'process.env': importEnv(mode),
    },
  }
})
