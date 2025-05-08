import './bootstrap'
// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './infrastructure/router'
import acl from './services/acl'
import translation from './infrastructure/translations/index'
import globalVariables from './infrastructure/globalVariables/index'

// Table
import Vue3Datatable from '@bhplugin/vue3-datatable'
import '@bhplugin/vue3-datatable/dist/style.css'

// Flag Icons
import '/node_modules/flag-icons/css/flag-icons.min.css'

import Vue3Toasity from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import App from './App.vue'

const app = createApp(App)
app.use(globalVariables)

// Table
app.component('data-table', Vue3Datatable)

app.use(createPinia())
app.use(translation)
app.use(Vue3Toasity, {
  autoClose: 3000,
})
app.use(router)
app.use(acl)

app.mount('#app')
