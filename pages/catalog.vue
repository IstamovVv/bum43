<!-- pages/catalog.vue -->
<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Хлебные крошки -->
      <nav class="flex mb-6 text-sm text-gray-500" aria-label="Breadcrumb">
        <ol class="flex items-center gap-2">
          <li><NuxtLink to="/" class="hover:text-primary-600 transition-colors">Главная</NuxtLink></li>
          <li><Icon name="heroicons:chevron-right" class="w-4 h-4 text-gray-300" /></li>
          <li class="text-gray-900 font-medium" aria-current="page">Каталог товаров</li>
        </ol>
      </nav>

      <!-- Заголовок каталога -->
      <div class="mb-6">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Каталог товаров</h1>
        <p class="text-gray-500 mt-1">Строительные материалы от проверенных производителей</p>
      </div>

      <div class="flex flex-col md:flex-row gap-6">

        <!-- SIDEBAR: Фильтры -->
        <aside class="w-full md:w-64 flex-shrink-0">
          <!-- Мобильная кнопка фильтров -->
          <button
              class="md:hidden w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg mb-4 font-medium shadow-sm"
              aria-expanded="mobileFiltersOpen"
              @click="mobileFiltersOpen = !mobileFiltersOpen"
          >
            <span>Фильтры</span>
            <Icon :name="mobileFiltersOpen ? 'heroicons:chevron-up' : 'heroicons:chevron-down'" class="w-5 h-5" />
          </button>

          <!-- Панель фильтров -->
          <div :class="['bg-white p-5 rounded-xl border border-gray-200 shadow-sm', mobileFiltersOpen ? 'block' : 'hidden md:block']">
            <div class="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
              <h3 class="font-bold text-lg">Фильтры</h3>
              <button
                  class="text-xs text-primary-600 hover:text-primary-700 font-medium hover:underline"
                  @click="resetFilters"
              >
                Сбросить
              </button>
            </div>

            <!-- Категория -->
            <div class="mb-6">
              <h4 class="font-medium mb-3 text-sm text-gray-700">Категория</h4>
              <div class="space-y-2 max-h-48 overflow-y-auto pr-2">
                <label v-for="cat in categories" :key="cat" class="flex items-center gap-3 cursor-pointer group">
                  <input
                      v-model="filters.categories"
                      type="checkbox"
                      :value="cat"
                      class="rounded text-primary-600 focus:ring-primary-500 w-4 h-4 cursor-pointer"
                  >
                  <span class="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{{ cat }}</span>
                  <span class="ml-auto text-xs text-gray-400">{{ getProductCountByCategory(cat) }}</span>
                </label>
              </div>
            </div>

            <!-- Цена -->
            <div class="mb-6">
              <h4 class="font-medium mb-3 text-sm text-gray-700">Цена, ₽</h4>
              <div class="space-y-3">
                <div class="flex items-center gap-2">
                  <input
                      v-model.number="filters.priceMin"
                      type="number"
                      placeholder="От"
                      class="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow"
                  >
                  <span class="text-gray-300">—</span>
                  <input
                      v-model.number="filters.priceMax"
                      type="number"
                      placeholder="До"
                      class="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow"
                  >
                </div>
                <!-- Визуальный индикатор диапазона (опционально) -->
                <div class="h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div class="h-full bg-primary-500 rounded-full" style="width: 60%"/>
                </div>
              </div>
            </div>

            <!-- Наличие -->
            <div class="mb-6">
              <h4 class="font-medium mb-3 text-sm text-gray-700">Наличие</h4>
              <label class="flex items-center gap-3 cursor-pointer">
                <input
                    v-model="filters.inStockOnly"
                    type="checkbox"
                    class="rounded text-primary-600 focus:ring-primary-500 w-4 h-4"
                >
                <span class="text-sm text-gray-600">Только в наличии</span>
              </label>
            </div>

            <!-- Рейтинг -->
            <div>
              <h4 class="font-medium mb-3 text-sm text-gray-700">Рейтинг</h4>
              <div class="space-y-2">
                <label v-for="rating in [4, 3, 2]" :key="rating" class="flex items-center gap-2 cursor-pointer">
                  <input
                      v-model="filters.minRating"
                      type="radio"
                      name="minRating"
                      :value="rating"
                      class="text-primary-600 focus:ring-primary-500 w-4 h-4"
                  >
                  <div class="flex text-yellow-400">
                    <Icon v-for="n in 5" :key="n" :name="n <= rating ? 'heroicons:star-solid' : 'heroicons:star'" class="w-4 h-4" />
                  </div>
                  <span class="text-sm text-gray-500">и выше</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        <!-- MAIN: Товары -->
        <main class="flex-grow">

          <!-- Toolbar -->
          <div class="bg-white p-4 rounded-xl border border-gray-200 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
            <span class="text-sm text-gray-600">
              Найдено: <strong class="text-gray-900">{{ filteredProducts.length }}</strong> товаров
              <span v-if="activeFiltersCount > 0" class="ml-2 text-xs text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
                {{ activeFiltersCount }} фильтр{{ activeFiltersCount === 1 ? '' : 'а' }}
              </span>
            </span>

            <div class="flex items-center gap-3 w-full sm:w-auto">
              <!-- Сортировка -->
              <div class="relative">
                <select
                    v-model="sortBy"
                    class="appearance-none p-2.5 pl-3 pr-8 border border-gray-200 rounded-lg text-sm bg-transparent focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none cursor-pointer hover:border-gray-300 transition-colors"
                >
                  <option value="popular">По популярности</option>
                  <option value="price-asc">Сначала дешевле</option>
                  <option value="price-desc">Сначала дороже</option>
                  <option value="rating">По рейтингу</option>
                  <option value="newest">Сначала новинки</option>
                </select>
                <Icon name="heroicons:chevron-down" class="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              <!-- Переключатель вида -->
              <div class="flex bg-gray-100 rounded-lg p-1" role="tablist" aria-label="Вид отображения">
                <button
                    role="tab"
                    :aria-selected="viewMode === 'grid'"
                    :class="['p-2 rounded-md transition-all', viewMode === 'grid' ? 'bg-white shadow text-primary-600' : 'text-gray-400 hover:text-gray-600']"
                    title="Плитка"
                    @click="viewMode = 'grid'"
                >
                  <Icon name="heroicons:squares-2x2" class="w-5 h-5" />
                </button>
                <button
                    role="tab"
                    :aria-selected="viewMode === 'list'"
                    :class="['p-2 rounded-md transition-all', viewMode === 'list' ? 'bg-white shadow text-primary-600' : 'text-gray-400 hover:text-gray-600']"
                    title="Список"
                    @click="viewMode = 'list'"
                >
                  <Icon name="heroicons:bars-3" class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <!-- Активные фильтры (теги) -->
          <div v-if="activeFiltersCount > 0" class="flex flex-wrap gap-2 mb-4">
            <span
                v-for="cat in filters.categories"
                :key="cat"
                class="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium"
            >
              {{ cat }}
              <button class="hover:text-primary-900" @click="removeCategoryFilter(cat)">
                <Icon name="heroicons:x-mark" class="w-3.5 h-3.5" />
              </button>
            </span>
            <span v-if="filters.priceMin || filters.priceMax" class="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
              Цена: {{ filters.priceMin || '0' }} — {{ filters.priceMax || '∞' }} ₽
              <button class="hover:text-gray-900" @click="filters.priceMin = null; filters.priceMax = null">
                <Icon name="heroicons:x-mark" class="w-3.5 h-3.5" />
              </button>
            </span>
          </div>

          <!-- Сетка товаров -->
          <Transition mode="out-in" name="fade">
            <div v-if="filteredProducts.length > 0" class="grid gap-6" :class="gridClasses">
              <ProductCard
                  v-for="product in paginatedProducts"
                  :key="product.id"
                  :product="product"
                  :variant="viewMode"
              />
            </div>
            <!-- Пустое состояние -->
            <div v-else class="col-span-full text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
              <Icon name="heroicons:magnifying-glass" class="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 class="text-lg font-medium text-gray-900 mb-2">Товары не найдены</h3>
              <p class="text-gray-500 mb-4">Попробуйте изменить параметры фильтрации</p>
              <button class="text-primary-600 font-medium hover:underline" @click="resetFilters">
                Сбросить все фильтры
              </button>
            </div>
          </Transition>

          <!-- Пагинация -->
          <div v-if="totalPages > 1" class="mt-10 flex justify-center">
            <nav class="flex items-center gap-2" aria-label="Пагинация">
              <button
                  :disabled="currentPage === 1"
                  class="p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Предыдущая страница"
                  @click="currentPage--"
              >
                <Icon name="heroicons:chevron-left" class="w-5 h-5" />
              </button>

              <template v-for="page in visiblePages" :key="page">
                <button
                    v-if="page === currentPage"
                    class="w-10 h-10 bg-primary-600 text-white rounded-lg font-medium shadow-sm"
                    aria-current="page"
                >
                  {{ page }}
                </button>
                <button
                    v-else-if="page !== '...'"
                    class="w-10 h-10 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
                    @click="currentPage = page as number"
                >
                  {{ page }}
                </button>
                <span v-else class="px-2 text-gray-400">...</span>
              </template>

              <button
                  :disabled="currentPage === totalPages"
                  class="p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Следующая страница"
                  @click="currentPage++"
              >
                <Icon name="heroicons:chevron-right" class="w-5 h-5" />
              </button>
            </nav>
          </div>

        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

