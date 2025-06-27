<script lang="ts" setup>
import { computed } from 'vue'

const emit = defineEmits<{
  (e: 'click'): void
}>()

const onClick = () => {
  emit('click')
}

const props = defineProps<{
  isDark?: boolean
}>()

const btnClass = computed(() => {
  return {
    'btn--dark': props.isDark,
  }
})
</script>

<template>
  <button @click="onClick" type="button" class="btn" :class="btnClass">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
.btn {
  padding: 6px 31px;
  width: fit-content;
  border: 0;
  cursor: pointer;
  transition: all 0.15s ease;
  &--dark {
    background: var(--dark-gray);
  }
  &:hover {
    opacity: 0.9;
  }
  &:active {
    scale: 0.98;
  }
}
</style>
