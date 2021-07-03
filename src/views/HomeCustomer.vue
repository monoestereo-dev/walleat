<template>
  <div>
    <b-row class="match-height">
      <b-col
        v-if="userData.customer"
        sm="12"
        md="6"
        lg="5"
        xl="4"
      >
        <current-balance :user-data="userData" />
        <add-your-first-bracelet
          v-if="userData.customer && userData.customer.bracelets_count === 0"
        />
        <customer-transactions :transactions="transactions" />
      </b-col>
      <b-col
        cols="12"
        md="6"
        lg="7"
        xl="8"
      >
        <transactions-timeline :orders="orders" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import {
  BRow, BCol,
} from 'bootstrap-vue'
import { getUserData } from '@/auth/utils'
import TransactionsTimeline from '@/@core/components/TransactionsTimeline.vue'
import AddYourFirstBracelet from '@/@core/components/BraceletWizzard.vue'
import CustomerTransactions from '@/@core/components/CustomerTransactions.vue'
import CurrentBalance from '@/@core/components/CurrentBalance.vue'

export default {
  components: {
    BRow,
    BCol,
    TransactionsTimeline,
    AddYourFirstBracelet,
    CustomerTransactions,
    CurrentBalance,
  },
  data() {
    return {
      userData: {},
      orders: [],
      transactions: [],
    }
  },
  created() {
    this.userData = getUserData()
    this.fetchOrders()
      .then(response => {
        this.orders = response.data
      })
    this.fetchTransactions({
      meta: {
        pagination: {
          per_page: 14,
        },
      },
    })
      .then(response => {
        this.transactions = response.data
      })
  },
  methods: {
    ...mapActions('orders', ['fetchOrders']),
    ...mapActions('walleats', ['fetchTransactions']),
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/dashboard-ecommerce.scss';
@import '@core/scss/vue/libs/chart-apex.scss';

</style>
