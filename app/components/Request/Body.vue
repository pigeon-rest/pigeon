<script setup lang="ts">
const props = defineProps<{
  content: string
  lang: string
  ext?: string
}>()

const emit = defineEmits<{
  'update:content': [value: string]
  'update:lang': [value: string]
}>()

const isLineWrapped = ref(true)
const fileUploadRef = ref()

defineShortcuts({
  meta_shift_f: () => formatContent(),
  meta_u: () => fileUploadRef.value.inputRef.click()
})

const lang = computed({
  get: () => props.lang,
  set: (value: string) => emit('update:lang', value)
})

const colorMode = useColorMode()
const codemirror = useCodeMirror({ theme: colorMode.value })
const { format } = usePrettier()

const editor = ref<HTMLElement | null>(null)

watch(editor, (el) => {
  if (el) {
    codemirror.initEditor(el, {
      content: props.content,
      lang: props.lang,
      wrap: isLineWrapped.value,
      onChange: (newContent) => emit('update:content', newContent)
    })
  } else {
    codemirror.destroy()
  }
})

const file = ref<File | null>(null)

async function formatContent() {
  const formatted = await format(props.content, props.lang)

  emit('update:content', formatted)
}

function onFileChange() {
  if (file.value) {
    const reader = new FileReader()

    reader.onload = (e) => {
      const result = e.target?.result

      if (typeof result === 'string') {
        emit('update:content', result)
        emit('update:lang', languageFromContentType(file.value?.type || ''))
      }
    }

    reader.readAsText(file.value)
  }
}

watch(colorMode, (theme) => codemirror.setTheme(theme.value))
watch(() => props.content, codemirror.setContent)
watch(() => props.lang, codemirror.setLanguage)
watch(isLineWrapped, codemirror.setLineWrapping)

onUnmounted(() => codemirror.destroy())
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
