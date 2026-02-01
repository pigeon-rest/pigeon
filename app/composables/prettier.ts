import { format as _fmt } from 'prettier'
import htmlPlugin from 'prettier/plugins/html'
import babelPlugin from 'prettier/plugins/babel'
import estreePlugin from 'prettier/plugins/estree'

export function usePrettier() {
  const format = (code: string, lang: string) => {
    try {
      switch (lang) {
        case 'json':
          return _fmt(code, {
            parser: 'json',
            plugins: [babelPlugin, estreePlugin]
          })
        case 'html':
        case 'xml':
          return _fmt(code, {
            parser: 'html',
            plugins: [htmlPlugin, estreePlugin]
          })
        default:
          return Promise.resolve(code)
      }
    } catch (e) {
      return Promise.resolve(code)
    }
  }

  return { format }
}
