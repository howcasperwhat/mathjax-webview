<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import MathJax from './components/MathJax.vue'
import ShikiEditor from './components/ShikiEditor.vue'
import * as config from './generated/meta'

const extension = acquireVsCodeApi()
const element = ref<Element | null>(null)

const tex = ref('')
function receive(event: MessageEvent) {
  const { type, data } = event.data
  if (type !== config.name)
    return
  tex.value = data
}

onMounted(() => {
  window.addEventListener('message', receive)
  extension.postMessage({ type: config.name })
})
onUnmounted(() => {
  window.removeEventListener('message', receive)
})
</script>

<template>
  <MathJax :tex="tex" @rendered="e => element = e" />
  <ShikiEditor v-model="tex" />
</template>

<style>
</style>
