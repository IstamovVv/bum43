<!-- components/catalog/BrandsGrid.vue -->
<template>
  <section class="mb-16">
    <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
      <span class="text-3xl">🏭</span>
      Популярные бренды
    </h2>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      <NuxtLink
          v-for="brand in brands"
          :key="brand.id"
          :to="`/brands/${brand.slug}`"
          class="brand-card bg-white border border-gray-200 rounded-lg p-4 text-center hover:border-primary-400 hover:shadow-md transition-all group"
      >
        <div class="text-3xl mb-1">{{ brand.countryFlag }}</div>
        <div class="font-bold text-gray-800 group-hover:text-primary-600 transition-colors text-sm">
          {{ brand.title }}
        </div>
        <div class="text-xs text-gray-500">{{ brand.country }}</div>
      </NuxtLink>
    </div>

    <div class="text-center mt-6">
      <NuxtLink to="/brands" class="inline-block text-primary-600 hover:text-primary-700 font-medium">
        Все бренды →
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Brand } from '~/types/catalog'

defineProps<{
  brands: Brand[]
}>()
</script>