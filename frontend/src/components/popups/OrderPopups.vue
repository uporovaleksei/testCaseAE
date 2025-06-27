<script setup lang="ts">
import InputField from '../ui/InputField.vue'
import ButtonComponent from '../ui/ButtonComponent.vue'
import type { Popup } from '@/types/PopupType'
import { useOrderStore } from '@/stores/orders'
import { onMounted } from 'vue'
const orderStore = useOrderStore()

const props = defineProps<{
  popup: Popup
}>()
onMounted(() => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    const user = JSON.parse(storedUser)
    if (user && user.name) {
      orderStore.form.nameInput.modelValue = user.name
    }
  }
})
</script>

<template>
  <div class="wrapper">
    <div class="container">
      <div class="title">
        <h3>Добавить заказ</h3>
      </div>
      <div class="inputs">
        <InputField
          v-bind="orderStore.form.nameInput"
          v-model="orderStore.form.nameInput.modelValue"
        ></InputField>
        <InputField
          v-bind="orderStore.form.addressInput"
          v-model="orderStore.form.addressInput.modelValue"
        ></InputField>
        <InputField
          v-bind="orderStore.form.commentInput"
          v-model="orderStore.form.commentInput.modelValue"
        ></InputField>
      </div>
      <div class="actions">
        <ButtonComponent @click="orderStore.addOrder()" :isDark="true"
          >Добавить заказ</ButtonComponent
        >
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  .container {
    padding-top: 83px;
    padding-left: 36px;
    width: 100%;
    height: 100dvh;
    background: var(--light-gray);
    display: flex;
    flex-direction: column;
    .inputs {
      display: flex;
      flex-direction: column;
      gap: 24px;
      margin-top: 33px;
    }
    .actions {
      margin-top: 29px;
    }
  }
}
</style>
