<template>
  <span class="icon" :class="props.class" :style="iconStyle"/>
</template>

<script setup>
const props = defineProps({
  class: { type: String, default: 'w-5 h-5' },
  color: { type: String, default: '#ffffff' }
})

const iconStyle = computed(() => ({
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%23${props.color.replace('#', '')}'%3E%3Cpath fill-rule='evenodd' d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z' clip-rule='evenodd'/%3E%3C/svg%3E")`,
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