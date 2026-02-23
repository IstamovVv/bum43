<!-- components/categories/CategoriesCard.vue -->
<template>
  <NuxtLink
      :to="to"
      class="group relative flex flex-col items-center p-4 md:p-5 bg-white border border-gray-200 rounded-2xl hover:border-primary-300 hover:shadow-xl transition-all duration-300"
      :style="{ transitionDelay: `${delay}ms` }"
  >
    <!-- Изображение с оверлеем -->
    <div class="relative w-full aspect-square mb-4 overflow-hidden rounded-xl bg-gray-100">
      <NuxtImg
          :src="image"
          :alt="name"
          width="400"
          height="400"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          format="webp"
          quality="80"
      />

      <!-- Градиент-оверлей при наведении -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <!-- Счетчик товаров -->
      <span v-if="count" class="absolute bottom-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-bold text-gray-700 shadow-sm">
        {{ count }}+ товаров
      </span>

      <!-- Стрелка-индикатор -->
      <div class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 shadow-md">
        <Icon name="heroicons:arrow-right" class="w-4 h-4 text-primary-600" />
      </div>
    </div>

    <!-- Название категории -->
    <h3 class="font-bold text-gray-900 text-center text-base md:text-lg group-hover:text-primary-600 transition-colors">
      {{ name }}
    </h3>

    <!-- Подсказка при наведении (FIX: без CLS) -->
    <!-- Всегда в потоке, но невидима до hover -->
    <span class="mt-2 text-xs text-gray-400 text-center transition-opacity duration-200 opacity-0 group-hover:opacity-100 visibility-hidden group-hover:visibility-visible h-4 flex items-center justify-center">
      Перейти в раздел →
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router"

defineProps<{
  name: string
  image: string
  count?: number
  to?: RouteLocationRaw
  delay?: number
}>()
</script>