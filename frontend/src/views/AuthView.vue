<script setup lang="ts">
import ButtonComponent from '@/components/ui/ButtonComponent.vue'
import InputField from '@/components/ui/InputField.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <div class="wrapper">
    <div class="container">
      <div class="inputs">
        <InputField
          v-bind="authStore.form.nameInput"
          v-model="authStore.form.nameInput.modelValue"
        ></InputField>
        <InputField
          v-bind="authStore.form.passwordInput"
          v-model="authStore.form.passwordInput.modelValue"
        ></InputField>
      </div>
      <div class="submit">
        <ButtonComponent @click="authStore.login()">Войти</ButtonComponent>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  padding-top: 171px;
  padding-left: 49px;
  .container {
    background: var(--dark-gray);
    width: 344px;
    height: 245px;
    display: flex;
    flex-direction: column;
    padding-top: 57px;
    padding-left: 38px;
    padding-right: 108px;
    gap: 37px;
    .inputs {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }
    .submit {
      align-self: flex-end;
    }
  }
}
</style>
