<script setup lang="ts">
const title = 'Pigeon - API Request Client'
const description =
  'An easy-to-use API request client for testing and debugging your APIs.'

const colorMode = useColorMode()

const favicon = computed(() =>
  colorMode.value === 'dark' ? 'favicon-dark.ico' : 'favicon.ico'
)

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
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

const { data } = await useFetch<any>(
  'https://api.github.com/repos/pigeon-rest/pigeon'
)

const formatNumber = (value: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1
  })

  return formatter.format(value)
}
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

        <UTooltip text="GitHub Stars" arrow>
          <UButton
            to="https://github.com/pigeon-rest/pigeon"
            target="_blank"
            icon="i-ph-github-logo"
            :label="
              data.stargazers_count
                ? formatNumber(data.stargazers_count)
                : '...'
            "
            aria-label="GitHub"
            size="sm"
            color="neutral"
            variant="ghost"
          />
        </UTooltip>
      </template>
    </UDashboardNavbar>

    <UMain class="flex flex-col">
      <NuxtPage />
    </UMain>
  </UApp>
</template>
