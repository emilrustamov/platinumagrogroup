import './assets/main.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import router from './router'
import messages from './locales'

const savedLocale = localStorage.getItem('locale') || 'en'

const i18n = createI18n({
    legacy: false,
    locale: savedLocale,
    fallbackLocale: 'en',
    messages
})

const head = createHead()

const app = createApp(App)

app.use(router)
app.use(i18n)
app.use(head)
app.mount('#app')