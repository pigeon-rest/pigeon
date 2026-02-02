<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'
import type { InternalApi } from 'nitropack'

const props = defineProps<{
  data: InternalApi['/api/proxy']['post']
}>()

const lang = ref(mimeToLang(props.data.response.body.mediaType || ''))

const responseItems = computed<TabsItem[]>(() => {
  const headers = props.data.response?.headers
  const headersCount = headers ? Object.keys(headers).length : 0

  return [
    {
      label: 'Body',
      slot: 'body'
    },
    {
      label: 'Headers',
      slot: 'headers',
      badge:
        headersCount > 0
          ? { label: headersCount.toString(), variant: 'soft' }
          : undefined
    }
  ]
})

watch(
  () => props.data.response.body.mediaType,
  (type) => {
    lang.value = mimeToLang(type || '')
  }
)
</script>

<template>
  <div class="relative flex-1 flex flex-col max-h-full">
    <ResponseStatusBar :data="props.data" />

    <UTabs
      size="xs"
      variant="link"
      class="flex-1 max-h-full"
      :items="responseItems"
      :ui="{
        trailingBadge: '-my-0.5',
        content: 'flex flex-col flex-1 overflow-auto'
      }"
    >
      <template #body>
        <ResponseBody
          v-model:lang="lang"
          :content="props.data.response.body.content"
          :content-type="props.data.response.body.mediaType"
        />
      </template>

      <template #headers>
        <ResponseHeaders :data="props.data.response.headers" />
      </template>
    </UTabs>
  </div>
</template>
