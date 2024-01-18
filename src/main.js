import { createApp } from 'vue'
import '@/styles/index.scss'
import App from './App.vue'
import router from './router'
import 'highlight.js/styles/stackoverflow-light.css'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import xml from 'highlight.js/lib/languages/xml'
// import markdown from 'highlight.js/lib/languages/markdown'
// import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('html', xml)
// hljs.registerLanguage('markdown', markdown)

// console.log('ElementPlus:', ElementPlus)
const app = createApp(App)
app.use(router)
app.use(hljsVuePlugin)
// app.use(ElementPlus)
app.mount('#app')
