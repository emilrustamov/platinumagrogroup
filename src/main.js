import './assets/main.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import router from './router'
import messages from './locales'

let savedLocale = localStorage.getItem('locale') || 'ru'

// Защита: если у пользователя в браузере ещё сохранён 'be' с тех времён,
// когда белорусский был доступен - переключаем на 'ru', чтобы избежать
// ошибок (иначе i18n попытается найти messages.be, которого больше нет)
if (!messages[savedLocale]) {
    savedLocale = 'ru'
    localStorage.setItem('locale', 'ru')
}

const i18n = createI18n({
    legacy: false,
    locale: savedLocale,
    fallbackLocale: 'ru',
    messages
})

const head = createHead()

const app = createApp(App)

app.use(router)
app.use(i18n)
app.use(head)
app.mount('#app')