<script setup lang="ts">
defineProps<{
  placeholder?: string
}>()

const model = defineModel<string>({ required: true })
</script>

<template>
  <div flex="~ items-center justify-center">
    <details w-full>
      <textarea
        v-model="model"
        w-full h-60 bg-hex-0000
        color-inherit resize-none
      />
    </details>
  </div>
</template>

<style scoped>
</style>
