<script setup lang="ts">
defineProps<{
  name: string,
  image: any,
}>()
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <img :src="image" :alt="name"/>
    <h3 class="font-normal">{{ name }}</h3>
  </div>
</template>

<style scoped>

</style>