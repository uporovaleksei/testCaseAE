<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AuthView from './views/AuthView.vue'
import MainLayout from '../layouts/MainLayout.vue'
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
</script>

<template>
  <div class="wrapper"></div>
  <MainLayout v-if="authStore.user">
    <RouterView />
  </MainLayout>
  <AuthView v-else />
</template>

<style scoped></style>
