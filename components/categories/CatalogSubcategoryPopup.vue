<!-- components/categories/CatalogSubcategoryPopup.vue -->
<template>
  <div
      class="subcategory-popup"
      :data-visible="isVisible"
  >
    <div class="p-2">
      <NuxtLink
          v-for="sub in subcategories"
          :key="sub.id"
          :to="`/catalog/${categoryId}/${sub.slug}`"
          class="subcategory-item"
      >
        <span class="subcategory-item__dot"></span>
        <span class="text-sm text-gray-700">{{ sub.title }}</span>
        <span class="text-xs text-gray-500 ml-auto">({{ sub.itemCount }})</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Subcategory } from '~/types/catalog'

defineProps<{
  subcategories?: Subcategory[]
  isVisible: boolean
  categoryId: string
}>()
</script>

<style scoped>
.subcategory-popup {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.2);
  border: 1px solid #e5e7eb;
  border-top: none;
  z-index: 100;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.25s ease;
  max-height: 500px;
  overflow-y: auto;
}

.subcategory-popup[data-visible="true"] {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.subcategory-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  transition: background 0.2s ease;
  text-decoration: none;
}

.subcategory-item:hover {
  background: #f3f4f6;
}

.subcategory-item__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #033975;
  flex-shrink: 0;
}
</style>