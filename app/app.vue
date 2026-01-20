<script setup>
const title = 'Pigeon - API Request Client'
const description =
  'An easy-to-use API request client for testing and debugging your APIs.'

const isDark = usePreferredDark()
const favicon = computed(() =>
  isDark.value ? 'favicon-dark.ico' : 'favicon.ico'
)

useFavicon(favicon)

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <UMain>
      <NuxtPage />
    </UMain>
  </UApp>
</template>
