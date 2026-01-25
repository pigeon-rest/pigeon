<script setup lang="ts">
const props = defineProps<{
  value: string
}>()

const slots = defineSlots<{
  fallback(props: {}): any
}>()

const { data, pending } = useAsyncData(async () => parseMarkdown(props.value), {
  watch: [() => props.value]
})
</script>

<template>
  <div v-if="!data || pending">
    <slot name="fallback" />
  </div>
  <MDCRenderer v-else :body="data.body" :data="data.data" />
</template>
