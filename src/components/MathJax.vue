<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { transformer } from '../composable/transformer'

const props = defineProps<{
  tex: string
}>()
const emits = defineEmits<{
  (e: 'rendered', elem: Element): void
}>()
const html = ref(props.tex)

onMounted(() => {
  watch(() => props.tex, () => {
    const element = transformer.from(props.tex).children[0]
    html.value = element.outerHTML
    emits('rendered', element)
  })
})
</script>

<template>
  <div
    flex="~ items-center justify-center"
    m-4
    v-html="html"
  />
</template>

<style scoped>
</style>
