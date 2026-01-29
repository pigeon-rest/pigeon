<script setup lang="ts">
import { Collapsible } from 'reka-ui/namespaced'

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
      { name: 'Select HEAD method', kbds: ['alt', 'h'] }
    ]
  },
  {
    name: 'Response',
    items: [
      { name: 'Download response as file', kbds: ['meta', 'j'] },
      { name: 'Copy response to clipboard', kbds: ['meta', '.'] },
      { name: 'Toggle line wrapping', kbds: ['alt', 'z'] },
      { name: 'Toggle response preview', kbds: ['meta', 'shift', 'v'] }
    ]
  }
])

defineShortcuts({
  '?': () => (open.value = !open.value)
})
</script>

<template>
  <UModal v-model:open="open" title="Keyboard Shortcuts">
    <template #body>
      <div class="flex flex-col gap-y-3">
        <Collapsible.Root
          v-for="group in groups"
          default-open
          :key="group.name"
        >
          <Collapsible.Trigger
            class="group flex items-center gap-x-2 w-full text-sm font-medium hover:text-highlighted transition-colors duration-200"
          >
            <UIcon
              name="i-ph-caret-right"
              size="12"
              class="text-muted group-hover:text-highlighted group-data-[state=open]:rotate-90 transition duration-200"
            />
            {{ group.name }}
          </Collapsible.Trigger>

          <Collapsible.Content
            class="flex flex-col gap-y-2 mt-2 data-[state=open]:animate-[collapsible-down_200ms_ease-out] data-[state=closed]:animate-[collapsible-up_200ms_ease-out] overflow-hidden"
          >
            <div
              v-for="shortcut in group.items"
              :key="shortcut.name"
              class="flex justify-between items-center"
            >
              <span class="text-xs text-muted">
                {{ shortcut.name }}
              </span>
              <div class="flex gap-x-2">
                <UKbd
                  v-for="kbd in shortcut.kbds"
                  :key="kbd"
                  variant="subtle"
                  class="font-kbd"
                  :value="kbd"
                />
              </div>
            </div>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>
    </template>
  </UModal>
</template>
