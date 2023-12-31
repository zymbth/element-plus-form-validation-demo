import { createApp } from 'vue'
import '@/styles/index.scss'
import App from './App.vue'
import router from './router'

// console.log('ElementPlus:', ElementPlus)
const app = createApp(App)
app.use(router)
// app.use(ElementPlus)
app.mount('#app')
