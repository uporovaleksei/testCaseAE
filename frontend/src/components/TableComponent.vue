<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useOrderStore } from '@/stores/orders'
import axios from 'axios'
import { openPopup } from '@/utils/popups'

import PopUpComponent from './PopUpComponent.vue'
import DeletePopups from './popups/DeletePopups.vue'
import { ref } from 'vue'
import type { OrderItem } from '@/types/OrdersType'
import { computed } from 'vue'
const authStore = useAuthStore()
const orderStore = useOrderStore()

type SortKey = 'address' | 'date'

const tableTitles = ['№', 'Имя клиента', 'Адрес', 'Дата заказа', 'Статус', 'Комментарий']
const deleteId = ref<null | number>(null)

const sortColumn = ref<SortKey | null>(null)

const sortDirection = ref<'asc' | 'desc'>('asc')

async function changeStatus(row: OrderItem) {
  try {
    await axios.patch(`${import.meta.env.VITE_API_URL}/events/${row.id}`, {
      status: 'Выполнен',
    })
    row.status = 'Выполнен'
  } catch (e) {
    console.error(e)
  }
}

function openDeletePopup(inedx: number) {
  deleteId.value = inedx
  openPopup(orderStore.popups.deleteItem)
}

function sortBy(column: 'address' | 'date') {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = column
    sortDirection.value = 'asc'
  }
}

function parseRuDate(dateStr: string): Date | null {
  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ]
  const parts = dateStr.trim().split(' ')
  if (parts.length !== 3) return null

  const day = Number(parts[0])
  const month = months.indexOf(parts[1].toLowerCase())
  const year = Number(parts[2])

  if (day && month >= 0 && year) {
    return new Date(year, month, day)
  }

  return null
}

const sortedOrders = computed(() => {
  if (!orderStore.orders) return []

  const orders = [...orderStore.orders]

  if (sortColumn.value) {
    orders.sort((a, b) => {
      if (sortColumn.value === 'date') {
        const dateA = parseRuDate(a.date)
        const dateB = parseRuDate(b.date)

        if (!dateA || !dateB) return 0

        return sortDirection.value === 'asc'
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime()
      }

      const key = sortColumn.value as 'address'
      const aVal = a[key]
      const bVal = b[key]

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection.value === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
      }

      return 0
    })
  }

  return orders
})
</script>

<template>
  <table>
    <thead>
      <tr>
        <td
          v-for="(title, index) in tableTitles"
          :key="index"
          @click="
            (title === 'Адрес' || title === 'Дата заказа') &&
            sortBy(title === 'Адрес' ? 'address' : 'date')
          "
          :style="title === 'Адрес' || title === 'Дата заказа' ? { cursor: 'pointer' } : {}"
        >
          {{ title }}
        </td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="tableRow in sortedOrders" :class="{ ready: tableRow.status === 'Выполнен' }">
        <td v-for="tableColl in tableRow">
          {{ tableColl }}
        </td>
        <td class="actions">
          <span class="add" v-if="tableRow.status !== 'Выполнен'" @click="changeStatus(tableRow)">
            <img src="@/assets/images/icons/add.svg" alt="add" />
          </span>
          <span
            class="remove"
            @click="openDeletePopup(tableRow.id)"
            v-if="authStore.user.role === 'ADMIN'"
          >
            <img src="@/assets/images/icons/cross.svg" alt="remove" />
          </span>
        </td>
      </tr>
      <tr v-for="tableRow in 3">
        <td v-for="(title, index) in tableTitles"></td>
      </tr>
    </tbody>
  </table>
  <PopUpComponent
    v-model:show="orderStore.popups.deleteItem.show"
    :name="orderStore.popups.deleteItem.name"
  >
    <DeletePopups :popup="orderStore.popups.deleteItem" :deleteId="deleteId"></DeletePopups>
  </PopUpComponent>
</template>

<style scoped lang="scss">
table {
  width: fit-content;
  border-collapse: collapse;
  margin-top: 75px;
  margin-left: 43px;
  font-family: Arial, sans-serif;
  font-size: 12px;
  line-height: 12px;
  table-layout: auto;
  overflow: hidden;
  th,
  td {
    border: 1px solid #000;
    vertical-align: middle;
  }
  thead {
    tr {
      td {
        text-align: center;
        padding: 10px;
      }
    }
  }
  tbody {
    tr {
      &.ready {
        td:not(.actions) {
          opacity: 0.25;
        }
      }
      td {
        width: fit-content;
        word-wrap: break-word;
        max-width: 241px;
        padding: 10px;

        &:nth-child(3) {
          font-size: 8px;
        }
      }
      .actions {
        display: flex;
        gap: 6px;
        margin-left: 9px;
        height: 100%;
        border: 0;
        .add,
        .remove {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 17px;
          background: #fff;
          border: 1px solid black;
        }
      }
    }
  }
}
</style>
