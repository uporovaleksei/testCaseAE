<script setup lang="ts">
import ButtonComponent from '../ui/ButtonComponent.vue'
import { closePopup } from '@/utils/popups'
import type { Popup } from '@/types/PopupType'
import { useOrderStore } from '@/stores/orders'
const orderStore = useOrderStore()

const props = defineProps<{
  popup: Popup
  deleteId: number | null
}>()

const confirmDelete = async () => {
  if (props.deleteId !== null) {
    await orderStore.deleteItem(props.deleteId)
    closePopup(props.popup)
  }
}
</script>

<template>
  <div class="wrapper">
    <div class="container">
      <div class="title">
        <h3>Вы действительно хотите удалить заказ?</h3>
      </div>
      <div class="actions">
        <ButtonComponent @click="confirmDelete()">Ок</ButtonComponent>
        <ButtonComponent @click="closePopup(popup)">Отмена</ButtonComponent>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  .container {
    width: 335px;
    height: 215px;
    background: var(--light-gray);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 68px;
    .title {
      margin-top: 63px;
    }
    .actions {
      display: flex;
      gap: 55px;
    }
  }
}
</style>
