<script setup lang="ts">
import { Splitter } from 'reka-ui/namespaced'

const { response, error } = usePigeon()
</script>

<template>
  <div class="flex flex-col flex-1">
    <div class="relative flex flex-col flex-1">
      <Splitter.Group id="splitter-group" direction="vertical" class="flex-1">
        <Splitter.Panel
          id="splitter-group-request"
          class="relative flex flex-col"
          :min-size="14"
        >
          <Request />
        </Splitter.Panel>

        <Splitter.ResizeHandle
          id="splitter-group-resize-handle"
          class="relative h-px bg-accented group"
        >
          <div
            class="absolute z-20 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex px-0.5 bg-elevated border border-muted rounded-sm transition-opacity opacity-0 group-data-[state=hover]:opacity-100 group-data-[state=drag]:opacity-100"
          >
            <UIcon name="i-ph-dots-six" class="text-muted" />
          </div>
        </Splitter.ResizeHandle>

        <Splitter.Panel
          id="splitter-group-response"
          class="relative flex flex-col"
          :min-size="20"
        >
          <div
            v-if="error"
            class="flex flex-col flex-1 max-h-full overflow-auto"
          >
            <UEmpty
              variant="naked"
              class="flex-1"
              :title="error.statusMessage"
              :description="error.message"
              :ui="{ header: 'max-w-xl' }"
            >
              <template #leading>
                <span
                  class="inline-flex items-center justify-center select-none rounded-full align-middle bg-error/10 shrink-0 mb-2 size-10 text-xl"
                >
                  <UIcon name="i-ph-globe-x" class="text-error" />
                </span>
              </template>

              <template #description>
                <Markdown :value="error.message">
                  <template #fallback>
                    <USkeleton class="h-4 w-md mb-2" />
                    <USkeleton class="h-4 w-2xs mx-auto" />
                  </template>
                </Markdown>
              </template>
            </UEmpty>
          </div>
          <Response v-else-if="response" :data="response" />
          <div v-else class="flex flex-col flex-1 max-h-full overflow-auto">
            <UEmpty
              variant="naked"
              icon="i-ph-bird"
              title="Send a request to see the response"
              description="Use the form above to send an HTTP request and view the response details here."
              class="flex-1"
              :ui="{ header: 'max-w-xl' }"
            >
              <template #actions>
                <div class="flex items-center gap-x-1.5">
                  <span class="text-xs text-highlighted">
                    Keyboard shortcuts
                  </span>
                  <span class="text-xs text-highlighted">·</span>
                  <UKbd value="?" size="sm" />
                </div>
              </template>
            </UEmpty>
          </div>
        </Splitter.Panel>
      </Splitter.Group>
    </div>
  </div>
</template>
