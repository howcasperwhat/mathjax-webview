<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { transformer } from '../composable/transformer'

const props = defineProps<{
  tex: string
}>()

const html = ref('')

onMounted(() => {
  const element = transformer.from(props.tex).children[0]
  html.value = element.outerHTML
})
</script>

<template>
  <div class="container" v-html="html" />
</template>

<style>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
