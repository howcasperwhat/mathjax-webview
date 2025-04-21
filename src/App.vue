<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import Editor from './components/Editor.vue'
import MathJax from './components/MathJax.vue'
import * as config from './generated/meta'

const extension = acquireVsCodeApi()

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
  <Editor v-model="tex" placeholder="Enter LaTeX here" />
  <MathJax :tex="tex" />
</template>

<style>
</style>
