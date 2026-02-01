<script setup lang="ts">
import type { IncomingHttpHeaders } from 'node:http'

const props = defineProps<{
  data: IncomingHttpHeaders
}>()

const { copy: _copy, copied } = useClipboard()
const copiedKey = ref<string | null>(null)

const entries = computed(() => Object.entries(props.data))

function copy(key: string, value: string) {
  _copy(value)
  copiedKey.value = key
}
</script>

<template>
  <div class="flex flex-col flex-1 overflow-y-auto">
    <div class="sticky top-0 z-10 flex border-b border-b-muted bg-default">
      <div
        class="flex flex-1 p-2 text-xs font-medium pl-6 border-r border-r-default"
      >
        Key
      </div>
      <div class="flex flex-1 p-2 text-xs font-medium pr-6">Value</div>
    </div>
    <div
      v-for="[key, value] in entries"
      :key="key"
      class="group/table flex text-muted hover:text-default transition-colors divide-x divide-default border-b border-b-default"
    >
      <div
        class="flex min-w-0 justify-between items-center flex-1 p-2 text-xs pl-6"
      >
        <span class="select-all truncate">
          {{ key }}
        </span>
      </div>
      <div
        class="flex min-w-0 justify-between items-center flex-1 p-2 text-xs pr-6"
      >
        <span class="select-all truncate">
          {{ value }}
        </span>
        <UButton
          :icon="copied && copiedKey === key ? 'i-ph-check' : 'i-ph-copy'"
          variant="ghost"
          size="xs"
          class="group-hover/table:inline-flex hidden -my-1"
          @click="copy(key, String(value))"
        />
      </div>
    </div>
  </div>
</template>
