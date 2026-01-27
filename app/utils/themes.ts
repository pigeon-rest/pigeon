import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { EditorView } from '@codemirror/view'
import { tags as t } from '@lezer/highlight'

const githubLightTheme = EditorView.theme({
  '&': {
    backgroundColor: '#fff',
    color: '#24292e'
  },
  '.cm-gutters': {
    backgroundColor: 'var(--ui-bg)',
    color: 'var(--ui-text-muted)'
  },
  '.cm-gutters.cm-gutters-before': {
    borderRight: '1px solid var(--ui-border)'
  },
  '.cm-activeLine': {
    backgroundColor: 'var(--ui-bg-muted)'
  },
  '.cm-activeLineGutter': {
    backgroundColor: 'var(--ui-bg)',
    color: 'var(--ui-text)'
  },
  '.cm-foldPlaceholder': {
    backgroundColor: 'var(--ui-bg-muted)',
    border: '1px solid var(--ui-border-accented)',
    color: 'var(--ui-text-muted)'
  },
  '&.cm-focused .cm-selectionBackground, & .cm-line::selection, & .cm-selectionLayer .cm-selectionBackground, .cm-content ::selection':
    {
      background: '#bbdfff!important'
    },
  '& .cm-selectionMatch': {
    backgroundColor: '#bbdfff'
  }
})

const githubLightHighlight = HighlightStyle.define([
  { tag: [t.standard(t.tagName), t.tagName], color: '#116329' },
  { tag: [t.comment, t.bracket], color: '#6a737d' },
  { tag: [t.className, t.propertyName], color: '#6f42c1' },
  {
    tag: [t.variableName, t.attributeName, t.number, t.operator],
    color: '#005cc5'
  },
  {
    tag: [t.keyword, t.typeName, t.typeOperator, t.typeName],
    color: '#d73a49'
  },
  { tag: [t.string, t.meta, t.regexp], color: '#032f62' },
  { tag: [t.name, t.quote], color: '#22863a' },
  { tag: [t.heading, t.strong], color: '#24292e', fontWeight: 'bold' },
  { tag: [t.emphasis], color: '#24292e', fontStyle: 'italic' },
  { tag: [t.deleted], color: '#b31d28', backgroundColor: 'ffeef0' },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: '#e36209' },
  { tag: [t.url, t.escape, t.regexp, t.link], color: '#032f62' },
  { tag: t.link, textDecoration: 'underline' },
  { tag: t.strikethrough, textDecoration: 'line-through' },
  { tag: t.invalid, color: '#cb2431' }
])

export const githubLight = [
  githubLightTheme,
  syntaxHighlighting(githubLightHighlight)
]

const githubDarkTheme = EditorView.theme(
  {
    '&': {
      color: '#c9d1d9'
    },
    '.cm-gutters': {
      backgroundColor: 'var(--ui-bg)',
      color: 'var(--ui-text-muted)'
    },
    '.cm-gutters.cm-gutters-before': {
      borderRight: '1px solid var(--ui-border)'
    },
    '.cm-content': {
      caretColor: '#c9d1d9'
    },
    '.cm-cursor, .cm-dropCursor': {
      borderLeftColor: '#c9d1d9'
    },
    '.cm-activeLine': {
      backgroundColor: 'var(--ui-bg-muted)'
    },
    '.cm-activeLineGutter': {
      backgroundColor: 'var(--ui-bg)',
      color: 'var(--ui-text)'
    },
    '.cm-foldPlaceholder': {
      backgroundColor: 'var(--ui-bg-muted)',
      border: '1px solid var(--ui-border-accented)',
      color: 'var(--ui-text-muted)'
    },
    '&.cm-focused .cm-selectionBackground, & .cm-line::selection, & .cm-selectionLayer .cm-selectionBackground, .cm-content ::selection':
      {
        background: '#003d73!important'
      },
    '& .cm-selectionMatch': {
      backgroundColor: '#003d73'
    }
  },
  { dark: true }
)

const githubDarkHighlight = HighlightStyle.define([
  { tag: [t.standard(t.tagName), t.tagName], color: '#7ee787' },
  { tag: [t.comment, t.bracket], color: '#8b949e' },
  { tag: [t.className, t.propertyName], color: '#d2a8ff' },
  {
    tag: [t.variableName, t.attributeName, t.number, t.operator],
    color: '#79c0ff'
  },
  {
    tag: [t.keyword, t.typeName, t.typeOperator, t.typeName],
    color: '#ff7b72'
  },
  { tag: [t.string, t.meta, t.regexp], color: '#a5d6ff' },
  { tag: [t.name, t.quote], color: '#7ee787' },
  { tag: [t.heading, t.strong], color: '#d2a8ff', fontWeight: 'bold' },
  { tag: [t.emphasis], color: '#d2a8ff', fontStyle: 'italic' },
  { tag: [t.deleted], color: '#ffdcd7', backgroundColor: 'ffeef0' },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: '#ffab70' },
  { tag: t.link, textDecoration: 'underline' },
  { tag: t.strikethrough, textDecoration: 'line-through' },
  { tag: t.invalid, color: '#f97583' }
])

export const githubDark = [
  githubDarkTheme,
  syntaxHighlighting(githubDarkHighlight)
]
