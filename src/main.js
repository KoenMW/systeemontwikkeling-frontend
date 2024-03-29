import './assets/main.scss'
import { useAuthStore } from './stores/auth.js'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const authStore = useAuthStore()
authStore.checkAuth()

app.mount('#app')
