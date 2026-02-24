<!-- pages/categories.vue -->
<template>
  <div class="min-h-screen bg-gray-50">

    <!-- === HERO SECTION (Ваш вариант, слегка улучшенный) === -->
    <section class="bg-gradient-to-r from-primary-700 to-primary-900 text-white p-6 md:p-8 mb-10 md:mb-12">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <h1 class="text-3xl md:text-4xl font-bold mb-2">🏗️ Каталог товаров</h1>
          <p class="text-gray-200 text-lg">Выберите категорию или бренд</p>
        </div>
        <div class="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/10">
          <Icon name="heroicons:check-circle" class="w-6 h-6 text-green-400 flex-shrink-0" />
          <div>
            <div class="font-bold text-sm md:text-base">Всё в наличии</div>
            <div class="text-xs md:text-sm opacity-80">Доставка по Кирову от 1 дня</div>
          </div>
        </div>
      </div>
    </section>

    <!-- === MAIN CONTENT === -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Категории -->
      <CategoriesGrid :categories="categories" />

      <!-- Популярные бренды -->
      <BrandsGrid :brands="brands" />

    </main>

    <!-- === CTA SECTION === -->
    <section class="bg-gradient-to-r from-primary-600 to-primary-800 p-8 text-white text-center mt-12">
      <h3 class="text-2xl font-bold mb-3">🤔 Не нашли что искали?</h3>
      <p class="text-gray-200 mb-6 max-w-2xl mx-auto">
        Наши специалисты помогут подобрать нужные материалы
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button
            class="px-6 py-3 bg-white text-primary-700 rounded-lg font-bold hover:bg-gray-50 transition-colors shadow-lg"
            @click="isCallbackModalOpen = true"
        >
          📞 Заказать звонок
        </button>
        <a
            href="https://wa.me/78332756983"
            target="_blank"
            class="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold transition-colors shadow-lg flex items-center justify-center gap-2"
        >
          <Icon name="simple-icons:whatsapp" class="w-5 h-5" />
          Написать в WhatsApp
        </a>
      </div>
    </section>

    <!-- Модальное окно (опционально) -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isCallbackModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="isCallbackModalOpen = false"/>
          <div class="relative bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <button class="absolute top-4 right-4 text-gray-400 hover:text-gray-600" @click="isCallbackModalOpen = false">
              <Icon name="heroicons:x-mark" class="w-6 h-6" />
            </button>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Перезвоним вам</h3>
            <p class="text-gray-500 mb-6">Оставьте номер — специалист свяжется в течение 15 минут</p>
            <form class="space-y-4" @submit.prevent="submitCallback">
              <input type="tel" placeholder="+7 (___) ___-__-__" class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" required >
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

const submitCallback = () => {
  // Логика отправки заявки
  isCallbackModalOpen.value = false
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