<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" @click="close">
        <div class="bg-white rounded-xl max-w-md w-full p-6" @click.stop>
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-2xl font-bold text-gray-900">Заказать звонок</h3>
            <button @click="close" class="text-gray-400 hover:text-gray-600">✕</button>
          </div>
          <form @submit.prevent="submit" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Ваше имя *</label>
              <input v-model="form.name" type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" required>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Телефон *</label>
              <input v-model="form.phone" type="tel" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" required>
            </div>
            <button type="submit" :disabled="loading" class="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-lg text-lg transition-colors disabled:opacity-50">
              {{ loading ? 'Отправка...' : 'Перезвонить мне' }}
            </button>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const { callbackModalOpen, closeCallbackModal } = useModals()
const isOpen = callbackModalOpen
const loading = ref(false)
const form = ref({ name: '', phone: '' })

const close = () => closeCallbackModal()

const submit = async () => {
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 1500))
  alert('Спасибо! Ваша заявка отправлена.')
  loading.value = false
  close()
}
</script>

<style>
.modal-enter-active, .modal-leave-active { transition: opacity 0.3s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>