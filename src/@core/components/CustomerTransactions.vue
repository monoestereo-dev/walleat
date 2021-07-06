<template>
  <b-card
    v-if="transactions"
    class="card-transaction"
    no-body
  >
    <b-card-header>
      <b-card-title>Transacciones</b-card-title>

      <b-dropdown
        variant="link"
        no-caret
        class="chart-dropdown"
        toggle-class="p-0"
        right
      >
        <template #button-content>
          <feather-icon
            icon="MoreVerticalIcon"
            size="18"
            class="text-body cursor-pointer"
          />
        </template>
        <b-dropdown-item href="#">
          Last 28 Days
        </b-dropdown-item>
        <b-dropdown-item href="#">
          Last Month
        </b-dropdown-item>
        <b-dropdown-item href="#">
          Last Year
        </b-dropdown-item>
      </b-dropdown>
    </b-card-header>

    <b-card-body>
      <div
        v-for="transaction in transactions"
        :key="transaction.id"
        class="transaction-item"
      >
        <b-media no-body>
          <b-media-aside>
            <b-avatar
              rounded
              size="41"
              :variant="`light-${transactionIconVariant(transaction.transactable.payment_status)}`"
            >
              <feather-icon
                size="18"
                :icon="transactionIcon(transaction.transactable.payment_status)"
              />
            </b-avatar>
          </b-media-aside>
          <b-media-body>
            <h6
              v-if="transaction.transactable.payment_status"
              class="transaction-title"
            >
              {{ transactionName(transaction.transactable.payment_status) }}
            </h6>
            <b-link
              v-else
              :to="{ name: 'order-view', params: { id: transaction.transactable.id } }"
            >
              <h6
                class="transaction-title"
              >
                {{ transactionName(transaction.transactable.order_type) }}
              </h6>
            </b-link>
            <small>{{ transaction.transactable.created_at | date }}</small>
          </b-media-body>
        </b-media>
        <div
          class="font-weight-bolder"
          :class="`text-${transactionIconVariant(transaction.transactable.payment_status)}`"
        >
          {{ transaction.transactable.amount ? '+' : '-' }} ${{ transaction.transactable.amount || transaction.transactable.total | money }}
        </div>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardTitle, BCardBody, BMediaBody, BMedia, BMediaAside, BAvatar, BDropdown, BDropdownItem,
  BLink,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BCardHeader,
    BCardTitle,
    BCardBody,
    BMediaBody,
    BMedia,
    BMediaAside,
    BAvatar,
    BDropdown,
    BDropdownItem,
    BLink,
  },
  props: {
    transactions: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    transactionIconVariant(status) {
      const statusList = {
        pending: 'warning',
        payed: 'success',
        cancelled: 'danger',
      }
      return statusList[status] ? statusList[status] : 'primary'
    },
    transactionIcon(status) {
      const statusList = {
        pending: 'ClockIcon',
        payed: 'DollarSignIcon',
        cancelled: 'XCircleIcon',
      }
      return statusList[status] ? statusList[status] : 'ShoppingBagIcon'
    },
    transactionName(status) {
      const statusList = {
        payed: 'Depósito exitoso',
        pending: 'Operación pendiente',
        cancelled: 'Operación cancelada',
        sell: 'Realizaste una compra',
      }
      return statusList[status] ? statusList[status] : 'Error'
    },
  },
}
</script>
