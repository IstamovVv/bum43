<template>
  <div class="bg-primary-900 text-white text-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row justify-between items-center py-2">
        <div class="flex flex-wrap gap-6 mb-2 md:mb-0">
          <div class="flex items-center gap-2">
            <IconPhone class="w-4 h-4" />
            <a href="tel:+78332756983" class="hover:text-accent-300 transition-colors">+7 (8332) 75-69-83</a>
          </div>
          <div class="flex items-center gap-2">
            <IconPhone class="w-4 h-4" />
            <a href="tel:+78332796900" class="hover:text-accent-300 transition-colors">+7 (8332) 79-69-00</a>
          </div>
          <div class="flex items-center gap-2">
            <IconMap class="w-4 h-4" />
            <span>г. Киров, 2-й Кирпичный пер., 2/1</span>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <a href="https://wa.me/78332756983" target="_blank" class="flex items-center gap-2 hover:text-green-300">
            <IconWhatsapp class="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
          <button @click="openCallbackModal" class="bg-accent-500 hover:bg-accent-600 px-4 py-1.5 rounded-md font-medium transition-colors">
            Заказать звонок
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { openCallbackModal } = useModals()
</script>