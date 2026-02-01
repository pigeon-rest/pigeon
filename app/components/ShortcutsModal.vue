<script setup lang="ts">
const open = ref(false)
const groups = ref([
  {
    name: 'General',
    items: [
      { name: 'Keyboard shortcuts', kbds: ['?'] },
      { name: 'Toggle appearance', kbds: ['t'] }
    ]
  },
  {
    name: 'Request',
    items: [
      { name: 'Send request', kbds: ['meta', 'enter'] },
      { name: 'Select next method', kbds: ['alt', 'arrowup'] },
      { name: 'Select previous method', kbds: ['alt', 'arrowdown'] },
      { name: 'Select GET method', kbds: ['alt', 'g'] },
      { name: 'Select POST method', kbds: ['alt', 'p'] },
      { name: 'Select PUT method', kbds: ['alt', 'u'] },
      { name: 'Select DELETE method', kbds: ['alt', 'x'] },
      { name: 'Select HEAD method', kbds: ['alt', 'h'] },
      { name: 'Upload file', kbds: ['ctrl', 'u'] }
    ]
  },
  {
    name: 'Response',
    items: [
      { name: 'Download response as file', kbds: ['meta', 'j'] },
      { name: 'Copy response to clipboard', kbds: ['meta', '.'] },
      { name: 'Toggle response preview', kbds: ['meta', 'shift', 'v'] }
    ]
  }
])

defineShortcuts({
  '?': () => (open.value = !open.value)
})
</script>

<template>
  <UModal
    v-model:open="open"
    title="Keyboard Shortcuts"
    :ui="{
      title: 'inline-flex gap-x-2 items-center',
      body: 'flex flex-col gap-y-3'
    }"
  >
    <template #title>
      <UIcon name="i-ph-keyboard" class="text-muted" />
      Keyboard Shortcuts
    </template>

    <template #body>
      <UCollapsible
        v-for="group in groups"
        :key="group.name"
        default-open
        class="flex flex-col gap-2 w-full"
        :ui="{
          content: 'flex flex-col gap-y-2'
        }"
      >
        <UButton
          :label="group.name"
          color="neutral"
          variant="link"
          leading-icon="i-ph-caret-right"
          class="group"
          :ui="{
            base: 'p-0',
            leadingIcon:
              'size-3 group-data-[state=open]:rotate-90 transition-transform duration-200'
          }"
        />

        <template #content>
          <div
            v-for="shortcut in group.items"
            :key="shortcut.name"
            class="flex justify-between items-center"
          >
            <span class="text-xs">
              {{ shortcut.name }}
            </span>
            <div class="flex gap-x-2">
              <UKbd
                v-for="(kbd, index) in shortcut.kbds"
                :key="index"
                :value="kbd"
              />
            </div>
          </div>
        </template>
      </UCollapsible>
    </template>
  </UModal>
</template>
