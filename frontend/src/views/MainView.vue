<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useOrderStore } from '@/stores/orders'
import { onMounted } from 'vue'
import TableComponent from '@/components/TableComponent.vue'
const orderStore = useOrderStore()

onMounted(() => {
  orderStore.getOrders()
})
</script>

<template>
  <TableComponent />
</template>
