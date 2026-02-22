<!-- components/categories/BrandsGrid.vue -->
<template>
  <section class="mb-16">
    <div class="flex items-end justify-between mb-6">
      <div>
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900">
          Популярные бренды
        </h2>
        <p class="text-gray-500 mt-1">Работаем только с проверенными производителями</p>
      </div>
      <NuxtLink to="/brands" class="hidden sm:inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium text-sm">
        Все бренды
        <Icon name="heroicons:arrow-right" class="w-4 h-4" />
      </NuxtLink>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
      <NuxtLink
          v-for="brand in brands"
          :key="brand.id"
          :to="`/brands/${brand.slug}`"
          class="group flex flex-col items-center p-4 bg-white border border-gray-200 rounded-xl hover:border-primary-300 hover:shadow-lg transition-all duration-300"
      >
        <!-- Логотип бренда (заглушка или изображение) -->
        <div class="w-16 h-16 mb-3 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
          <img
              v-if="brand.logo"
              :src="brand.logo"
              :alt="brand.title"
              class="w-full h-full object-contain p-2"
              loading="lazy"
          />
          <span v-else class="text-2xl">{{ brand.countryFlag }}</span>
        </div>

        <!-- Название -->
        <div class="font-bold text-gray-900 text-sm text-center group-hover:text-primary-600 transition-colors mb-0.5">
          {{ brand.title }}
        </div>

        <!-- Страна + количество товаров -->
        <div class="flex items-center gap-1 text-xs text-gray-500">
          <span>{{ brand.country }}</span>
          <span v-if="brand.productCount" class="text-gray-300">•</span>
          <span v-if="brand.productCount" class="text-gray-400">{{ brand.productCount }} товаров</span>
        </div>

        <!-- Индикатор популярности (опционально) -->
        <div v-if="brand.isPopular" class="mt-2 flex items-center gap-1">
          <Icon name="heroicons:star-solid" class="w-3 h-3 text-yellow-400" />
          <span class="text-[10px] text-gray-400">Популярный</span>
        </div>
      </NuxtLink>
    </div>

    <div class="sm:hidden mt-6 text-center">
      <NuxtLink to="/brands" class="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium text-sm">
        Все бренды
        <Icon name="heroicons:arrow-right" class="w-4 h-4" />
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