// === Типы ===
interface Product {
  id: number
  name: string
  desc: string
  image: string
  price: number
  oldPrice?: number
  discount?: string
  badge?: string
  badgeClass?: string
  category: string
  rating: number
  reviewCount: number
  stock: number
  isPopular?: boolean
  isNew?: boolean
  createdAt: string
}

interface Filters {
  categories: string[]
  priceMin: number | null
  priceMax: number | null
  inStockOnly: boolean
  minRating: number | null
}

// === Состояние ===
const viewMode = ref<'grid' | 'list'>('grid')
const mobileFiltersOpen = ref(false)
const sortBy = ref('popular')
const currentPage = ref(1)
const itemsPerPage = 9

const categories = ['Стеновые панели', 'Водостоки', 'Кровля', 'Фундамент', 'Утеплитель', 'Фасадные системы']

const filters = ref<Filters>({
  categories: [],
  priceMin: null,
  priceMax: null,
  inStockOnly: false,
  minRating: null
})

// === Mock данные (в реальности — запрос к API) ===
const products: Product[] = [
  {
    id: 1,
    name: 'Сэндвич-панели ПВХ откосы',
    desc: 'Длина 3 м, толщина 10 мм, белый цвет. Идеально подходят для отделки оконных проемов.',
    image: '/images/catalog/siding/siding_v1.png',
    price: 1400,
    oldPrice: 1490,
    category: 'Стеновые панели',
    rating: 4.8,
    reviewCount: 124,
    stock: 45,
    isPopular: true,
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    name: 'Водосточная система Альта',
    desc: 'Желоб 125 мм белый, комплект. Надёжная защита фасада от дождя и снега.',
    image: '/images/catalog/siding/siding_v2.png',
    price: 102,
    oldPrice: 120,
    category: 'Водостоки',
    rating: 4.5,
    reviewCount: 89,
    stock: 3, // Мало товара — триггер дефицита
    isNew: true,
    createdAt: '2024-02-01'
  },
  {
    id: 3,
    name: 'Фасадная панель NS Кирпич',
    desc: 'Размер 380×380 мм, текстура камня. Премиальное покрытие с защитой от УФ.',
    image: '/images/catalog/siding/siding_v3.png',
    price: 680,
    oldPrice: 850,
    category: 'Фасадные системы',
    rating: 4.9,
    reviewCount: 256,
    stock: 120,
    isPopular: true,
    createdAt: '2024-01-20'
  },
  {
    id: 4,
    name: 'Утеплитель базальтовый 50мм',
    desc: 'Плотность 35 кг/м³, негорючий материал. Для стен, перекрытий и кровли.',
    image: '/images/catalog/siding/siding_v4.png',
    price: 890,
    category: 'Утеплитель',
    rating: 4.7,
    reviewCount: 67,
    stock: 200,
    createdAt: '2024-01-10'
  },
  {
    id: 5,
    name: 'Фундаментные блоки ФБС',
    desc: 'Размер 200×200×400 мм, марка М200. Для ленточных фундаментов.',
    image: '/images/catalog/siding/siding_v5.png',
    price: 450,
    category: 'Фундамент',
    rating: 4.3,
    reviewCount: 34,
    stock: 0, // Нет в наличии
    createdAt: '2024-01-05'
  },
  {
    id: 6,
    name: 'Металлочерепица Монтеррей',
    desc: 'Толщина 0.5 мм, полимерное покрытие. Гарантия 25 лет.',
    image: '/images/catalog/siding/siding_v6.png',
    price: 520,
    oldPrice: 580,
    category: 'Кровля',
    rating: 4.6,
    reviewCount: 178,
    stock: 85,
    isPopular: true,
    createdAt: '2024-02-10'
  },
]

