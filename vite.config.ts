import Vue from '@vitejs/plugin-vue'
import MarkdownItMdc from 'markdown-it-mdc'
import {
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives
} from 'unocss'
import UnoCSS from 'unocss/vite'
import Markdown from 'unplugin-vue-markdown/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import MarkdownItKatex from './plugins/markdown-it-katex'
import VuePluginKatex from './plugins/vue-plugin-katex'

export default defineConfig({
  plugins: [
    Inspect(),
    VuePluginKatex(),
    Markdown({
      markdownItSetup(md) {
        md.use(MarkdownItKatex, {
          strict: 'ignore',
          trust: true,
        })
        md.use(MarkdownItMdc)
      }
    }),
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    UnoCSS({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          extraProperties: {
            'display': 'inline-block',
            'vertical-align': 'middle',
          },
        }),
      ],
      transformers: [
        transformerDirectives(),
      ],
    }),
  ],
})
