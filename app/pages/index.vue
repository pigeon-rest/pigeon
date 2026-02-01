<script setup lang="ts">
import { Splitter } from 'reka-ui/namespaced'
import * as v from 'valibot'

import type { FormSubmitEvent, SelectItem, TabsItem } from '@nuxt/ui'

const schema = v.object({
  url: v.pipe(v.string(), v.url('Invalid URL format')),
  method: v.picklist(
    ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    'Invalid HTTP method'
  )
})

type Schema = v.InferOutput<typeof schema>

const { isLoading, response, error, send, abort } = usePigeon()

const methods = ref([
  {
    label: 'GET',
    value: 'GET',
    ui: {
      itemLabel: 'font-medium text-blue-600 dark:text-blue-400'
    }
  },
  {
    label: 'POST',
    value: 'POST',
    ui: {
      itemLabel: 'font-medium text-green-600 dark:text-green-400'
    }
  },
  {
    label: 'PUT',
    value: 'PUT',
    ui: {
      itemLabel: 'font-medium text-yellow-600 dark:text-yellow-400'
    }
  },
  {
    label: 'PATCH',
    value: 'PATCH',
    ui: {
      itemLabel: 'font-medium text-teal-600 dark:text-teal-400'
    }
  },
  {
    label: 'DELETE',
    value: 'DELETE',
    ui: {
      itemLabel: 'font-medium text-red-600 dark:text-red-400'
    }
  },
  {
    label: 'HEAD',
    value: 'HEAD',
    ui: {
      itemLabel: 'font-medium text-purple-600 dark:text-purple-400'
    }
  },
  {
    label: 'OPTIONS',
    value: 'OPTIONS',
    ui: {
      itemLabel: 'font-medium text-gray-600 dark:text-gray-400'
    }
  }
] satisfies SelectItem[])
const lang = ref(
  languageFromContentType(response.value?.response.body.mediaType || '')
)

const requestBodyContent = ref('')
const requestBodyLang = ref('json')

const form = useTemplateRef('form')

const state = reactive<Schema>({
  url: '',
  method: 'GET'
})

const requestItems = computed<TabsItem[]>(() => [
  {
    label: 'Body',
    slot: 'body'
  }
])
const responseItems = computed<TabsItem[]>(() => [
  {
    label: 'Body',
    slot: 'body'
  },
  {
    label: 'Headers',
    slot: 'headers',
    badge: response.value
      ? {
          label: Object.keys(response.value.response.headers).length.toString(),
          variant: 'soft'
        }
      : undefined
  }
])

defineShortcuts({
  meta_enter: () => form.value?.submit(),
  alt_arrowup: () => nextMethod(),
  alt_arrowdown: () => previousMethod(),
  alt_g: () => (state.method = 'GET'),
  alt_p: () => (state.method = 'POST'),
  alt_u: () => (state.method = 'PUT'),
  alt_x: () => (state.method = 'DELETE'),
  alt_h: () => (state.method = 'HEAD')
})

function getMethodClass(method: string) {
  return methods.value.find((m) => m.value === method)?.ui.itemLabel
}

function nextMethod() {
  const currentIndex = methods.value.findIndex((m) => m.value === state.method)
  const nextIndex = (currentIndex + 1) % methods.value.length

  state.method = methods.value[nextIndex]!.value as typeof state.method
}

function previousMethod() {
  const currentIndex = methods.value.findIndex((m) => m.value === state.method)
  const previousIndex =
    (currentIndex - 1 + methods.value.length) % methods.value.length

  state.method = methods.value[previousIndex]!.value as typeof state.method
}

async function onSubmit({ data }: FormSubmitEvent<Schema>) {
  await send({ ...data })
}

watch(
  () => response.value?.response.body.mediaType,
  (type) => {
    lang.value = languageFromContentType(type || '')
  }
)
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
          <div class="flex flex-col flex-1 max-h-full">
            <UForm
              ref="form"
              class="relative flex gap-2 px-6 py-4"
              :schema="schema"
              :state="state"
              @submit.prevent="onSubmit"
            >
              <div class="flex w-full">
                <UFormField name="method" :error="false">
                  <USelect
                    v-model="state.method"
                    class="w-28 shrink-0"
                    :items="methods"
                    :ui="{ base: 'rounded-e-none' }"
                  >
                    <template #default="{ modelValue }">
                      <span
                        class="font-medium"
                        :class="getMethodClass(modelValue!)"
                      >
                        {{ modelValue }}
                      </span>
                    </template>
                  </USelect>
                </UFormField>
                <UFormField name="url" class="flex-1" :error="false">
                  <UInput
                    v-model="state.url"
                    class="w-full"
                    :ui="{ base: 'rounded-s-none -ms-px' }"
                  />
                </UFormField>
              </div>
              <UButton
                v-if="isLoading"
                variant="soft"
                label="Cancel"
                class="w-20 shrink-0"
                block
                @click="abort()"
              />
              <UButton
                v-else
                type="submit"
                icon="i-ph-paper-plane-tilt"
                label="Send"
                class="w-20 shrink-0"
                block
              />

              <UProgress
                v-if="isLoading"
                size="2xs"
                animation="carousel"
                class="absolute z-10 -bottom-px -mx-6"
              />
            </UForm>

            <div
              class="relative flex flex-col flex-1 border-t border-accented overflow-y-hidden"
            >
              <UTabs
                size="xs"
                variant="link"
                class="flex-1 max-h-full"
                :items="requestItems"
                :ui="{
                  trailingBadge: '-my-0.5',
                  content: 'flex flex-col flex-1 overflow-y-hidden'
                }"
              >
                <template #body>
                  <RequestBody
                    v-model:content="requestBodyContent"
                    v-model:lang="requestBodyLang"
                  />
                </template>
              </UTabs>
            </div>
          </div>
        </Splitter.Panel>

        <Splitter.ResizeHandle
          id="splitter-group-resize-handle"
          class="relative h-px bg-accented group"
        />

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
          <div
            v-else-if="response"
            class="relative flex-1 flex flex-col max-h-full"
          >
            <ResponseStatusBar :data="response" />

            <UTabs
              size="xs"
              variant="link"
              class="flex-1 max-h-full"
              :items="responseItems"
              :ui="{
                trailingBadge: '-my-0.5',
                content: 'flex flex-col flex-1 overflow-auto'
              }"
            >
              <template #body>
                <ResponseBody
                  v-model:lang="lang"
                  :content="response.response.body.content"
                  :content-type="response.response.body.mediaType"
                />
              </template>

              <template #headers>
                <ResponseHeaders :data="response.response.headers" />
              </template>
            </UTabs>
          </div>
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
