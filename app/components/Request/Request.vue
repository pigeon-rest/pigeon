<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent, SelectItem, TabsItem } from '@nuxt/ui'

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

const schema = v.object({
  url: v.pipe(v.string(), v.url('Invalid URL format')),
  method: v.picklist(
    ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    'Invalid HTTP method'
  )
})

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

const requestBodyContent = ref('')
const requestBodyMime = ref('application/json')
const requestHeaders = ref([
  {
    key: '',
    value: '',
    active: true
  }
])

type Schema = v.InferOutput<typeof schema>

const state = reactive<Schema>({
  url: '',
  method: 'GET'
})

const form = useTemplateRef('form')

const requestItems = computed<TabsItem[]>(() => {
  const activeHeadersCount = requestHeaders.value.filter(
    (h) => h.active && h.key
  ).length

  return [
    {
      label: 'Body',
      slot: 'body'
    },
    {
      label: 'Headers',
      slot: 'headers',
      badge:
        activeHeadersCount > 0
          ? {
              label: activeHeadersCount.toString(),
              variant: 'soft'
            }
          : undefined
    }
  ]
})

const headers = computed(() =>
  requestHeaders.value.reduce<Record<string, string>>((acc, header) => {
    if (header.active && header.key) {
      acc[header.key.toLowerCase()] = header.value
    }
    return acc
  }, {})
)

const { isLoading, send, abort } = usePigeon()

async function onSubmit({ data }: FormSubmitEvent<Schema>) {
  await send({
    ...data,
    body: requestBodyContent.value,
    headers: {
      ...(requestBodyContent.value
        ? { 'content-type': requestBodyMime.value }
        : {}),
      ...headers.value
    }
  })
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

function getMethodClass(method: string) {
  return methods.value.find((m) => m.value === method)?.ui.itemLabel
}
</script>

<template>
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
              <span class="font-medium" :class="getMethodClass(modelValue!)">
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
            v-model:mime="requestBodyMime"
          />
        </template>

        <template #headers>
          <RequestHeaders v-model="requestHeaders" />
        </template>
      </UTabs>
    </div>
  </div>
</template>
