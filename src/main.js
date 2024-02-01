import { createApp } from 'vue'
import '@/styles/index.scss'
import App from './App.vue'
import router from './router'
import 'highlight.js/styles/stackoverflow-light.css'
import hljs from 'highlight.js/lib/core'
// import 'highlight.js/lib/common'
import javascript from 'highlight.js/lib/languages/javascript'
import xml from 'highlight.js/lib/languages/xml'
import hljsVuePlugin from '@highlightjs/vue-plugin'
// import vue from 'vue-highlight.js/lib/languages/vue'

import ('github-markdown-css/github-markdown.css')

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('html', xml)
// hljs.registerLanguage('vue', vue)

const app = createApp(App)
app.use(router)
app.use(hljsVuePlugin)
app.mount('#app')
