<template>
  <div>
    <b-row class="match-height">
      <b-col cols="3">
        <profit-statistics />
      </b-col>
      <b-col>
        <statistics :data="storeStats" />
      </b-col>
    </b-row>
    <sales-transactions-table
      :orders="orders"
    >
      <date-range-picker
        ref="picker"
        v-model="dateRange"
        :locale-data="{ firstDay: 1, format: 'dd-mm-yyyy HH:mm:ss' }"
        @update="updateRanges"
      >
        <template
          v-slot:input="picker2"
          style="min-width: 350px;"
        >
          {{ picker2.startDate | date }} - {{ picker2.endDate | date }}
        </template>
      </date-range-picker>
    </sales-transactions-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import {
  BCol,
  BRow,
} from 'bootstrap-vue'
import DateRangePicker from 'vue2-daterange-picker'
import Statistics from '@core/components/CustomerStatistics.vue'
import ProfitStatistics from '@core/components/ProfitCard.vue'
import SalesTransactionsTable from './SalesTransactionsTable.vue'
// you need to import the CSS manually
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

export default {
  components: {
    DateRangePicker,
    SalesTransactionsTable,
    Statistics,
    ProfitStatistics,
    BRow,
    BCol,
  },
  data() {
    return {
      dateRange: {
        startDate: Date.now(),
        endDate: Date.now(),
      },
      picker: {
        startDate: '2021-01-01',
        endDate: '2021-12-31',
      },
      storeStats: [
        {
          title: '100',
          subtitle: 'Ventas',
          icon: 'TrendingUpIcon',
          color: 'light-success',
          customClass: 'mb-1',
        },
        {
          title: '250',
          subtitle: 'Productos vendidos',
          icon: 'ShoppingBagIcon',
          color: 'light-info',
          customClass: 'mb-1',
        },
        {
          title: '$1,100.00',
          subtitle: 'Efectivo',
          icon: 'DollarSignIcon',
          color: 'light-warning',
          customClass: 'mb-1',
        },
        {
          title: '$1,800.00',
          subtitle: 'Crédito',
          icon: 'CreditCardIcon',
          color: 'light-primary',
          customClass: 'mb-1',
        },
      ],
    }
  },
  computed: {
    ...mapGetters('orders', [
      'orders',
    ]),
  },
  mounted() {
    this.fetchOrders({
      by_date: {
        start_date: this.formatFirstDate(this.dateRange.startDate),
        end_date: this.formatDate(this.dateRange.endDate),
      },
      by_store: this.$route.params.id,
    })
  },
  methods: {
    ...mapActions('orders', [
      'fetchOrders',
    ]),
    updateRanges(range) {
      this.fetchOrders({
        by_date: {
          start_date: this.formatDate(range.startDate),
          end_date: this.formatDate(range.endDate),
        },
        by_store: this.$route.params.id,
      })
    },
    formatDate(date) {
      const d = new Date(date)
      let month = `${d.getMonth() + 1}`
      let day = `${d.getDate()}`
      const year = d.getFullYear()

      if (month.length < 2) month = `0${month}`
      if (day.length < 2) day = `0${day}`

      return [year, month, day].join('-')
    },
    formatFirstDate(date) {
      const d = new Date(date)
      let month = `${d.getMonth() + 1}`
      let day = '1'
      const year = d.getFullYear()

      if (month.length < 2) month = `0${month}`
      if (day.length < 2) day = `0${day}`

      return [year, month, day].join('-')
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
