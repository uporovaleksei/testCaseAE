<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { InputFieldProps } from '@/types/InputType'

const props = withDefaults(defineProps<InputFieldProps>(), {
  type: 'text',
  name: '',
})

const emit = defineEmits<{
  (e: 'input'): void
  (e: 'focus'): void
  (e: 'blur'): void
  (e: 'enter'): void
  (e: 'update:modelValue', payload: string): string
  (e: 'removeError', name: string): string
}>()

const isFocus = ref(false)
const field = ref<HTMLInputElement | null>(null)

const isActive = computed(() => isFocus.value)

const updateValue = (event: Event) => {
  const { value } = event.target as HTMLInputElement

  emit('update:modelValue', value)
  emit('removeError', props.name ?? '')
}
const onEnterListener = () => {
  emit('enter')
}
const setFocus = (val: boolean) => {
  isFocus.value = val
  if (val) {
    emit('focus')
  } else {
    emit('blur')
  }
  emit('removeError', props.name ?? '')
}

const inputFocus = async () => {
  field.value?.focus()
}

onMounted(() => {
  if (props.autoFocus) {
    inputFocus()
  }
})
onUnmounted(() => {})
</script>

<template>
  <div
    class="inp full"
    :class="{
      '--error': isError,
      '--active': isActive,
      '--no-empty': props.modelValue,
    }"
  >
    <label class="inp__label">{{ label }}</label>
    <input
      class="inp__field"
      :type="type"
      :name="name"
      @keyup.enter="onEnterListener()"
      :value="modelValue"
      @input="updateValue($event)"
      @change="updateValue($event)"
      @keyup="updateValue($event)"
      @keydown="updateValue($event)"
      @focus="setFocus(true)"
      @blur="setFocus(false)"
      :placeholder="placeholder"
      :maxlength="maxLength"
      ref="field"
    />
    <div class="inp__error-text" v-if="isError && errorText">{{ errorText }}</div>
  </div>
</template>

<style scoped lang="scss">
.inp {
  &__field {
    width: 180px;
    height: 34px;
    border: 0;
    padding-left: 17px;
    &::placeholder {
      font-size: 12px;
    }
  }
}
</style>
