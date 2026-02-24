<template>
  <span class="icon" :class="props.class" :style="iconStyle"/>
</template>

<script setup>
const props = defineProps({
  class: { type: String, default: 'w-5 h-5' },
  color: { type: String, default: '#ffffff' }
})

const iconStyle = computed(() => ({
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%23${props.color.replace('#', '')}'%3E%3Cpath fill-rule='evenodd' d='M2 3.5A1.5 1.5 0 013.5 2h13A1.5 1.5 0 0118 3.5v13a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 012 16.5v-13zM10 15a1 1 0 100-2 1 1 0 000 2z' clip-rule='evenodd'/%3E%3C/svg%3E")`,
  display: 'inline-block',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain'
}))
</script>

<style scoped>
.icon {
  vertical-align: middle;
}
</style>