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
  meta_j: () => download(),
  'meta_.': () => copy(textContent.value)
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

const editor = ref<HTMLElement | null>(null)
const isLineWrapped = ref(true)

const { copy, copied } = useClipboard()
const colorMode = useColorMode()
const codemirror = useCodeMirror({ theme: colorMode.value, readOnly: true })

function download() {
  const blob = new Blob([uint8Content.value], {
    type: props.contentType || 'application/octet-stream'
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  const extension = mime.extension(props.contentType || '') || 'txt'

  link.href = url
  link.download = `response-${Date.now()}.${extension}`
  link.click()
  URL.revokeObjectURL(url)
}

watch([editor], ([el]) => {
  if (el) {
    codemirror.initEditor(el, {
      content: textContent.value,
      lang: props.lang,
      wrap: isLineWrapped.value,
      theme: colorMode.value
    })
  } else {
    codemirror.destroy()
  }
})

watch(textContent, (c) => codemirror.setContent(c))
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
    <UCard :ui="{ body: 'p-0 sm:p-0 flex h-full' }" class="min-h-6 flex-1">
      <div ref="editor" class="flex flex-col w-full overflow-auto" />
    </UCard>
  </div>
</template>
