<script setup lang="ts">
interface Header {
  key: string
  value: string
  active: boolean
}

const props = defineProps<{
  modelValue: Header[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Header[]]
}>()

const headers = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

function onInput(index: number) {
  if (index === headers.value.length - 1) {
    addHeader()
  }
}

function addHeader() {
  const newHeaders = [...headers.value]

  newHeaders.push({
    key: '',
    value: '',
    active: true
  })

  emit('update:modelValue', newHeaders)
}

function removeHeader(index: number) {
  const newHeaders = [...headers.value]

  newHeaders.splice(index, 1)

  if (newHeaders.length === 0) {
    newHeaders.push({
      key: '',
      value: '',
      active: true
    })
  }

  emit('update:modelValue', newHeaders)
}
</script>

<template>
  <div class="flex flex-col flex-1 overflow-y-auto">
    <div
      class="sticky top-0 z-10 flex border-b border-b-muted divide-x divide-default bg-default"
    >
      <div class="flex p-2 text-xs font-medium pl-6 w-16" />
      <div class="flex flex-1 p-2 text-xs font-medium">Key</div>
      <div class="flex flex-1 p-2 text-xs font-medium pr-6">Value</div>
    </div>

    <div
      v-for="(header, index) in headers"
      :key="index"
      class="group/table flex text-muted hover:text-default transition-colors divide-x divide-default border-b border-b-default"
    >
      <div
        class="flex pl-6 w-16 justify-center items-center border-r border-r-default py-1"
      >
        <UCheckbox
          v-model="header.active"
          size="sm"
          :class="{ hidden: index === headers.length - 1 }"
        />
      </div>
      <div
        class="flex min-w-0 justify-between items-center flex-1 px-2 py-1 text-xs"
      >
        <UInput
          v-model="header.key"
          placeholder="Key"
          variant="ghost"
          size="xs"
          :ui="{ base: 'px-1' }"
          :class="{ 'opacity-50': !header.active }"
          class="-mx-1 flex-1"
          @input="onInput(index)"
        />
      </div>
      <div
        class="flex min-w-0 gap-2 items-center flex-1 px-2 py-1 text-xs pr-6"
      >
        <UInput
          v-model="header.value"
          placeholder="Value"
          variant="ghost"
          size="xs"
          :ui="{ base: 'px-1' }"
          :class="{ 'opacity-50': !header.active }"
          class="-mx-1 flex-1"
          @input="onInput(index)"
        />
        <UButton
          v-if="index < headers.length - 1"
          icon="ph:trash"
          variant="ghost"
          size="xs"
          class="-my-1"
          @click="removeHeader(index)"
        />
      </div>
    </div>
  </div>
</template>
