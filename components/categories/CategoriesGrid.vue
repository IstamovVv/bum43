<!-- components/categories/CategoriesGrid.vue -->
<template>
  <section class="mb-16">
    <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
      <span class="text-3xl">📦</span>
      Категории товаров
    </h2>

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <CategoriesCard
          v-for="category in categories"
          :key="category.name"
          :name="category.name"
          :image="category.image"
          to="/catalog"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Category } from '~/types/catalog'

defineProps<{
  categories: Category[]
}>()
</script>