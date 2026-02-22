<template>
  <div class="min-h-screen">
    <section class="bg-gradient-to-r from-primary-700 to-primary-900 text-white p-8 mb-12">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <h1 class="text-3xl md:text-4xl font-bold mb-2">🏗️ Каталог товаров</h1>
          <p class="text-gray-200 text-lg">Выберите категорию или бренд</p>
        </div>
        <div class="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
          <span class="icon i-check w-6 h-6 text-success-400"></span>
          <div>
            <div class="font-bold">Всё в наличии</div>
            <div class="text-sm opacity-80">Доставка по Кирову от 1 дня</div>
          </div>
        </div>
      </div>
    </section>
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Catalog -->
      <CategoriesGrid :categories="categories" />

      <!-- Brands -->
      <BrandsGrid :brands="brands" />

      <!-- CTA -->
    </main>
    <div class="bg-gradient-to-r from-primary-600 to-primary-800 p-8 text-white text-center">
      <h3 class="text-2xl font-bold mb-3">🤔 Не нашли что искали?</h3>
      <p class="text-gray-200 mb-6 max-w-2xl mx-auto">
        Наши специалисты помогут подобрать нужные материалы
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button @click="isCallbackModalOpen = true">
          📞 Заказать звонок
        </button>
        <a
            href="https://wa.me/78332756983"
            target="_blank"
            class="bg-white hover:bg-gray-100 text-primary-700 px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg flex items-center justify-center gap-2"
        >
          <span class="icon i-whatsapp w-5 h-5"></span>
          Написать в WhatsApp
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { categories, brands } = useCatalog()
const isCallbackModalOpen = ref(false)

useSeoMeta({
  title: 'Каталог товаров — СтройБум Киров',
  description: 'Каталог строительных материалов: сайдинг, фасадные панели, водосточные системы. Цены, наличие, доставка по Кирову.'
})
</script>