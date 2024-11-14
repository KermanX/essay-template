import { Plugin } from "vite";
import MagicString from "magic-string";
import katex from "katex";

let cacheSize = 0;
let katexCache1: Record<string, string> = {};
let katexCache2: Record<string, string> = {};

export default function (): Plugin[] {
  return [
    {
      name: 'vue-plugin-katex',
      enforce: 'pre',
      transform(code, id, options) {
        if (id.includes('.vue') && !id.includes('.vue?vue') && !id.includes('node_modules')) {
          const s = new MagicString(code);
          s.replaceAll(/<math>([\s\S]+?)<\/math>/mg, (_, match) => {
            if (katexCache1[match]) {
              return katexCache1[match];
            }
            cacheSize++;
            return katexCache1[match] = `<p>` + katex.renderToString(match.trim(), { displayMode: true }) + `</p>`;
          })
          s.replaceAll(/\$(\S[^\$]*?\S?)\$/mg, (_, match) => {
            if (katexCache2[match]) {
              return katexCache2[match];
            }
            cacheSize++;
            return katexCache2[match] = katex.renderToString(match.trim(), { displayMode: false });
          })
          if (cacheSize > 30) {
            cacheSize = 0;
            katexCache1 = {};
            katexCache2 = {};
          }
          return {
            code: s.toString(),
            map: s.generateMap(),
          }
        }
      },
    },
    {
      name: 'vue-plugin-twobackslash',
      enforce: 'pre',
      transform(code, id, options) {
        if (id.includes('.vue') && !id.includes('node_modules')) {
          const s = new MagicString(code);
          s.replaceAll(/\\\\/mg, () => {
            return `<br>`
          })
          return {
            code: s.toString(),
            map: s.generateMap(),
          }
        }
      },
    }
  ]
} 
