import {
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap
} from '@codemirror/autocomplete'
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab
} from '@codemirror/commands'
import { html } from '@codemirror/lang-html'
import { json } from '@codemirror/lang-json'
import { xml } from '@codemirror/lang-xml'
import {
  bracketMatching,
  foldGutter,
  foldKeymap,
  indentOnInput
} from '@codemirror/language'
import { highlightSelectionMatches, searchKeymap } from '@codemirror/search'
import { Compartment, EditorState } from '@codemirror/state'
import {
  crosshairCursor,
  dropCursor,
  EditorView,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightSpecialChars,
  keymap,
  lineNumbers,
  rectangularSelection
} from '@codemirror/view'

interface CodeMirrorConfig {
  theme: string
  readOnly?: boolean
}

export function useCodeMirror(config?: CodeMirrorConfig) {
  const themeConfig = new Compartment()
  const languageConfig = new Compartment()
  const lineWrappingConfig = new Compartment()

  let view: EditorView | null = null

  const getTheme = (theme: string) => {
    return theme === 'dark' ? githubDark : githubLight
  }

  const getLanguageExtension = (lang: string) => {
    switch (lang) {
      case 'json':
        return json()
      case 'html':
        return html()
      case 'xml':
        return xml()
      default:
        return []
    }
  }

  const initEditor = (
    element: HTMLElement,
    state: {
      content: string
      lang: string
      wrap?: boolean
      onChange?: (val: string) => void
      theme?: string
    }
  ) => {
    if (view) view.destroy()

    view = new EditorView({
      doc: state.content,
      parent: element,
      extensions: [
        lineNumbers(),
        highlightActiveLine(),
        highlightActiveLineGutter(),
        highlightSpecialChars(),
        history(),
        foldGutter({ openText: '▾', closedText: '▸' }),
        dropCursor(),
        indentOnInput(),
        bracketMatching(),
        closeBrackets(),
        rectangularSelection(),
        crosshairCursor(),
        highlightSelectionMatches(),
        keymap.of([
          indentWithTab,
          ...closeBracketsKeymap,
          ...defaultKeymap,
          ...searchKeymap,
          ...historyKeymap,
          ...foldKeymap,
          ...completionKeymap
        ]),
        EditorView.editorAttributes.of({ class: 'overflow-auto' }),
        EditorView.updateListener.of((update) => {
          if (update.docChanged && state.onChange) {
            state.onChange(update.state.doc.toString())
          }
        }),
        EditorState.readOnly.of(config?.readOnly ?? false),
        themeConfig.of(getTheme(state.theme || config?.theme || 'light')),
        languageConfig.of(getLanguageExtension(state.lang)),
        lineWrappingConfig.of(state.wrap ? EditorView.lineWrapping : [])
      ]
    })

    return view
  }

  const setContent = (content: string) => {
    if (view && view.state.doc.toString() !== content) {
      const transaction = view.state.update({
        changes: { from: 0, to: view.state.doc.length, insert: content }
      })

      view.dispatch(transaction)
    }
  }

  const setTheme = (theme: string) => {
    if (view) {
      view.dispatch({
        effects: themeConfig.reconfigure(getTheme(theme))
      })
    }
  }

  const setLanguage = (lang: string) => {
    if (view) {
      view.dispatch({
        effects: languageConfig.reconfigure(getLanguageExtension(lang))
      })
    }
  }

  const setLineWrapping = (wrap: boolean) => {
    if (view) {
      view.dispatch({
        effects: lineWrappingConfig.reconfigure(
          wrap ? EditorView.lineWrapping : []
        )
      })
    }
  }

  const destroy = () => {
    view?.destroy()
    view = null
  }

  return {
    initEditor,
    setContent,
    setTheme,
    setLanguage,
    setLineWrapping,
    destroy
  }
}
