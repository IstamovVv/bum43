<template>
  <section id="catalog" class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center mb-10">
        <h2 class="text-3xl font-bold text-gray-900">Популярные товары</h2>
        <a href="#" class="text-primary-600 hover:text-primary-700 font-medium">Все товары →</a>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="product in products" :key="product.id" class="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
          <div class="relative">
            <div class="bg-gray-100 h-48 flex items-center justify-center text-5xl">{{ product.icon }}</div>
            <div class="absolute top-2 left-2 bg-discount-600 text-white px-2 py-1 rounded text-sm font-medium">{{ product.discount }}</div>
            <div :class="`absolute top-2 right-2 px-2 py-1 rounded text-sm font-medium ${product.badgeClass}`">{{ product.badge }}</div>
          </div>
          <div class="p-4">
            <div class="font-medium text-gray-800 mb-2">{{ product.name }}</div>
            <div class="text-xs text-gray-600 mb-3">{{ product.desc }}</div>
            <div class="flex justify-between items-center mb-3">
              <div>
                <span class="text-gray-500 line-through text-xs">{{ product.oldPrice }}</span>
                <span class="text-xl font-bold text-primary-600 ml-2">{{ product.price }}</span>
              </div>
              <span :class="`text-xs px-2 py-1 rounded ${product.badgeTagClass}`">{{ product.badge }}</span>
            </div>
            <div class="flex items-center mb-3">
              <div class="flex">
                <IconComponent v-for="i in 5" :key="i" name="star" class="w-4 h-4" />
              </div>
              <span class="text-xs text-gray-500 ml-1">{{ product.reviews }} отзыва</span>
            </div>
            <button class="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
              <IconComponent name="shoppingCart" class="w-4 h-4" />
              В корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const products = [
  { id: 1, name: 'Сэндвич-панели ПВХ откосы', desc: 'Длина 3 м, толщина 10 мм', icon: '🪟', discount: '-7%', badge: 'Хит', badgeClass: 'bg-primary-500 text-white', badgeTagClass: 'bg-primary-100 text-primary-700', oldPrice: '1 490 ₽', price: '1 400 ₽', reviews: 22 },
  { id: 2, name: 'Водосточная система Альта', desc: 'Желоб 125 мм белый', icon: '💧', discount: '-15%', badge: 'Акция', badgeClass: 'bg-accent-500 text-white', badgeTagClass: 'bg-accent-100 text-accent-700', oldPrice: '120 ₽', price: '102 ₽', reviews: 47 },
  { id: 3, name: 'Фасадная панель NS Кирпич', desc: 'Размер 380×380 мм', icon: '🪵', discount: '-20%', badge: 'Новинка', badgeClass: 'bg-success-500 text-white', badgeTagClass: 'bg-success-100 text-success-700', oldPrice: '850 ₽', price: '680 ₽', reviews: 35 },
  { id: 4, name: 'Экран радиатора Белый', desc: 'Размер 600×800 мм', icon: '🛏️', discount: '-12%', badge: 'Хит', badgeClass: 'bg-primary-500 text-white', badgeTagClass: 'bg-primary-100 text-primary-700', oldPrice: '1 150 ₽', price: '1 012 ₽', reviews: 18 },
]
</script>