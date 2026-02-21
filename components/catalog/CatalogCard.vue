<!-- components/catalog/CatalogCard.vue -->
<template>
  <article
      class="category-card bg-white rounded-xl shadow-md border border-gray-200"
      :data-category="category.slug"
      :data-search="searchText"
  >
    <div
        class="rounded-t-xl p-4 text-center"
        :style="{ background: category.gradient }"
    >
      <div class="text-4xl mb-2">{{ category.icon }}</div>
      <h3 class="text-lg font-bold text-primary-700 mb-1">
        <NuxtLink :to="`/catalog/${category.slug}`" class="hover:text-primary-600 transition-colors">
          {{ category.title }}
        </NuxtLink>
      </h3>
      <p class="text-gray-600 text-xs mb-2">{{ category.description }}</p>
      <div class="flex items-center justify-center gap-2 text-xs">
        <span
            v-if="category.isHot"
            class="bg-accent-100 text-accent-700 px-2 py-1 rounded"
        >
          🔥 {{ category.itemCount }}
        </span>
        <span v-else class="bg-primary-100 text-primary-700 px-2 py-1 rounded">
          {{ category.itemCount }} товаров
        </span>
        <span v-if="category.priceFrom" class="text-gray-500">от {{ category.priceFrom }}</span>
      </div>
    </div>

    <div class="p-3 border-t border-gray-200">
      <button
          @click="handleToggle"
          class="w-full text-xs text-primary-600 hover:text-primary-700 font-medium text-center py-2"
      >
        {{ isExpanded(category.id) ? 'Скрыть подкатегории' : 'Показать подкатегории' }}
      </button>
    </div>

    <CatalogSubcategoryPopup
        :subcategories="category.subcategories"
        :is-visible="isExpanded(category.id)"
        :category-id="category.id"
    />
  </article>
</template>

<script setup lang="ts">
import type { Category } from '~/types/catalog'

const props = defineProps<{
  category: Category
}>()

const { toggleSubcategories, isExpanded } = useSubcategories()

const searchText = computed(() => {
  const subcats = props.category.subcategories?.map(s => s.title).join(' ') || ''
  return `${props.category.title} ${props.category.description} ${subcats}`.toLowerCase()
})

const handleToggle = () => {
  toggleSubcategories(props.category.id.toString())
}
</script>