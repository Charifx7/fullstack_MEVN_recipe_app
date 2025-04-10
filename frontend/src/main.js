import './assets/main.css'

import { createApp } from 'vue'
import Toast from 'vue-toastification'
import "vue-toastification/dist/index.css"
import App from './App.vue'
import router from './routes'

const app = createApp(App)
app.use(Toast).use(router)
app.mount('#app')
