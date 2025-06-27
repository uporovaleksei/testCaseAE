import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { OrderItem } from '@/types/OrdersType'
import { validateField } from '@/utils/validate'
import { formatCurrentDate } from '@/utils/date'

export const useOrderStore = defineStore('orders', () => {
  const orders = ref<OrderItem[] | null>(null)

  const popups = {
    deleteItem: {
      name: 'deleteItem',
      show: false,
    },
    createNewOrder: {
      name: 'createNewOrder',
      show: false,
    },
  }

  const form = reactive({
    nameInput: {
      name: 'name',
      placeholder: 'Введите ваше имя',
      type: 'text',
      inputmode: 'text',
      modelValue: '',
      inputId: 'nameInput',
    },
    addressInput: {
      name: 'address',
      placeholder: 'Введите ваш адрес',
      type: 'text',
      inputmode: 'text',
      modelValue: '',
      inputId: 'addressInput',
    },
    commentInput: {
      name: 'comment',
      placeholder: 'Комментарий',
      type: 'text',
      inputmode: 'text',
      modelValue: '',
      inputId: 'commentInput',
    },
  })

  async function getOrders() {
    if (orders.value) return
    await axios.get(`${import.meta.env.VITE_API_URL}/events`).then((res) => {
      orders.value = res.data
    })
  }

  async function deleteItem(deleteId: number) {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/events/${deleteId}`)

      if (orders.value) {
        const index = orders.value.findIndex((o) => o.id === deleteId)
        if (index !== -1) {
          orders.value.splice(index, 1)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  async function addOrder() {
    for (const key in form) {

      if (key === 'commentInput') continue

      const field = form[key as keyof typeof form]
      const isValid = validateField(field.modelValue)
      if (!isValid) {
        return
      }
    }

    const newOrder = {
      name: form.nameInput.modelValue,
      address: form.addressInput.modelValue,
      date: formatCurrentDate(),
      status: 'Новый',
      comment: form.commentInput.modelValue,
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/events/new_order`,
        newOrder,
      )
      if (orders.value && response.data) {
        orders.value.push(response.data)
      }
      alert('Заказ создан')
      Object.values(form).forEach((field) => (field.modelValue = ''))
    } catch (e) {
      console.error(e)
    }
  }

  return {
    form,
    popups,
    orders,
    getOrders,
    deleteItem,
    addOrder,
  }
})
