<template>
  <section id="contacts" class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 class="text-3xl font-bold text-gray-900 mb-6">Свяжитесь с нами</h2>
          <p class="text-gray-600 mb-8">Наши специалисты проконсультируют вас по любым вопросам</p>
          <div class="space-y-6">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <IconComponent name="phone" color="#033975" class="w-6 h-6" />
              </div>
              <div>
                <div class="font-bold text-lg">Телефоны</div>
                <div class="text-gray-600">
                  <div><a href="tel:+78332756983" class="text-primary-600 hover:underline">+7 (8332) 75-69-83</a></div>
                  <div><a href="tel:+78332796900" class="text-primary-600 hover:underline">+7 (8332) 79-69-00</a></div>
                </div>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">📍</div>
              <div>
                <div class="font-bold text-lg">Адрес</div>
                <div class="text-gray-600">г. Киров, 2-й Кирпичный переулок, 2/1</div>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">🕒</div>
              <div>
                <div class="font-bold text-lg">Режим работы</div>
                <div class="text-gray-600">
                  <div>Пн-Пт: 8:30 - 17:30</div>
                  <div>Сб: 9:00 - 13:00</div>
                  <div>Вс: выходной</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 rounded-xl p-6">
          <h3 class="text-2xl font-bold text-gray-900 mb-6">Отправить сообщение</h3>
          <form class="space-y-4" @submit.prevent="submitForm">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Ваше имя *</label>
              <input v-model="form.name" type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Телефон *</label>
              <input v-model="form.phone" type="tel" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
            </div>
            <button type="submit" class="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-lg text-lg transition-colors">
              Отправить сообщение
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const form = ref({ name: '', phone: '' })

const submitForm = () => {
  alert('Спасибо! Мы свяжемся с вами.')
  form.value = { name: '', phone: '' }
}
</script>