<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { transformer } from '../composable/transformer'

const props = defineProps<{
  tex: string
}>()

const html = ref(props.tex)

onMounted(() => {
  watch(() => props.tex, () => {
    const element = transformer.from(props.tex).children[0]
    html.value = element.outerHTML
  })
})
</script>

<template>
  <div class="flex-center" v-html="html" />
</template>

<style scoped>
</style>
