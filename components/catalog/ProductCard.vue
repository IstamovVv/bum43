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

      <!-- Контейнер бейджей (верхний левый угол) -->
      <div class="absolute top-3 left-3 flex flex-col gap-2 items-start z-20">

        <!-- Скидка -->
        <span
            v-if="shouldShowDiscount"
            class="bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg flex items-baseline gap-0.5 w-fit"
        >
          <span class="text-sm leading-none">−</span>
          <span class="text-base leading-none tabular-nums">{{ discountValue }}%</span>
        </span>

        <!-- Пользовательский бейдж (New, Hit) -->
        <span
            v-if="product.badge"
            class="px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-900 text-white w-fit"
        >
          {{ product.badge }}
        </span>

        <!-- Индикатор остатков -->
        <span
            v-if="product.stock && product.stock < 5"
            class="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-gray-600 rounded-md text-[11px] font-medium border border-gray-100 w-fit"
        >
          Осталось: {{ product.stock }} шт.
        </span>
      </div>

      <!-- Кнопка "В избранное" -->
      <button
          class="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-white/90 backdrop-blur-sm text-gray-400 hover:text-red-600 hover:bg-white rounded-full shadow-md transition-all duration-300 hover:scale-110 active:scale-95 z-20 border border-transparent hover:border-red-100"
          :class="{ 'text-red-600 bg-red-50 border-red-200': isFavorite }"
          aria-label="Добавить в избранное"
          @click.prevent="toggleFavorite"
      >
        <Icon
            :name="isFavorite ? 'heroicons:heart-solid' : 'heroicons:heart'"
            class="w-5 h-5"
        />
      </button>

      <!-- Кнопка "Быстрый просмотр" (широкая плашка снизу, без затемнения) -->
      <button
          class="absolute bottom-3 left-3 right-3 z-20
                 px-4 py-2.5 bg-white/80 backdrop-blur-sm text-gray-700
                 text-sm font-semibold rounded-lg shadow-md
                 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0
                 transition-all duration-300 ease-out
                 hover:bg-white/95 hover:text-primary-600
                 hidden md:flex items-center justify-center gap-2 whitespace-nowrap overflow-hidden"
          aria-label="Быстрый просмотр товара"
          @click.prevent="handleQuickView"
      >
        <Icon name="heroicons:eye" class="w-4 h-4 flex-shrink-0" />
        <span class="truncate">Быстрый просмотр</span>
      </button>
    </NuxtLink>

    <!-- === КОНТЕНТ === -->
    <div
        class="flex flex-col flex-grow p-5"
        :class="variant === 'list' ? 'w-full md:w-2/3 justify-center border-l border-gray-100' : ''"
    >
      <!-- Категория -->
      <span v-if="product.category" class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
        {{ product.category }}
      </span>

      <!-- Заголовок -->
      <NuxtLink :to="`/product/${product.id}`" class="block mb-2 group/title">
        <h3 class="font-bold text-gray-900 text-lg leading-tight line-clamp-2 group-hover/title:text-primary-600 transition-colors min-h-[3rem]">
          {{ product.name }}
        </h3>
      </NuxtLink>

      <!-- Рейтинг -->
      <div v-if="product.rating" class="flex items-center gap-1 mb-3">
        <div class="flex text-yellow-400">
          <Icon v-for="n in 5" :key="n" :name="n <= product.rating ? 'heroicons:star-solid' : 'heroicons:star'" class="w-4 h-4" />
        </div>
        <span class="text-xs text-gray-500 ml-1">({{ product.reviewCount || 0 }})</span>
      </div>

      <!-- Описание -->
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
          <!-- Экономия -->
          <span v-if="product.oldPrice" class="text-xs text-gray-500 font-medium mt-1">
            Экономия {{ formatPrice(calculateSavings) }}
          </span>
        </div>
      </div>

      <!-- Кнопки действий -->
      <div class="flex gap-2 mt-2">
        <button
            :disabled="isAdding"
            class="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.98]"
            @click="addToCart"
        >
          <Icon v-if="!isAdding" name="heroicons:shopping-cart" class="w-5 h-5" />
          <Icon v-else name="heroicons:arrow-path" class="w-5 h-5 animate-spin" />
          <span>{{ isAdding ? 'Добавляем...' : 'В корзину' }}</span>
        </button>

        <!-- Кнопка "Купить в 1 клик" -->
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
    category?: string
    rating?: number
    reviewCount?: number
    stock?: number
  }
  variant?: 'grid' | 'list'
}>(), {
  variant: 'grid'
})

const emit = defineEmits<{
  (e: 'quick-view', productId: number): void
  (e: 'add-to-cart', productId: number): void
  (e: 'toggle-favorite', productId: number): void
}>()

const isFavorite = ref(false)
const isAdding = ref(false)

// === Вычисляемые свойства для скидки ===

const shouldShowDiscount = computed(() => {
  return !!(props.product.discount || (props.product.oldPrice && props.product.price))
})

const discountValue = computed(() => {
  if (props.product.discount) {
    const num = String(props.product.discount).replace(/[^0-9]/g, '')
    return num ? num : '0'
  }
  if (props.product.oldPrice && props.product.price) {
    const oldP = Number(String(props.product.oldPrice).replace(/[^0-9.]/g, ''))
    const newP = Number(String(props.product.price).replace(/[^0-9.]/g, ''))
    if (oldP > 0 && newP > 0 && oldP > newP) {
      return Math.round(((oldP - newP) / oldP) * 100)
    }
  }
  return '0'
})

const calculateSavings = computed(() => {
  if (!props.product.oldPrice || !props.product.price) return 0
  const oldP = Number(String(props.product.oldPrice).replace(/[^0-9.]/g, ''))
  const newP = Number(String(props.product.price).replace(/[^0-9.]/g, ''))
  return oldP - newP
})

const formatPrice = (value: number | string) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0
  }).format(Number(String(value).replace(/[^0-9.]/g, '')))
}

// === Обработчики ===

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
  emit('toggle-favorite', props.product.id)
}

const handleQuickView = () => {
  emit('quick-view', props.product.id)
}

const addToCart = async () => {
  if (isAdding.value) return
  isAdding.value = true
  emit('add-to-cart', props.product.id)

  // Имитация запроса
  await new Promise(resolve => setTimeout(resolve, 800))
  isAdding.value = false
}
</script>