// === Логика фильтрации и сортировки ===

// Подсчёт товаров по категории (для UI)
const getProductCountByCategory = (category: string) => {
  return products.filter(p => p.category === category).length
}

// Активные фильтры (для отображения тегов и счётчика)
const activeFiltersCount = computed(() => {
  let count = filters.value.categories.length
  if (filters.value.priceMin || filters.value.priceMax) count++
  if (filters.value.inStockOnly) count++
  if (filters.value.minRating) count++
  return count
})

// Основная фильтрация
const filteredProducts = computed(() => {
  let result = [...products]

  // Категория
  if (filters.value.categories.length > 0) {
    result = result.filter(p => filters.value.categories.includes(p.category))
  }

  // Цена
  if (filters.value.priceMin !== null) {
    result = result.filter(p => p.price >= filters.value.priceMin!)
  }
  if (filters.value.priceMax !== null) {
    result = result.filter(p => p.price <= filters.value.priceMax!)
  }

  // Наличие
  if (filters.value.inStockOnly) {
    result = result.filter(p => p.stock > 0)
  }

  // Рейтинг
  if (filters.value.minRating !== null) {
    result = result.filter(p => p.rating >= filters.value.minRating!)
  }

  // Сортировка
  switch (sortBy.value) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      result.sort((a, b) => b.rating - a.rating)
      break
    case 'newest':
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      break
    case 'popular':
    default:
      result.sort((a, b) => {
        // Сначала популярные, потом по рейтингу
        if (a.isPopular && !b.isPopular) return -1
        if (!a.isPopular && b.isPopular) return 1
        return b.rating - a.rating
      })
  }

  return result
})

