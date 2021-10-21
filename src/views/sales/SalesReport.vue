<template>
  <div>
    <b-row class="">
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
            size="lg"
            :to="{ name: 'POS', params: { store_id: $route.params.id } }"
          >
            <i class="fas fa-cash-register mr-1" />
            POS
          </b-button>
          <b-button
            block
            variant="outline-primary"
            :to="{ name: 'store-products', params: { id: $route.params.id } }"
          >
            <feather-icon
              icon="PackageIcon"
            />
            Administrar productos
          </b-button>
          <b-button
            v-if="userData.role_name === 'admin' || userData.role_name === 'establishment_admin'"
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
        lg="9"
      >
        <b-row>
          <b-col>
            <statistics :data="storeStats" />
          </b-col>
        </b-row>
        <b-row class="match-height">
          <b-col>
            <b-card>
              <swiper
                ref="mySwiper"
                class="swiper-navigations h-100"
                :options="swiperOptions"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              >
                <swiper-slide>
                  <b-card-title>
                    Promedio de ventas por día
                  </b-card-title>
                  <div class="px-5">
                    <sales-stores-day :height="300" />
                  </div>
                </swiper-slide>
                <swiper-slide>
                  <b-card-title>
                    Historial de ventas
                  </b-card-title>
                  <div class="px-5">
                    <sales-stores-date :height="300" />
                  </div>
                </swiper-slide>
                <swiper-slide>
                  <b-card-title>
                    Promedio de ventas por hora
                  </b-card-title>
                  <div class="px-5">
                    <store-sales-per-hour :height="300" />
                  </div>
                </swiper-slide>
                <!-- <swiper-slide>
                  <b-card-title>
                    Ventas diarias por categoría
                  </b-card-title>
                  <div class="px-5">
                    <sales-stores-category-date :height="300" />
                  </div>
                </swiper-slide> -->
                <swiper-slide>
                  <chartjs-doughnut-chart
                    :graph-data="salesReport"
                    :doughnut-size="150"
                  />
                </swiper-slide>
                <div
                  slot="button-next"
                  class="swiper-button-next"
                />
                <div
                  slot="button-prev"
                  class="swiper-button-prev"
                />
                <div
                  slot="pagination"
                  class="swiper-pagination"
                />
              </swiper>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <sales-transactions-table
      :orders="orders"
    >
      <div class="d-flex align-items-center">
        <feather-icon
          icon="CalendarIcon"
          size="16"
        />
        <flat-pickr
          v-model="rangePicker"
          :config="{ mode: 'range'}"
          class="form-control  bg-transparent border-0 shadow-none"
          placeholder="YYYY-MM-DD"
          @on-change="updateRanges()"
        />
      </div>
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
  BCardTitle,
} from 'bootstrap-vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import flatPickr from 'vue-flatpickr-component'
import Statistics from '@core/components/CustomerStatistics.vue'
import ProfitStatistics from '@core/components/ProfitCard.vue'
import ChartjsDoughnutChart from '@/@core/components/charts/chartjs/ChartjsDoughnutChart.vue'
import SalesStoresDay from '@/views/sales/graph-reports/SalesStoresDay.vue'
import SalesStoresDate from '@/views/sales/graph-reports/SalesStoresDate.vue'
// import SalesStoresCategoryDate from '@/views/sales/graph-reports/SalesStoresCategoryDate.vue'
import StoreSalesPerHour from '@/views/sales/graph-reports/StoreSalesPerHour.vue'
import SalesTransactionsTable from './SalesTransactionsTable.vue'
// you need to import the CSS manually
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import 'swiper/css/swiper.css'

export default {
  components: {
    Swiper,
    SwiperSlide,
    SalesTransactionsTable,
    Statistics,
    ProfitStatistics,
    ChartjsDoughnutChart,
    BRow,
    BCol,
    BCard,
    BButton,
    flatPickr,
    BCardTitle,
    SalesStoresDay,
    SalesStoresDate,
    // SalesStoresCategoryDate,
    StoreSalesPerHour,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      rangePicker: ['2021-09-01', '2021-09-20'],
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
      storeStats: {
        ventas: {
          title: '0',
          subtitle: 'Ventas',
          icon: 'TrendingUpIcon',
          color: 'light-success',
          customClass: 'mb-1',
        },
        utilidades: {
          title: '0',
          subtitle: 'Utilidades',
          icon: 'ShoppingBagIcon',
          color: 'light-info',
          customClass: 'mb-1',
        },
      },
      swiperOptions: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        // pagination: {
        //   el: '.swiper-pagination',
        // },
      },
    }
  },
  computed: {
    ...mapGetters('orders', [
      'orders',
    ]),
    ...mapGetters('reports', [
      'salesCurrentDate',
      'marginCurrentDate',
    ]),
  },
  watch: {
    salesCurrentDate(val) {
      this.storeStats.ventas.title = `$${val}`
    },
  },
  mounted() {
    // this.rangePicker = [this.formatFirstDate(this.dateRange.startDate), this.formatDate(this.dateRange.endDate)]
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
    this.fetchMarginStoresCategoryDate({ by_store_id: this.$route.params.id })
    this.fetchInventoryTurnover({ by_store_id: this.$route.params.id })
  },
  methods: {
    ...mapActions('orders', [
      'fetchOrders',
    ]),
    ...mapActions('reports', [
      'fetchMarginStoresCategory',
      'fetchSalesStoresDay',
      'fetchStoreSalesPerHour',
      'fetchMarginStoresCategoryDate',
      'fetchSalesStoresCategoryDate',
      'fetchSalesStoresDate',
      'fetchInventoryTurnover',
    ]),
    updateRanges() {
      this.fetchOrders({
        by_date: {
          start_date: this.rangePicker.substring(0, 10),
          end_date: this.rangePicker.substring(14),
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

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';

</style>
