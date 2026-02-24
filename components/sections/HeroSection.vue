<template>
  <section id="hero" class="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Левая часть - Текст -->
        <div class="space-y-6 animate-[fade-in_0.8s_ease-in]">
          <div class="flex items-center gap-3 bg-primary-600/30 backdrop-blur-sm rounded-full px-4 py-2 inline-flex">
            <IconComponent name="shield" class="w-5 h-5" />
            <span class="text-sm font-medium">Работаем напрямую с производителями</span>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold leading-tight">
            Фасадные материалы <span class="text-accent-300">для дома в Кирове</span>
          </h1>
          <p class="text-xl text-gray-200">
            Сайдинг, фасадные панели, водосточные системы. Бесплатный расчет + доставка по Кирову и области.
          </p>
          <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 mt-4">
            <div class="flex items-start gap-3">
              <IconComponent name="check" class="w-6 h-6 mt-1" />
              <span class="text-lg">Постоянное наличие на складе</span>
            </div>
            <div class="flex items-start gap-3 mt-2">
              <IconComponent name="check" class="w-6 h-6 mt-1" />
              <span class="text-lg">Доставка в день заказа</span>
            </div>
            <div class="flex items-start gap-3 mt-2">
              <IconComponent name="check" class="w-6 h-6 mt-1" />
              <span class="text-lg">Бесплатный расчет от специалиста</span>
            </div>
          </div>
          <div class="flex flex-col sm:flex-row gap-4 pt-6">
            <button class="bg-accent-500 hover:bg-accent-600 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1" @click="openCalculatorModal">
              <span class="flex items-center justify-center gap-2">
                <IconComponent name="calculator" color="#1a202c" class="w-6 h-6" />
                <span>Рассчитать бесплатно</span>
              </span>
            </button>
            <a href="tel:+78332756983" class="bg-white text-primary-700 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg border-2 border-white hover:border-accent-300 transition-all">
              <span class="flex items-center justify-center gap-2">
                <IconComponent name="phone" color="#033975" class="w-6 h-6" />
                <span>+7 (8332) 75-69-83</span>
              </span>
            </a>
          </div>
          <div class="mt-8 pt-6 border-t border-white/20">
            <div class="flex items-center gap-4">
              <div class="flex -space-x-2">
                <div class="w-10 h-10 bg-gray-200 rounded-full border-2 border-primary-700 flex items-center justify-center font-bold text-primary-700">К</div>
                <div class="w-10 h-10 bg-gray-200 rounded-full border-2 border-primary-700 flex items-center justify-center font-bold text-primary-700">С</div>
                <div class="w-10 h-10 bg-gray-200 rounded-full border-2 border-primary-700 flex items-center justify-center font-bold text-primary-700">И</div>
              </div>
              <div>
                <div class="font-bold">156 довольных клиентов</div>
                <div class="text-sm opacity-80">в этом месяце в Кирове</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Правая часть - Форма с комментарием -->
        <div class="bg-white rounded-2xl shadow-2xl p-8 animate-[slide-up_0.8s_ease-out] text-gray-900">
          <h2 class="text-2xl font-bold text-primary-700 mb-2">Получить консультацию</h2>
          <p class="text-gray-500 mb-6 text-sm">Перезвоним в течение 15 минут</p>

          <form class="space-y-4" @submit.prevent="submitForm">
            <div>
              <input
                  v-model="form.name"
                  type="text"
                  placeholder="Ваше имя"
                  class="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-base"
                  required
              >
            </div>
            <div>
              <input
                  v-model="form.phone"
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  class="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-base"
                  required
              >
            </div>
            <div>
              <textarea
                  v-model="form.comment"
                  rows="2"
                  placeholder="Комментарий (необязательно)"
                  class="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-base resize-none"
              />
            </div>

            <button
                type="submit"
                :disabled="loading"
                class="w-full bg-success-600 hover:bg-success-700 disabled:bg-gray-400 text-white font-bold py-4 rounded-lg text-lg transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
            >
              <span v-if="loading">Отправка...</span>
              <span v-else>Жду звонка</span>
            </button>

            <p class="text-xs text-gray-400 text-center">
              🔒 Ваши данные под защитой
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { openCalculatorModal } = useModals()

const loading = ref(false)
const form = ref({
  name: '',
  phone: '',
  comment: ''
})

const submitForm = async () => {
  loading.value = true

  // Имитация отправки
  await new Promise(resolve => setTimeout(resolve, 1500))

  // TODO: Реальная отправка на сервер
  // await $fetch('/api/lead', {
  //   method: 'POST',
  //   body: {
  //     ...form.value,
  //     source: 'hero_form',
  //     timestamp: new Date().toISOString()
  //   }
  // })

  console.log('Заявка:', form.value)
  alert('Спасибо! Мы свяжемся с вами в течение 15 минут.')

  form.value = { name: '', phone: '', comment: '' }
  loading.value = false
}
</script>