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

function getMethodClass(method: string) {
  return methods.value.find((m) => m.value === method)?.ui.itemLabel
}

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
  }
])

const { isLoading, response, send, abort } = usePigeon()

async function onSubmit({ data }: FormSubmitEvent<Schema>) {
  await send({ ...data })
}
</script>

<template>
  <div class="flex flex-col flex-1">
    <div class="relative flex flex-col flex-1">
      <Splitter.Group id="splitter-group" direction="vertical" class="flex-1">
        <Splitter.Panel
          id="splitter-group-request"
          :min-size="14"
          class="relative flex flex-col max-h-full"
        >
          <UForm
            :schema="schema"
            :state="state"
            @submit.prevent="onSubmit"
            class="flex gap-2 px-6 py-4"
          >
            <div class="flex w-full">
              <UFormField name="method" :error="false">
                <USelect
                  v-model="state.method"
                  :items="methods"
                  :ui="{ base: 'rounded-e-none' }"
                  class="w-28 shrink-0"
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
                  :ui="{ base: 'rounded-s-none -ms-px' }"
                  class="w-full"
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
          </UForm>

          <div class="relative border-t border-accented">
            <UProgress
              v-if="isLoading"
              size="2xs"
              animation="carousel"
              class="absolute -top-px"
            />

            <UTabs
              size="xs"
              variant="link"
              :items="requestItems"
              :ui="{
                trailingBadge: '-my-0.5',
                content: 'flex flex-col flex-1 overflow-auto'
              }"
            />
          </div>
        </Splitter.Panel>

        <Splitter.ResizeHandle
          id="splitter-group-resize-handle"
          class="relative h-px bg-accented group"
        ></Splitter.ResizeHandle>

        <Splitter.Panel
          id="splitter-group-response"
          :min-size="20"
          class="relative flex flex-col"
        >
          <UTabs
            size="xs"
            variant="link"
            :items="responseItems"
            :ui="{
              trailingBadge: '-my-0.5',
              content: 'flex flex-col flex-1 overflow-auto'
            }"
          ></UTabs>
        </Splitter.Panel>
      </Splitter.Group>
    </div>
  </div>
</template>
