<template>
  <div>
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
          v-slot:input="picker"
          style="min-width: 350px;"
        >
          {{ picker.startDate | date }} - {{ picker.endDate | date }}
        </template>
      </date-range-picker>
    </sales-transactions-table>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import DateRangePicker from 'vue2-daterange-picker'
import SalesTransactionsTable from './SalesTransactionsTable.vue'
// you need to import the CSS manually
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

export default {
  components: {
    DateRangePicker,
    SalesTransactionsTable,
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
      orders: {
        meta: {
          pagination: {},
        },
        data: [],
      },
    }
  },
  mounted() {
    this.fetchOrders({
      by_date: {
        start_date: this.formatFirstDate(this.dateRange.startDate),
        end_date: this.formatDate(this.dateRange.endDate),
      },
      by_store: this.$route.params.id,
    })
      .then(response => {
        this.orders = response
      })
  },
  methods: {
    ...mapActions('orders', [
      'fetchOrders',
    ]),
    updateRanges(range) {
      console.log(range)
      this.fetchOrders({
        by_date: {
          start_date: this.formatDate(range.startDate),
          end_date: this.formatDate(range.endDate),
        },
        by_store: this.$route.params.id,
      })
        .then(response => {
          this.orders = response
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
