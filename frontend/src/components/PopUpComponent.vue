<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  show: boolean
  closeOnBackdrop?: boolean
  name?: string
}>()

const emit = defineEmits(['update:show'])

function close() {
  emit('update:show', false)
}

function handleEsc(event: KeyboardEvent) {
  if (event.key === 'Escape') close()
}

onMounted(() => {
  window.addEventListener('keydown', handleEsc)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleEsc)
})
</script>

<template>
  <div v-if="show" class="popup-overlay" @click="closeOnBackdrop !== false && close()">
    <div class="popup-content" @click.stop>
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  width: 100%;
  .popup-content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
