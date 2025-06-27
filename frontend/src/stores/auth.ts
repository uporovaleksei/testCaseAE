import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { InputFieldProps } from '@/types/InputType'
import axios from 'axios'
import { validateField } from '@/utils/validate'

export const useAuthStore = defineStore('auth', () => {
  const savedUser = localStorage.getItem('user')
  const user = ref(savedUser ? JSON.parse(savedUser) : null)
  const form = reactive({
    nameInput: {
      name: 'name',
      placeholder: 'Введите имя',
      type: 'text',
      inputmode: 'text',
      modelValue: '',
      inputId: 'nameInput',
    },
    passwordInput: {
      name: 'password',
      placeholder: 'Введите пароль',
      type: 'password',
      autoFocus: false,
      inputmode: 'text',
      modelValue: '',
      inputId: 'passInput',
    },
  })

  async function login() {
    for (const key in form) {
      const field = form[key as keyof typeof form]
      const isValid = validateField(field.modelValue, key === 'passwordInput' ? 'password' : 'text')
      if (!isValid) {
        return
      }
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, {
        name: form.nameInput.modelValue,
        password: form.passwordInput.modelValue,
      })

      user.value = response.data
      localStorage.setItem('user', JSON.stringify(response.data))
    } catch (error) {
      console.error(error)
      alert('Пользователь не найден')
    }
  }

  function logout() {
    user.value = null
    localStorage.removeItem('user')
    Object.values(form).forEach((field) => (field.modelValue = ''))
  }

  return {
    form,
    user,
    login,
    logout,
  }
})
