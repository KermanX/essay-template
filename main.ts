/// <reference types="vite/client" />

import { createApp } from 'vue'
// @ts-ignore
import Main from './README.md'
import 'katex/dist/katex.min.css'
import 'uno.css'
import './styles.css'
import Figure from './components/Figure.vue'

createApp(Main).component('Figure', Figure).mount('#app')
