<!-- components/ProductCard.vue -->
<template>
  <NuxtLink
      :to="`/product/${product.id}`"
      class="group bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full"
      :class="variant === 'list' ? 'flex-row md:items-center' : 'flex-col'"
  >
    <!-- Изображение -->
    <div class="relative overflow-hidden bg-gray-100"
         :class="variant === 'list' ? 'w-1/3 min-h-[160px]' : 'w-full aspect-[4/3]'">

      <NuxtImg
          :src="product.image"
          :alt="product.name"
          width="400"
          height="300"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          preload
          format="webp"
          quality="80"
      />

      <!-- Бейджи -->
      <div class="absolute top-2 left-2 flex flex-col gap-1">
        <span v-if="product.discount" class="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold shadow-sm">
          {{ product.discount }}
        </span>
        <span v-if="product.badge" :class="`px-2 py-1 rounded text-xs font-bold shadow-sm ${product.badgeClass}`">
          {{ product.badge }}
        </span>
      </div>

      <!-- Кнопка "В избранное" -->
      <button class="absolute top-2 right-2 p-2 bg-white/90 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500">
        <Icon name="heroicons:heart" class="w-4 h-4" />
      </button>
    </div>

    <!-- Контент -->
    <div class="p-4 flex flex-col flex-grow" :class="variant === 'list' ? 'w-2/3 justify-center' : ''">
      <h3 class="font-medium text-gray-800 mb-1 line-clamp-2 group-hover:text-primary-600 transition-colors">
        {{ product.name }}
      </h3>
      <p class="text-xs text-gray-500 mb-3 line-clamp-1">{{ product.desc }}</p>

      <!-- Рейтинг -->
      <div class="flex items-center mb-3">
        <div class="flex text-yellow-400">
          <Icon
              v-for="i in 5"
              :key="i"
              name="heroicons:star"
              class="w-3 h-3"
              :class="i <= product.rating ? 'fill-current' : 'text-gray-300'"
          />
        </div>
        <span class="text-xs text-gray-400 ml-1">({{ product.reviews }})</span>
      </div>

      <!-- Цена и кнопка -->
      <div class="mt-auto flex items-end justify-between gap-2">
        <div>
          <span v-if="product.oldPrice" class="text-gray-400 line-through text-xs block">{{ product.oldPrice }}</span>
          <span class="text-lg font-bold text-primary-600">{{ product.price }}</span>
        </div>

        <button class="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-lg transition-colors flex items-center justify-center group/btn">
          <Icon name="heroicons:shopping-cart" class="w-5 h-5" />
          <span class="sr-only">В корзину</span>
        </button>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  product: {
    id: number
    name: string
    desc: string
    image: string
    price: string
    oldPrice?: string
    discount?: string
    badge?: string
    badgeClass?: string
    reviews: number
    rating: number
  }
  variant?: 'grid' | 'list'
}>(), {
  variant: 'grid'
})
</script>