<!-- components/ProductCard.vue -->
<template>
  <div
      class="group relative flex flex-col h-full bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-primary-200 transition-all duration-300"
      :class="variant === 'list' ? 'flex-row md:flex-row' : 'flex-col'"
  >

    <!-- === БЛОК ИЗОБРАЖЕНИЯ === -->
    <NuxtLink
        :to="`/product/${product.id}`"
        class="relative block overflow-hidden bg-gray-100 flex-shrink-0"
        :class="variant === 'list' ? 'w-full md:w-1/3 min-h-[240px]' : 'w-full aspect-[4/3]'"
        aria-label="Подробнее о товаре {{ product.name }}"
    >
      <!-- Изображение с эффектом зума -->
      <NuxtImg
          :src="product.image"
          :alt="product.name"
          width="500"
          height="400"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          format="webp"
          quality="85"
      />

      <!-- Контейнер бейджей -->
      <div class="absolute top-3 left-3 flex flex-col gap-2 z-20">
        <!-- Скидка (автоматический расчет, если не передан текст) -->
        <span
            v-if="product.discount || discountPercentage"
            class="bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg uppercase tracking-wide"
        >
          {{ product.discount || `-${discountPercentage}%` }}
        </span>

        <!-- Пользовательский бейдж (New, Hit и т.д.) -->
        <span
            v-if="product.badge"
            class="px-3 py-1.5 rounded-lg text-xs font-bold shadow-md bg-blue-600 text-white"
            :class="product.badgeClass"
        >
          {{ product.badge }}
        </span>

        <!-- Триггер дефицита (Scarcity) -->
        <span
            v-if="product.stock && product.stock < 5"
            class="bg-orange-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-md animate-pulse"
        >
          Осталось: {{ product.stock }} шт.
        </span>
      </div>

      <!-- Кнопка "В избранное" -->
      <button
          @click.prevent="toggleFavorite"
          class="absolute top-3 right-3 p-2.5 bg-white/90 backdrop-blur-sm text-gray-400 hover:text-red-500 hover:bg-white rounded-full shadow-md transition-all duration-300 hover:scale-110 active:scale-95 z-20"
          :class="{ 'text-red-500 bg-red-50': isFavorite }"
          aria-label="Добавить в избранное"
      >
        <Icon
            :name="isFavorite ? 'heroicons:heart-solid' : 'heroicons:heart'"
            class="w-5 h-5"
        />
      </button>

      <!-- Оверлей "Быстрый просмотр" (только Desktop) -->
      <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 hidden md:flex">
        <span class="bg-white text-gray-900 px-6 py-2 rounded-full font-bold text-sm shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          Быстрый просмотр
        </span>
      </div>
    </NuxtLink>

    <!-- === КОНТЕНТ (Инфо + Цена + Кнопки) === -->
    <div
        class="flex flex-col flex-grow p-5"
        :class="variant === 'list' ? 'w-full md:w-2/3 justify-center border-l border-gray-100' : ''"
    >
      <!-- Категория / Бренд -->
      <span v-if="product.category" class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
        {{ product.category }}
      </span>

      <!-- Заголовок -->
      <NuxtLink :to="`/product/${product.id}`" class="block mb-2 group/title">
        <h3 class="font-bold text-gray-900 text-lg leading-tight line-clamp-2 group-hover/title:text-primary-600 transition-colors min-h-[3rem]">
          {{ product.name }}
        </h3>
      </NuxtLink>

      <!-- Рейтинг (Social Proof) -->
      <div v-if="product.rating" class="flex items-center gap-1 mb-3">
        <div class="flex text-yellow-400">
          <Icon v-for="n in 5" :key="n" :name="n <= product.rating ? 'heroicons:star-solid' : 'heroicons:star'" class="w-4 h-4" />
        </div>
        <span class="text-xs text-gray-500 ml-1">({{ product.reviewCount || 0 }})</span>
      </div>

      <!-- Описание (адаптивная обрезка) -->
      <p
          class="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow"
          :class="variant === 'grid' ? 'line-clamp-2' : 'line-clamp-3'"
      >
        {{ product.desc }}
      </p>

      <!-- Блок цены -->
      <div class="mt-auto flex items-end justify-between gap-4 mb-4">
        <div class="flex flex-col">
          <div class="flex items-baseline gap-2">
            <span class="text-2xl font-extrabold text-gray-900">{{ formatPrice(product.price) }}</span>
            <span v-if="product.oldPrice" class="text-sm text-gray-400 line-through font-medium">{{ formatPrice(product.oldPrice) }}</span>
          </div>
          <!-- Сообщение об экономии -->
          <span v-if="product.oldPrice" class="text-xs text-green-600 font-medium mt-1">
            Вы экономите {{ formatPrice(calculateSavings) }}
          </span>
        </div>
      </div>

      <!-- Кнопки действий -->
      <div class="flex gap-2 mt-2">
        <button
            @click="addToCart"
            :disabled="isAdding"
            class="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          <Icon v-if="!isAdding" name="heroicons:shopping-cart" class="w-5 h-5" />
          <Icon v-else name="heroicons:arrow-path" class="w-5 h-5 animate-spin" />
          <span>{{ isAdding ? 'Добавляем...' : 'В корзину' }}</span>
        </button>

        <!-- Кнопка "Купить в 1 клик" (для повышения конверсии) -->
        <button
            class="hidden md:flex items-center justify-center p-3 border border-gray-200 rounded-xl hover:border-primary-600 hover:text-primary-600 transition-colors"
            title="Купить в 1 клик"
        >
          <Icon name="heroicons:bolt" class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = withDefaults(defineProps<{
  product: {
    id: number
    name: string
    desc: string
    image: string
    price: number | string
    oldPrice?: number | string
    discount?: string
    badge?: string
    badgeClass?: string
    category?: string
    rating?: number
    reviewCount?: number
    stock?: number
  }
  variant?: 'grid' | 'list'
}>(), {
  variant: 'grid'
})

// Локальное состояние
const isFavorite = ref(false)
const isAdding = ref(false)

// Вычисляемые свойства для маркетинга
const discountPercentage = computed(() => {
  if (!props.product.oldPrice || !props.product.price) return null
  const oldP = Number(props.product.oldPrice)
  const newP = Number(props.product.price)
  if (oldP === 0) return 0
  return Math.round(((oldP - newP) / oldP) * 100)
})

const calculateSavings = computed(() => {
  if (!props.product.oldPrice || !props.product.price) return 0
  return Number(props.product.oldPrice) - Number(props.product.price)
})

// Утилиты
const formatPrice = (value: number | string) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0
  }).format(Number(value))
}

// Методы
const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
  // Здесь вызов API для добавления в избранное
}

const addToCart = async () => {
  if (isAdding.value) return
  isAdding.value = true

  // Имитация запроса к серверу
  await new Promise(resolve => setTimeout(resolve, 800))

  // Логика добавления в корзину (Pinia/Vuex)
  console.log(`Product ${props.product.id} added to cart`)

  isAdding.value = false
}
</script>