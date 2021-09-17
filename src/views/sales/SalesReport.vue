<template>
  <div>
    <b-row class="match-height">
      <b-col
        cols="12"
        md="6"
        lg="3"
      >
        <profit-statistics />
        <b-card>
          <b-button
            block
            variant="primary"
            class="mb-2 mt-1"
            size="lg"
            :to="{ name: 'POS', params: { store_id: $route.params.id } }"
          >
            <i class="fas fa-cash-register mr-1" />
            POS
          </b-button>
          <b-button
            block
            variant="outline-primary"
            class="mb-1"
            :to="{ name: 'store-products', params: { id: $route.params.id } }"
          >
            <feather-icon
              class="mr-1"
              icon="PackageIcon"
            />
            Administrar productos
          </b-button>
          <b-button
            block
            variant="outline-primary"
            :to="{ name: 'store-users', params: { id: $route.params.id } }"
          >
            <feather-icon
              class="mr-1"
              icon="UsersIcon"
            />
            Administrar Usuarios
          </b-button>
        </b-card>

      </b-col>
      <b-col
        cols="12"
        md="6"
        lg="6"
      >
        <statistics :data="storeStats" />
        <b-card>
          .
        </b-card>
      </b-col>
      <b-col
        cols="12"
        md="6"
        lg="3"
      >
        <chartjs-doughnut-chart :graph-data="salesReport" />
      </b-col>
    </b-row>
    <sales-transactions-table
      :orders="orders"
    >
      <date-range-picker
        ref="picker"
        v-model="dateRange"
        class="datePicker"
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
  BCard,
  BButton,
} from 'bootstrap-vue'
import DateRangePicker from 'vue2-daterange-picker'
import Statistics from '@core/components/CustomerStatistics.vue'
import ProfitStatistics from '@core/components/ProfitCard.vue'
import ChartjsDoughnutChart from '@/@core/components/charts/chartjs/ChartjsDoughnutChart.vue'
import SalesTransactionsTable from './SalesTransactionsTable.vue'
// you need to import the CSS manually
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

export default {
  components: {
    DateRangePicker,
    SalesTransactionsTable,
    Statistics,
    ProfitStatistics,
    ChartjsDoughnutChart,
    BRow,
    BCol,
    BCard,
    BButton,
  },
  data() {
    return {
      salesReport: {
        labels: [],
        datasets: [
          {
            data: [],
          },
        ],
      },
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
    this.fetchMarginStoresCategory({ by_store_id: this.$route.params.id })
      .then(response => {
        const chartColors = [
          '#836AF9',
          '#ffe800',
          '#28dac6',
          '#ffe802',
          '#FDAC34',
          '#299AFF',
          '#4F5D70',
          '#2c9aff',
          '#666ee8',
          '#84D0FF',
          '#EDF1F4',
          '#ff4961',
          '#4F5D70',
          '#2c9aff',
          '#836AF9',
          '#84D0FF',
          '#ffe800',
          '#ff4961',
          '#6e6b7b',
          '#ffe802',
          '#FDAC34',
          '#299AFF',
          '#EDF1F4',
          '#666ee8',
          '#28dac6',
          '#6e6b7b',
        ]
        const graphData = {
          labels: [],
          datasets: [
            {
              backgroundColor: chartColors,
              borderWidth: 0,
              pointStyle: 'rectRounded',
              data: [],
              labels: [],
            },
          ],
        }
        response.forEach(x => {
          graphData.datasets[0].labels.push(x.name)
          graphData.datasets[0].data.push(Number(x.total))
        })
        this.salesReport = graphData
      })
  },
  methods: {
    ...mapActions('orders', [
      'fetchOrders',
    ]),
    ...mapActions('reports', [
      'fetchMarginStoresCategory',
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
.datePicker{
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
