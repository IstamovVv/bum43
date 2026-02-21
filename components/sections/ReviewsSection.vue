<template>
  <section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Отзывы наших клиентов</h2>
        <div class="flex justify-center gap-1">
          <IconComponent v-for="i in 5" :key="i" name="star" class="w-6 h-6" />
          <span class="ml-2 text-gray-600">(156 отзывов)</span>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="review in reviews" :key="review.name" class="bg-white p-6 rounded-xl shadow-md">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold">{{ review.initial }}</div>
            <div>
              <div class="font-bold">{{ review.name }}</div>
              <div class="text-sm text-gray-500">{{ review.city }}</div>
            </div>
          </div>
          <div class="flex gap-1 mb-3">
            <IconComponent v-for="i in 5" :key="i" name="star" class="w-5 h-5" />
          </div>
          <p class="text-gray-600 italic">"{{ review.text }}"</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const reviews = [
  { name: 'Александр Петров', city: 'г. Киров', initial: 'А', text: 'Отличная компания! Помогли подобрать сайдинг для дома, рассчитали всё точно. Доставили быстро, цена порадовала. Рекомендую!' },
  { name: 'Мария Соколова', city: 'п. Ленинский', initial: 'М', text: 'Заказывала террасную доску и экраны для батарей. Очень довольна качеством и обслуживанием. Консультант подробно всё объяснил.' },
  { name: 'Иван Козлов', city: 'г. Киров', initial: 'И', text: 'Строительная бригада работает с СтройБум уже 5 лет. Всегда в наличии нужные материалы, цены стабильные. Надёжные партнёры!' },
]
</script>