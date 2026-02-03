<script setup lang="ts">
const props = defineProps<{
  content: string
  mime: string
  ext?: string
}>()

const emit = defineEmits<{
  'update:content': [value: string]
  'update:mime': [value: string]
}>()

const isLineWrapped = ref(true)
const fileUploadRef = ref()
const contentTypes = ref(
  Object.keys(MIME_TYPES).filter((type) => type !== 'image/svg+xml')
)

defineShortcuts({
  meta_shift_f: () => formatContent(),
  meta_u: () => fileUploadRef.value.inputRef.click()
})

const mime = computed({
  get: () => props.mime,
  set: (value: string) => emit('update:mime', value)
})

const colorMode = useColorMode()
const codemirror = useCodeMirror({ theme: colorMode.value })
const { format } = usePrettier()

const editor = ref<HTMLElement | null>(null)

watch(editor, (el) => {
  if (el) {
    codemirror.initEditor(el, {
      content: props.content,
      lang: mimeToLang(props.mime),
      wrap: isLineWrapped.value,
      onChange: (newContent) => emit('update:content', newContent)
    })
  } else {
    codemirror.destroy()
  }
})

const file = ref<File | null>(null)

async function formatContent() {
  const formatted = await format(props.content, mimeToLang(props.mime))

  emit('update:content', formatted)
}

function onFileChange() {
  if (file.value) {
    const reader = new FileReader()

    reader.onload = (e) => {
      const result = e.target?.result

      if (typeof result === 'string') {
        emit('update:content', result)
        emit('update:mime', file.value?.type || 'text/plain')
      }
    }

    reader.readAsText(file.value)
  }
}

watch(colorMode, (theme) => codemirror.setTheme(theme.value))
watch(() => props.content, codemirror.setContent)
watch(
  () => props.mime,
  () => codemirror.setLanguage(mimeToLang(props.mime) || 'txt')
)
watch(isLineWrapped, codemirror.setLineWrapping)

onUnmounted(() => codemirror.destroy())
</script>

<template>
  <div class="flex flex-col px-6 pb-6 flex-1 max-h-full">
    <div class="flex justify-between py-2">
      <USelect
        v-model="mime"
        size="xs"
        variant="subtle"
        :items="contentTypes"
        :ui="{ content: 'w-fit' }"
      />

      <div class="flex items-center gap-1">
        <USwitch v-model="isLineWrapped" size="xs" label="Wrap Lines" />
        <USeparator orientation="vertical" class="h-6 mx-1" />
        <UTooltip arrow text="Format" :kbds="['meta', 'shift', 'f']">
          <UButton
            icon="i-ph-magic-wand"
            size="xs"
            variant="ghost"
            @click="formatContent"
          />
        </UTooltip>
        <UTooltip arrow text="Upload" :kbds="['ctrl', 'u']">
          <div class="inline-block">
            <UFileUpload
              ref="fileUploadRef"
              v-model="file"
              v-slot="{ open }"
              @change="onFileChange"
            >
              <UButton
                icon="i-ph-upload-simple"
                size="xs"
                variant="ghost"
                @click="open()"
              />
            </UFileUpload>
          </div>
        </UTooltip>
      </div>
    </div>
    <UCard
      :ui="{ body: 'p-0 sm:p-0 flex flex-1 max-h-full overflow-y-auto' }"
      class="flex flex-col flex-1 min-h-6"
    >
      <div ref="editor" class="flex flex-col w-full overflow-auto" />
    </UCard>
  </div>
</template>
