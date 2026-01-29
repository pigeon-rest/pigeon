<script setup lang="ts">
import mime from 'mime-types'

const props = defineProps<{
  content: number[]
  lang: string
  contentType?: string
}>()

const emit = defineEmits<{
  'update:lang': [lang: string]
}>()

defineShortcuts({
  alt_z: () => (isLineWrapped.value = !isLineWrapped.value),
  meta_j: () => download(),
  'meta_.': () => copy(textContent.value),
  meta_shift_v: () => (showPreview.value = !showPreview.value)
})

const lang = computed({
  get: () => props.lang,
  set: (value: string) => emit('update:lang', value)
})
const uint8Content = computed(() => new Uint8Array(props.content))
const textContent = computed(() => {
  if (uint8Content.value.length === 0) return ''

  try {
    return new TextDecoder().decode(uint8Content.value)
  } catch {
    return ''
  }
})

const mimeType = computed(() => props.contentType || 'application/octet-stream')
const isPreviewable = computed(
  () =>
    isImageMimeType(mimeType.value) ||
    isPDFMimeType(mimeType.value) ||
    isHTMLMimeType(mimeType.value) ||
    isSVGMimeType(mimeType.value) ||
    isAudioMimeType(mimeType.value) ||
    isVideoMimeType(mimeType.value)
)

const editor = ref<HTMLElement | null>(null)
const isLineWrapped = ref(true)
const previewUrl = ref<string | null>(null)
const showPreview = ref(true)

const formattedContent = computed(() => {
  if (props.lang === 'json') {
    try {
      const obj = JSON.parse(textContent.value)
      return JSON.stringify(obj, null, 2)
    } catch {
      return textContent.value
    }
  }

  return textContent.value
})

const { copy, copied } = useClipboard()
const colorMode = useColorMode()
const codemirror = useCodeMirror({ theme: colorMode.value, readOnly: true })

function download() {
  const blob = new Blob([uint8Content.value], { type: mimeType.value })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  const extension = mime.extension(mimeType.value) || 'txt'

  link.href = url
  link.download = `response-${Date.now()}.${extension}`
  link.click()
  URL.revokeObjectURL(url)
}

watchEffect((onCleanup) => {
  if (isPreviewable.value && uint8Content.value.length > 0) {
    const blob = new Blob([uint8Content.value], { type: mimeType.value })

    previewUrl.value = URL.createObjectURL(blob)

    onCleanup(() => {
      if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
    })
  }
})

watch([editor, isPreviewable, showPreview], ([el, previewable, show]) => {
  if (el && !(previewable && show)) {
    codemirror.initEditor(el, {
      content: formattedContent.value,
      lang: props.lang,
      wrap: isLineWrapped.value,
      theme: colorMode.value
    })
  } else {
    codemirror.destroy()
  }
})

watch(formattedContent, (c) => codemirror.setContent(c))
watch(lang, (l) => codemirror.setLanguage(l))
watch(isLineWrapped, (w) => codemirror.setLineWrapping(w))
watch(colorMode, (m) => codemirror.setTheme(m.value))

onUnmounted(codemirror.destroy)
</script>

<template>
  <div class="flex flex-col px-6 pb-6 flex-1 max-h-full">
    <div class="flex justify-between py-2">
      <USelect
        v-model="lang"
        :items="LANGUAGE_OPTIONS"
        size="xs"
        variant="subtle"
        class="w-24"
      />

      <div class="flex items-center gap-1">
        <template v-if="isPreviewable">
          <UCheckbox v-model="showPreview" size="sm" label="Preview" />
          <USeparator orientation="vertical" class="h-6 mx-1" />
        </template>
        <USwitch v-model="isLineWrapped" size="xs" label="Wrap Lines" />
        <USeparator orientation="vertical" class="h-6 mx-1" />
        <UTooltip arrow text="Download" :kbds="['ctrl', 'J']">
          <UButton
            icon="i-ph-download-simple"
            size="xs"
            variant="ghost"
            @click="download"
          />
        </UTooltip>
        <UTooltip arrow text="Copy" :kbds="['ctrl', '.']">
          <UButton
            :icon="copied ? 'i-ph-check' : 'i-ph-copy'"
            size="xs"
            variant="ghost"
            @click="copy(textContent)"
          />
        </UTooltip>
      </div>
    </div>
    <UCard
      :ui="{ body: 'p-0 sm:p-0 flex h-full overflow-auto' }"
      class="min-h-6 flex-1"
    >
      <template v-if="isPreviewable && showPreview && previewUrl">
        <img
          v-if="isImageMimeType(mimeType)"
          :src="previewUrl"
          class="self-center min-h-25 h-fit max-h-full mx-auto"
        />
        <embed
          v-else-if="isPDFMimeType(mimeType)"
          :src="previewUrl"
          type="application/pdf"
          class="flex-1"
        />
        <iframe
          v-else-if="isHTMLMimeType(mimeType)"
          :src="previewUrl"
          sandbox="allow-scripts allow-forms"
          class="flex-1"
        />
        <img
          v-else-if="isSVGMimeType(mimeType)"
          :src="`data:image/svg+xml;base64,${uint8Content.toBase64()}`"
          class="self-center max-h-full mx-auto"
        />
        <audio
          v-else-if="isAudioMimeType(mimeType)"
          :src="previewUrl"
          class="self-center h-fit mx-auto"
          controls
        />
        <video
          v-else-if="isVideoMimeType(mimeType)"
          :src="previewUrl"
          class="self-center min-h-50 h-fit max-h-full mx-auto"
          controls
        />
      </template>
      <div v-else ref="editor" class="flex flex-col w-full overflow-auto" />
    </UCard>
  </div>
</template>
