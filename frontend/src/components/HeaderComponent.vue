<script setup lang="ts">
import ButtonComponent from './ui/ButtonComponent.vue'
import PopUpComponent from './PopUpComponent.vue'
import OrderPopups from './popups/OrderPopups.vue'

import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { openPopup, closePopup } from '@/utils/popups'
import { useOrderStore } from '@/stores/orders'

const authStore = useAuthStore()
const orderStore = useOrderStore()
</script>

<template>
  <header>
    <nav>
      <div class="links">
        <RouterLink :to="'/'" @click="closePopup(orderStore.popups.createNewOrder)"
          >Все заказы</RouterLink
        >
        <span @click="openPopup(orderStore.popups.createNewOrder)">Добавить заказ</span>
      </div>
      <div class="actions">
        <div class="user">
          {{ authStore.user.name }}
        </div>
        <div class="logout">
          <ButtonComponent @click="authStore.logout()" :isDark="true"> Выйти </ButtonComponent>
        </div>
      </div>
    </nav>
  </header>
  <PopUpComponent
    v-model:show="orderStore.popups.createNewOrder.show"
    :name="orderStore.popups.createNewOrder.name"
  >
    <OrderPopups :popup="orderStore.popups.createNewOrder"></OrderPopups>
  </PopUpComponent>
</template>

<style scoped lang="scss">
header {
  width: 100%;
  height: 52px;
  background: var(--blue);
  z-index: 10000;
  position: relative;
  nav {
    width: 797px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 22px;
    padding-right: 15px;
    background: var(--blue);

    .links {
      display: flex;
      gap: 38px;
      align-items: center;
      a,
      span {
        cursor: pointer;
        color: #fff;
        text-decoration: none;
      }
    }
    .actions {
      display: flex;
      align-items: center;
      gap: 28px;
      .user {
        cursor: default;
      }
    }
  }
}
</style>
