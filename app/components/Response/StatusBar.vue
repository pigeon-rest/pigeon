<script setup lang="ts">
import prettyBytes from 'pretty-bytes'
import prettyMs from 'pretty-ms'

import type { InternalApi } from 'nitropack'

const props = defineProps<{
  data: InternalApi['/api/proxy']['post']
}>()

const formatMs = (ms: number) => {
  return prettyMs(ms).replace(/([0-9])([a-z])/g, '$1 $2')
}

const formatDate = (dateStr?: string) => {
  if (!dateStr) return ''

  return new Date(dateStr).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: 'numeric',
    timeZoneName: 'short',
    timeZone: 'GMT'
  })
}

const timingItems = computed(() => [
  {
    label: 'Response Time',
    value: formatMs(props.data.response.meta.timings.total),
    highlight: true
  },
  { label: 'Queueing', value: formatMs(props.data.response.meta.timings.wait) },
  {
    label: 'DNS Lookup',
    value: formatMs(props.data.response.meta.timings.dns)
  },
  {
    label: 'TCP Connection',
    value: formatMs(props.data.response.meta.timings.tcp)
  },
  {
    label: 'SSL/TLS Handshake',
    value: formatMs(props.data.response.meta.timings.tls)
  },
  {
    label: 'Upload',
    value: formatMs(props.data.response.meta.timings.request)
  },
  {
    label: 'Waiting (TTFB)',
    value: formatMs(props.data.response.meta.timings.firstByte)
  },
  {
    label: 'Download',
    value: formatMs(props.data.response.meta.timings.download)
  }
])

const responseSizeItems = computed(() => [
  {
    label: 'Response Size',
    value: prettyBytes(props.data.response.meta.size.total),
    highlight: true
  },
  {
    label: 'Headers',
    value: prettyBytes(props.data.response.meta.size.headers)
  },
  { label: 'Body', value: prettyBytes(props.data.response.meta.size.body) }
])

const requestSizeItems = computed(() => [
  {
    label: 'Request Size',
    value: prettyBytes(props.data.request.meta.size.total),
    highlight: true
  },
  {
    label: 'Headers',
    value: prettyBytes(props.data.request.meta.size.headers)
  },
  { label: 'Body', value: prettyBytes(props.data.request.meta.size.body) }
])

const networkItems = computed(() => {
  const net = props.data.response.meta.network
  const items = [
    { label: 'HTTP Version', value: net.httpVersion },
    { label: 'Local Address', value: net.localAddress },
    { label: 'Remote Address', value: net.remoteAddress },
    { label: 'TLS Protocol', value: net.tlsProtocol },
    { label: 'Cipher Name', value: net.cipherName }
  ]

  if (net.certificate) {
    items.push(
      { label: 'Certificate CN', value: net.certificate.cn },
      { label: 'Issuer CN', value: net.certificate.issuer },
      { label: 'Valid Until', value: formatDate(net.certificate.validUntil) }
    )
  }

  return items.filter((i) => i.value)
})
</script>

<template>
  <div class="absolute top-0 right-6 flex items-center py-1 z-1">
    <UPopover mode="hover">
      <UBadge
        :color="getStatusColor(props.data.response.status)"
        variant="subtle"
        class="select-none"
      >
        {{ props.data.response.status }} {{ props.data.response.statusText }}
      </UBadge>

      <template #content>
        <div class="flex gap-2 p-4 max-w-64">
          <UIcon
            :name="getStatusIcon(props.data.response.status)"
            size="12"
            class="shrink-0 my-0.5"
            :class="`text-${getStatusColor(props.data.response.status)}`"
          />
          <div class="flex flex-col gap-2">
            <div class="flex gap-6 justify-between">
              <div class="text-xs font-medium">
                {{ props.data.response.status }}
                {{ props.data.response.statusText }}
              </div>
            </div>
            <div class="flex justify-between text-muted text-xs text-pretty">
              <Markdown
                :value="getStatusDescription(props.data.response.status)"
              >
                <template #fallback>
                  <USkeleton class="h-3 w-51 mb-2" />
                  <USkeleton class="h-3 w-51 mb-2" />
                  <USkeleton class="h-3 w-24" />
                </template>
              </Markdown>
            </div>
          </div>
        </div>
      </template>
    </UPopover>

    <UIcon name="i-ph-dot-outline-fill" class="text-dimmed" />

    <UPopover mode="hover">
      <span class="text-muted text-xs select-none hover:underline">
        {{ formatMs(props.data.response.meta.timings.total) }}
      </span>

      <template #content>
        <div class="flex gap-2 p-4 min-w-64">
          <UIcon
            name="i-ph-timer"
            size="12"
            class="text-muted my-0.5 shrink-0"
          />
          <dl class="flex flex-col gap-2 flex-1">
            <div
              v-for="item in timingItems"
              :key="item.label"
              class="flex gap-4 justify-between text-xs"
              :class="item.highlight ? 'font-medium' : 'text-muted'"
            >
              <dt>{{ item.label }}</dt>
              <dd>{{ item.value }}</dd>
            </div>
          </dl>
        </div>
      </template>
    </UPopover>

    <UIcon name="i-ph-dot-outline-fill" class="text-dimmed" />

    <UPopover mode="hover" :ui="{ content: 'space-y-4' }">
      <span class="text-muted text-xs select-none hover:underline">
        {{ prettyBytes(props.data.response.meta.size.total) }}
      </span>

      <template #content>
        <div class="flex gap-2 px-4 pt-4 min-w-64">
          <UIcon
            name="i-ph-arrow-line-down"
            size="12"
            class="text-muted my-0.5 shrink-0"
          />
          <dl class="flex flex-col gap-2 flex-1">
            <div
              v-for="item in responseSizeItems"
              :key="item.label"
              class="flex gap-4 justify-between text-xs"
              :class="item.highlight ? 'font-medium' : 'text-muted'"
            >
              <dt>{{ item.label }}</dt>
              <dd>{{ item.value }}</dd>
            </div>
          </dl>
        </div>
        <div class="flex gap-2 px-4 pb-4 min-w-64">
          <UIcon
            name="i-ph-arrow-line-up"
            size="12"
            class="text-muted my-0.5 shrink-0"
          />
          <dl class="flex flex-col gap-2 flex-1">
            <div
              v-for="item in requestSizeItems"
              :key="item.label"
              class="flex gap-4 justify-between text-xs"
              :class="item.highlight ? 'font-medium' : 'text-muted'"
            >
              <dt>{{ item.label }}</dt>
              <dd>{{ item.value }}</dd>
            </div>
          </dl>
        </div>
      </template>
    </UPopover>

    <UIcon name="i-ph-dot-outline-fill" class="text-dimmed" />

    <UPopover mode="hover">
      <UIcon
        :name="
          props.data.response.meta.network.tlsProtocol
            ? 'i-ph-lock-key'
            : 'i-ph-lock-simple-open'
        "
        class="text-muted hover:underline"
      />

      <template #content>
        <div class="flex gap-2 p-4 max-w-76">
          <UIcon
            name="i-ph-lock-key"
            size="12"
            class="shrink-0 text-muted my-0.5"
          />
          <div class="flex flex-col gap-2">
            <div class="font-medium text-xs">Network</div>
            <dl class="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-2">
              <template v-for="item in networkItems" :key="item.label">
                <dt class="text-xs text-muted">{{ item.label }}</dt>
                <dd class="text-xs text-muted wrap-anywhere">
                  {{ item.value }}
                </dd>
              </template>
            </dl>
          </div>
        </div>
      </template>
    </UPopover>
  </div>
</template>
