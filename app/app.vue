<script setup>
const title = 'Pigeon - API Request Client'
const description =
  'An easy-to-use API request client for testing and debugging your APIs.'

const colorMode = useColorMode()

const favicon = computed(() =>
  colorMode.value === 'dark' ? 'favicon-dark.ico' : 'favicon.ico'
)

function toggleColorMode() {
  colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'
}

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

defineShortcuts({
  t: () => toggleColorMode()
})
</script>

<template>
  <UApp>
    <ShortcutsModal />

    <UDashboardNavbar title="Pigeon" :toggle="false">
      <template #leading>
        <UIcon name="i-ph-bird-fill" class="text-highlighted" />
      </template>

      <template #right>
        <UColorModeButton />

        <UButton
          to="https://github.com/pigeon-rest/pigeon"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UDashboardNavbar>

    <UMain class="flex flex-col">
      <NuxtPage />
    </UMain>
  </UApp>
</template>
