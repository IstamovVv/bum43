<template>
  <section class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="item in advantages" :key="item.title" class="border border-gray-200 rounded p-6">
          <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4 text-2xl">{{ item.icon }}</div>
          <div class="font-bold text-lg mb-2">{{ item.title }}</div>
          <div class="text-gray-600">{{ item.desc }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const advantages = [
  { icon: '💰', title: 'Прямые поставки', desc: 'Работаем без посредников — низкие цены гарантированы' },
  { icon: '🚚', title: 'Доставка по Кирову', desc: 'Привезем материалы на ваш объект в удобное время' },
  { icon: '👨‍🔧', title: 'Бесплатный расчет', desc: 'Поможем рассчитать точное количество без переплаты' },
]
</script>