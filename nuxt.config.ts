// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxtjs/mdc', '@vueuse/nuxt'],

  vite: {
    optimizeDeps: {
      include: [
        '@codemirror/autocomplete',
        '@codemirror/commands',
        '@codemirror/lang-html',
        '@codemirror/lang-json',
        '@codemirror/lang-xml',
        '@codemirror/language',
        '@codemirror/search',
        '@codemirror/state',
        '@codemirror/view',
        '@lezer/highlight',
        'prettier',
        'prettier/plugins/babel',
        'prettier/plugins/estree',
        'prettier/plugins/html',
        'pretty-ms',
        'valibot'
      ]
    }
  },

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  },

  icon: {
    mode: 'svg'
  }
})
