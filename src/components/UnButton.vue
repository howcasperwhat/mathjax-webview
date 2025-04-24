<script setup lang='ts'>
</script>

<template>
  <button
    flex="~ items-center justify-center"
    p="x-4 y-2"
    m-0 rd-2 c-inherit
    b="1 solid #8888"
    hover:b-color="#888a"
    active:b-color="#888f"
    bg-transparent
    cursor-pointer
    outline-none
    appearance-none
  >
    <slot />
  </button>
</template>