// Пагинация
const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredProducts.value.slice(start, start + itemsPerPage)
})

// Умная пагинация (показывает 1, 2, 3 ... последняя)
const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const maxVisible = 5

  if (totalPages.value <= maxVisible) {
    for (let i = 1; i <= totalPages.value; i++) pages.push(i)
  } else {
    if (currentPage.value <= 3) {
      for (let i = 1; i <= 4; i++) pages.push(i)
      pages.push('...')
      pages.push(totalPages.value)
    } else if (currentPage.value >= totalPages.value - 2) {
      pages.push(1)
      pages.push('...')
      for (let i = totalPages.value - 3; i <= totalPages.value; i++) pages.push(i)
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = currentPage.value - 1; i <= currentPage.value + 1; i++) pages.push(i)
      pages.push('...')
      pages.push(totalPages.value)
    }
  }
  return pages
})

// Сброс фильтров
const resetFilters = () => {
  filters.value = {
    categories: [],
    priceMin: null,
    priceMax: null,
    inStockOnly: false,
    minRating: null
  }
  currentPage.value = 1
}

const removeCategoryFilter = (category: string) => {
  filters.value.categories = filters.value.categories.filter(c => c !== category)
  currentPage.value = 1
}

// Сброс страницы при изменении фильтров/сортировки
watch(() => [filters.value, sortBy.value], () => {
  currentPage.value = 1
}, { deep: true })

// === Grid classes ===
const gridClasses = computed(() => {
  if (viewMode.value === 'list') {
    return 'grid-cols-1'
  }
  return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
})
</script>

<style scoped>
/* Анимация появления товаров */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Кастомный скроллбар для списка категорий */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}
.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 2px;
}
.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}
</style>