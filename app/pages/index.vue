<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = v.object({
  url: v.pipe(v.string(), v.url('Invalid URL format')),
  method: v.picklist(
    ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    'Invalid HTTP method'
  )
})

type Schema = v.InferOutput<typeof schema>

const methods = ref<Schema['method'][]>([
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
  'HEAD',
  'OPTIONS'
])
const state = reactive<Schema>({
  url: '',
  method: 'GET'
})

const { isLoading, response, send, abort } = usePigeon()

async function onSubmit({ data }: FormSubmitEvent<Schema>) {
  await send({ ...data })
}
</script>

<template>
  <div class="flex flex-col flex-1">
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
            :ui="{ base: 'rounded-r-none' }"
            class="w-28 shrink-0"
          />
        </UFormField>
        <UFormField name="url" class="flex-1" :error="false">
          <UInput
            v-model="state.url"
            :ui="{ base: 'rounded-l-none' }"
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

    <div class="relative flex flex-col flex-1 border-t border-t-muted">
      <UProgress v-if="isLoading" size="2xs" animation="carousel" class="absolute -top-px" />
    </div>
  </div>
</template>
