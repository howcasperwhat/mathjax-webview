<script setup lang="ts">
// You can also define props for other attributes like placeholder
defineProps<{
  placeholder?: string
}>()

// Use defineModel to create a two-way binding prop
// The first argument is the prop name ('modelValue' by default for v-model)
// The second argument provides options, like 'required' or 'type'
const model = defineModel<string>({ required: true })
</script>

<template>
  <div class="flex-center">
    <input v-model="model" :placeholder="placeholder">
  </div>
</template>

<style scoped>
</style>
