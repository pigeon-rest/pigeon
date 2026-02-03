<script setup lang="ts">
import type { SetCookie } from 'cookie-es'
import type { SerializeObject } from 'nitropack'

const props = defineProps<{
  data: SerializeObject<SetCookie>[] | null | undefined
}>()

const columns = [
  { label: 'Name', align: 'left' },
  { label: 'Value', align: 'left' },
  { label: 'Domain', align: 'left' },
  { label: 'Path', align: 'left' },
  { label: 'Expires', align: 'left' },
  { label: 'HttpOnly', align: 'center' },
  { label: 'Secure', align: 'center' },
  { label: 'SameSite', align: 'left' }
]
</script>

<template>
  <div class="flex flex-col flex-1 overflow-y-auto">
    <template v-if="props.data && props.data.length">
      <div
        class="sticky top-0 z-10 flex divide-x divide-default border-b border-b-muted bg-default"
      >
        <div
          v-for="column in columns"
          :key="column.label"
          class="flex flex-1 p-2 text-xs font-medium capitalize first:pl-6 last:pr-6"
          :class="{
            'justify-center': column.align === 'center',
            'justify-start': column.align === 'left'
          }"
        >
          {{ column.label }}
        </div>
      </div>
      <div
        v-for="cookie in props.data"
        :key="cookie.name"
        class="group/table flex text-muted hover:text-default transition-colors divide-x divide-default border-b border-b-default"
      >
        <div
          class="flex min-w-0 justify-between items-center flex-1 p-2 text-xs first:pl-6 last:pr-6"
        >
          <span class="select-all truncate">
            {{ cookie.name }}
          </span>
        </div>
        <div
          class="flex min-w-0 justify-between items-center flex-1 p-2 text-xs first:pl-6 last:pr-6"
        >
          <span class="select-all truncate">
            {{ cookie.value }}
          </span>
        </div>
        <div
          class="flex min-w-0 justify-between items-center flex-1 p-2 text-xs first:pl-6 last:pr-6"
        >
          <span class="select-all truncate">
            {{ cookie.domain || 'N/A' }}
          </span>
        </div>
        <div
          class="flex min-w-0 justify-between items-center flex-1 p-2 text-xs first:pl-6 last:pr-6"
        >
          <span class="select-all truncate">
            {{ cookie.path || 'N/A' }}
          </span>
        </div>
        <div
          class="flex min-w-0 justify-between items-center flex-1 p-2 text-xs first:pl-6 last:pr-6"
        >
          <NuxtTime
            v-if="cookie.expires"
            :datetime="cookie.expires"
            weekday="short"
            day="2-digit"
            month="short"
            year="numeric"
            hour="numeric"
            minute="2-digit"
            second="numeric"
            locale="en-US"
            time-zone-name="short"
            time-zone="GMT"
            class="select-all truncate"
          />
          <span v-else class="select-all truncate"> Session </span>
        </div>
        <div
          class="flex min-w-0 justify-center items-center flex-1 p-2 text-xs first:pl-6 last:pr-6"
        >
          <UIcon :name="cookie.httpOnly ? 'i-ph-check' : 'i-ph-x'" />
        </div>
        <div
          class="flex min-w-0 justify-center items-center flex-1 p-2 text-xs first:pl-6 last:pr-6"
        >
          <UIcon :name="cookie.secure ? 'i-ph-check' : 'i-ph-x'" />
        </div>
        <div
          class="flex min-w-0 justify-between items-center flex-1 p-2 text-xs first:pl-6 last:pr-6"
        >
          <span class="select-all truncate capitalize">
            {{ cookie.sameSite || 'Lax' }}
          </span>
        </div>
      </div>
    </template>
    <UEmpty
      v-else
      variant="naked"
      icon="i-ph-cookie"
      title="No cookies set"
      description="The response did not include any cookies."
      class="flex-1"
    />
  </div>
</template>
