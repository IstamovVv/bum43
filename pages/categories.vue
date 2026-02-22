<!-- pages/categories.vue -->
<template>
  <div class="min-h-screen bg-gray-50">

    <!-- === HERO SECTION === -->
    <section class="relative bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white overflow-hidden">
      <!-- Декоративные элементы -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-10 right-10 w-96 h-96 bg-primary-300 rounded-full blur-3xl"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">

          <!-- Заголовок + поиск -->
          <div class="flex-1 max-w-2xl">
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Каталог строительных материалов
            </h1>
            <p class="text-lg text-primary-100 mb-6 max-w-xl">
              Более 2 000 товаров от проверенных производителей с доставкой по Кирову и области
            </p>

            <!-- Поиск по каталогу -->
            <div class="relative max-w-md">
              <input
                  type="text"
                  placeholder="Найти товар или категорию..."
                  class="w-full pl-5 pr-12 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-primary-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all backdrop-blur-sm"
                  @input="handleSearch"
              />
              <button class="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:text-white transition-colors">
                <Icon name="heroicons:magnifying-glass" class="w-5 h-5" />
              </button>
            </div>
          </div>

          <!-- Статистика / Преимущества -->
          <div class="flex flex-col sm:flex-row lg:flex-col gap-4">
            <div class="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
              <div class="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <Icon name="heroicons:check-circle" class="w-6 h-6 text-green-400" />
              </div>
              <div>
                <div class="font-bold text-sm">В наличии</div>
                <div class="text-xs text-primary-200">98% ассортимента</div>
              </div>
            </div>
            <div class="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
              <div class="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <Icon name="heroicons:truck" class="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div class="font-bold text-sm">Доставка</div>
                <div class="text-xs text-primary-200">от 1 дня по Кирову</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Волна-разделитель -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-16 md:h-20">
          <path d="M0 32L48 29.3C96 27 192 21 288 18.7C384 16 480 16 576 18.7C672 21 768 27 864 32C960 37 1056 43 1152 45.3C1248 48 1344 48 1392 48L1440 48V80H1392C1344 80 1248 80 1152 80C1056 80 960 80 864 80C768 80 672 80 576 80C480 80 384 80 288 80C192 80 96 80 48 80H0V32Z" fill="#f9fafb"/>
        </svg>
      </div>
    </section>

    <!-- === MAIN CONTENT === -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

      <!-- Категории -->
      <CategoriesGrid :categories="categories" />

      <!-- Популярные бренды -->
      <BrandsGrid :brands="brands" />

      <!-- Баннер-подсказка (опционально) -->
      <div class="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
        <Icon name="heroicons:light-bulb" class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <p class="text-sm text-blue-800">
          <strong>Совет:</strong> Не уверены в выборе? Воспользуйтесь <NuxtLink to="/consultation" class="underline hover:text-blue-900 font-medium">бесплатной консультацией</NuxtLink> нашего специалиста.
        </p>
      </div>

    </main>

    <!-- === CTA SECTION === -->
    <section class="bg-gradient-to-br from-primary-700 to-primary-900 py-12 md:py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-primary-100 mb-6">
          <Icon name="heroicons:sparkles" class="w-4 h-4" />
          Персональная помощь
        </div>

        <h2 class="text-2xl md:text-3xl font-bold text-white mb-4">
          Не нашли то, что искали?
        </h2>
        <p class="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
          Наши эксперты подберут материалы под ваш проект, бюджет и сроки. Ответим в течение 15 минут.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
              @click="isCallbackModalOpen = true"
              class="w-full sm:w-auto px-8 py-4 bg-white text-primary-700 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Icon name="heroicons:phone" class="w-5 h-5" />
            Заказать звонок
          </button>

          <a
              href="https://wa.me/78332756983"
              target="_blank"
              class="w-full sm:w-auto px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Icon name="simple-icons:whatsapp" class="w-5 h-5" />
            Написать в WhatsApp
          </a>
        </div>

        <!-- Социальное доказательство -->
        <div class="mt-8 flex items-center justify-center gap-6 text-sm text-primary-200">
          <div class="flex items-center gap-1">
            <Icon name="heroicons:star-solid" class="w-4 h-4 text-yellow-400" />
            <span>4.9 из 5</span>
          </div>
          <span>•</span>
          <span>1 200+ отзывов</span>
          <span>•</span>
          <span>Работаем с 2015</span>
        </div>
      </div>
    </section>

    <!-- Модальное окно обратного звонка (заглушка) -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isCallbackModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="isCallbackModalOpen = false"></div>
          <div class="relative bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl">
            <button @click="isCallbackModalOpen = false" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <Icon name="heroicons:x-mark" class="w-6 h-6" />
            </button>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Перезвоним вам</h3>
            <p class="text-gray-500 mb-6">Оставьте номер — специалист свяжется в течение 15 минут</p>
            <form @submit.prevent="submitCallback" class="space-y-4">
              <input type="tel" placeholder="+7 (___) ___-__-__" class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" required />
              <button type="submit" class="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-colors">
                Жду звонка
              </button>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<script setup lang="ts">
const { categories, brands } = useCatalog()
const isCallbackModalOpen = ref(false)

const handleSearch = (e: Event) => {
  const query = (e.target as HTMLInputElement).value
  // Здесь можно добавить логику поиска или редирект в каталог с фильтром
  console.log('Search:', query)
}

const submitCallback = () => {
  // Логика отправки заявки
  isCallbackModalOpen.value = false
  // Можно показать тост-уведомление
}

useSeoMeta({
  title: 'Каталог товаров — СтройБум Киров',
  description: 'Каталог строительных материалов: сайдинг, фасадные панели, водосточные системы. Цены, наличие, доставка по Кирову.'
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>