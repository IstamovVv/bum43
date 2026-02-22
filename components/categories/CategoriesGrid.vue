<!-- components/categories/CategoriesGrid.vue -->
<template>
  <section class="mb-16">
    <div class="flex items-end justify-between mb-6">
      <div>
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900">
          Категории товаров
        </h2>
        <p class="text-gray-500 mt-1">Выберите направление для просмотра ассортимента</p>
      </div>
      <NuxtLink to="/catalog" class="hidden sm:inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium text-sm">
        Весь каталог
        <Icon name="heroicons:arrow-right" class="w-4 h-4" />
      </NuxtLink>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      <CategoriesCard
          v-for="(category, index) in categories"
          :key="category.name"
          :name="category.name"
          :image="category.image"
          :count="category.count"
          :to="category.to || '/catalog'"
          :delay="index * 50"
      />
    </div>

    <div class="sm:hidden mt-6 text-center">
      <NuxtLink to="/catalog" class="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium text-sm">
        Весь каталог
        <Icon name="heroicons:arrow-right" class="w-4 h-4" />
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Category } from '~/types/catalog'

defineProps<{
  categories: Category[]
}>()
</script>