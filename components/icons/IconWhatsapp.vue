<template>
  <span class="icon" :class="props.class" :style="iconStyle"></span>
</template>

<script setup>
const props = defineProps({
  class: { type: String, default: 'w-5 h-5' },
  color: { type: String, default: '#25d366' }
})

const iconStyle = computed(() => ({
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%23${props.color.replace('#', '')}'%3E%3Cpath fill-rule='evenodd' d='M14.75 6.75a.75.75 0 01.75.75v2.5a.75.75 0 01-.436.682l-1.25.5a.75.75 0 01-.528-.036l-.75-.5a.75.75 0 01-.276-.646V8.5a.75.75 0 01.75-.75h2zm-2 2.5a.75.75 0 01.75.75v1.25h.5a.75.75 0 010 1.5h-.5v.5a.75.75 0 01-1.5 0v-.5h-.5a.75.75 0 010-1.5h.5v-.75a.75.75 0 01.75-.75zM18 5a1 1 0 011 1v8a1 1 0 01-1 1h-4.25a.75.75 0 01-.53-.22L11 13.28l-2.28 2.28a.75.75 0 01-1.28-.53V12H6a1 1 0 01-1-1V6a1 1 0 011-1h12zm-1 1H6v5h1.5a.75.75 0 01.53.22l1.72 1.72 1.55-1.55a.75.75 0 011.06 0l2.44 2.44V6z' clip-rule='evenodd'/%3E%3C/svg%3E")`,
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