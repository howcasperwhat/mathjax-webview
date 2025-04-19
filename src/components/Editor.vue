<script setup lang="ts">
defineProps<{
  placeholder?: string
}>()

const model = defineModel<string>({ required: true })
</script>

<template>
  <div flex="~ items-center justify-center">
    <input v-model="model" :placeholder="placeholder">
  </div>
</template>

<style scoped>
</style>
