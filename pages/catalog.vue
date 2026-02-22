<!-- pages/catalog.vue -->
<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Хлебные крошки -->
      <nav class="flex mb-6 text-sm text-gray-500">
        <NuxtLink to="/" class="hover:text-primary-600">Главная</NuxtLink>
        <span class="mx-2">/</span>
        <span class="text-gray-900 font-medium">Каталог товаров</span>
      </nav>

      <div class="flex flex-col md:flex-row gap-6">

        <!-- SIDEBAR: Фильтры -->
        <aside class="w-full md:w-64 flex-shrink-0">
          <button
              @click="mobileFiltersOpen = !mobileFiltersOpen"
              class="md:hidden w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg mb-4 font-medium"
          >
            <span>Фильтры</span>
            <Icon :name="mobileFiltersOpen ? 'heroicons:chevron-up' : 'heroicons:chevron-down'" class="w-5 h-5" />
          </button>

          <div :class="['bg-white p-5 rounded-xl border border-gray-200', mobileFiltersOpen ? 'block' : 'hidden md:block']">
            <div class="flex justify-between items-center mb-4">
              <h3 class="font-bold text-lg">Фильтры</h3>
              <button class="text-xs text-primary-600 hover:underline">Сбросить</button>
            </div>

            <!-- Категория -->
            <div class="mb-6">
              <h4 class="font-medium mb-2 text-sm text-gray-700">Категория</h4>
              <div class="space-y-2">
                <label v-for="cat in categories" :key="cat" class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" class="rounded text-primary-600 focus:ring-primary-500 w-4 h-4" />
                  <span class="text-sm text-gray-600">{{ cat }}</span>
                </label>
              </div>
            </div>

            <!-- Цена -->
            <div class="mb-6">
              <h4 class="font-medium mb-2 text-sm text-gray-700">Цена, ₽</h4>
              <div class="flex items-center gap-2">
                <input type="number" placeholder="От" class="w-full p-2 border border-gray-200 rounded text-sm" />
                <span class="text-gray-400">-</span>
                <input type="number" placeholder="До" class="w-full p-2 border border-gray-200 rounded text-sm" />
              </div>
            </div>

            <!-- Наличие -->
            <div class="mb-4">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" class="rounded text-primary-600 w-4 h-4" />
                <span class="text-sm text-gray-600">Только в наличии</span>
              </label>
            </div>
          </div>
        </aside>

        <!-- MAIN: Товары -->
        <main class="flex-grow">

          <!-- Toolbar -->
          <div class="bg-white p-4 rounded-xl border border-gray-200 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span class="text-sm text-gray-500">Найдено: <strong class="text-gray-900">{{ products.length }}</strong> товаров</span>

            <div class="flex items-center gap-4 w-full sm:w-auto">
              <select class="p-2 border border-gray-200 rounded-lg text-sm bg-transparent focus:ring-2 focus:ring-primary-500 outline-none">
                <option>По популярности</option>
                <option>Сначала дешевле</option>
                <option>Сначала дороже</option>
                <option>Новинки</option>
              </select>

              <!-- Переключатель вида -->
              <div class="flex bg-gray-100 rounded-lg p-1">
                <button
                    @click="viewMode = 'grid'"
                    :class="['p-2 rounded-md transition-all', viewMode === 'grid' ? 'bg-white shadow text-primary-600' : 'text-gray-400 hover:text-gray-600']"
                >
                  <Icon name="heroicons:squares-2x2" class="w-5 h-5" />
                </button>
                <button
                    @click="viewMode = 'list'"
                    :class="['p-2 rounded-md transition-all', viewMode === 'list' ? 'bg-white shadow text-primary-600' : 'text-gray-400 hover:text-gray-600']"
                >
                  <Icon name="heroicons:bars-3" class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <!-- Сетка товаров -->
          <div class="grid gap-6" :class="gridClasses">
            <ProductCard
                v-for="product in products"
                :key="product.id"
                :product="product"
                :variant="viewMode"
            />
          </div>

          <!-- Пагинация -->
          <div class="mt-10 flex justify-center">
            <nav class="flex items-center gap-2">
              <button class="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50">
                <Icon name="heroicons:chevron-left" class="w-5 h-5" />
              </button>
              <button class="w-10 h-10 bg-primary-600 text-white rounded-lg font-medium">1</button>
              <button class="w-10 h-10 border border-gray-200 rounded-lg hover:bg-gray-50">2</button>
              <button class="w-10 h-10 border border-gray-200 rounded-lg hover:bg-gray-50">3</button>
              <span class="text-gray-400">...</span>
              <button class="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
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
import { ref, computed } from 'vue'

// Состояние
const viewMode = ref<'grid' | 'list'>('grid')
const mobileFiltersOpen = ref(false)

// Данные
const categories = ['Стеновые панели', 'Водостоки', 'Кровля', 'Фундамент', 'Утеплитель']

const products = [
  {
    id: 1,
    name: 'Сэндвич-панели ПВХ откосы',
    desc: 'Длина 3 м, толщина 10 мм, белый цвет',
    image: '/img/products/panel-1.jpg',
    discount: '-7%',
    badge: 'Хит',
    badgeClass: 'bg-primary-500 text-white',
    oldPrice: '1 490 ₽',
    price: '1 400 ₽',
    reviews: 22,
    rating: 5
  },
  {
    id: 2,
    name: 'Водосточная система Альта',
    desc: 'Желоб 125 мм белый, комплект',
    image: '/img/products/gutter-1.jpg',
    discount: '-15%',
    badge: 'Акция',
    badgeClass: 'bg-red-500 text-white',
    oldPrice: '120 ₽',
    price: '102 ₽',
    reviews: 47,
    rating: 4
  },
  {
    id: 3,
    name: 'Фасадная панель NS Кирпич',
    desc: 'Размер 380×380 мм, текстура камня',
    image: '/img/products/facade-1.jpg',
    discount: '-20%',
    badge: 'Новинка',
    badgeClass: 'bg-green-500 text-white',
    oldPrice: '850 ₽',
    price: '680 ₽',
    reviews: 35,
    rating: 5
  },
  {
    id: 4,
    name: 'Экран радиатора Белый',
    desc: 'Размер 600×800 мм, перфорация',
    image: '/img/products/screen-1.jpg',
    discount: '-12%',
    badge: 'Хит',
    badgeClass: 'bg-primary-500 text-white',
    oldPrice: '1 150 ₽',
    price: '1 012 ₽',
    reviews: 18,
    rating: 4
  },
]

// Логика классов сетки
const gridClasses = computed(() => {
  if (viewMode.value === 'list') {
    return 'grid-cols-1'
  }
  return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
})
</script>