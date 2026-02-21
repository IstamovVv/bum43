<template>
  <section id="brands" class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-gray-900">Работаем напрямую с производителями</h2>
        <p class="text-sm text-gray-600">Официальные поставки без посредников</p>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div v-for="brand in brands" :key="brand.name" class="bg-gray-50 border border-gray-200 rounded p-4 flex items-center justify-center">
          <div class="text-center">
            <div class="font-bold text-xs mb-1">{{ brand.name }}</div>
            <div class="text-2xl">{{ brand.flag }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const brands = [
  { name: 'NordSide', flag: '🇫🇮' },
  { name: 'Альта-Профиль', flag: '🇷🇺' },
  { name: 'FineBer', flag: '🇷🇺' },
  { name: 'Хольцпласт', flag: '🇩🇪' },
  { name: 'ХардПласт', flag: '🇷🇺' },
  { name: 'Grand Line', flag: '🇷🇺' },
  { name: 'Дёке', flag: '🇩🇪' },
]
</script>