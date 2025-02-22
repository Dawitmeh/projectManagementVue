

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
import '../node_modules/flowbite-vue/dist/index.css'
app.mount('#app')
