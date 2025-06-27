<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue';
</script>

<template>

<HeaderComponent/>
<div class="wrapper">
  <slot></slot>
</div>
</template>

<style scoped>
.wrapper{
  max-width: 797px;
  margin: 0 auto;
}
</style>
