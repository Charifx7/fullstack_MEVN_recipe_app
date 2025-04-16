import './assets/main.css'

import { createApp } from 'vue'
import Toast from 'vue-toastification'
import "vue-toastification/dist/index.css"
import App from './App.vue'
import router from './routes'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

const options = {
    position: "top-right",
    toastClassName: "custom-toast",
    timeout: 2000,
}

app.use(pinia)
app.use(Toast, options).use(router)
app.mount('#app')
