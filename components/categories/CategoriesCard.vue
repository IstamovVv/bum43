<template>
  <NuxtLink :to="to" class="catalog-card group flex flex-col gap-4 items-center p-4 rounded-xl transition-all duration-300 ease-out cursor-pointer hover:shadow-lg hover:-translate-y-1">
    <div class="image-wrapper relative w-full aspect-square overflow-hidden rounded-lg bg-gray-100">
      <NuxtImg
          :src="image"
          :alt="name"
          width="400"
          height="400"
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          preload
          loading="lazy"
          format="webp"
          quality="80"
      />
    </div>
    <h3 class="font-normal text-center text-base sm:text-lg">{{ name }}</h3>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";

defineProps<{
  name: string
  image: string
  to?: RouteLocationRaw
}>()
</script>

<style scoped>
.catalog-card:hover {
  box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}

/* Опционально: плавное появление изображения */
:deep(.image-wrapper img) {
  transition: opacity 0.3s ease-in;
}
</style>