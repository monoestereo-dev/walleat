<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-1">
      <div class="d-flex align-items-center">
        <b-avatar
          rounded
          :src="`${apiUrl}${walleat.logo}`"
          size="lg"
        />
        <div class="ml-1">
          <span class="walleat-name">{{ walleat.name }}</span>
        </div>
      </div>
      <div>
        <feather-icon
          class="m-1 cursor-pointer"
          icon="PowerIcon"
          size="28"
          :class="walleat.active_status ? 'text-success' : 'text-danger'"
          @click="changeWalleatActiveStatus()"
        />
        <walleat-settings
          :data="walleat"
          @success="updateWalleat($event)"
        />
      </div>
    </div>
    <b-row class="match-height">
      <b-col class="text-center">
        <b-card no-body>
          <b-card-body
            class="
              d-flex
              flex-column
              justify-content-center
              align-items-center
              cursor-pointer
            "
            @click="changeDailyLimit()"
          >
            <h2 class="display-5">
              $ {{ walleat.daily_limit }}
            </h2>
            Limite diario
          </b-card-body>
        </b-card>
      </b-col>
      <b-col>
        <b-card
          class="text-center cursor-pointer"
          @click="$router.push({ name: 'ban-products', params: { id: walleat.id } })"
        >
          <h2 class="lock-icon">
            🔒
          </h2>
          Administrar consumo
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col
        sm="12"
        md="6"
        lg="4"
      >
        <chartjs-doughnut-chart
          :graph-data="doughnutData"
        />
      </b-col>
      <b-col
        sm="12"
        md="6"
        lg="8"
      >
        <b-card no-body>
          <b-card-header>
            <h2>consumo</h2>
          </b-card-header>
          <orders-table :orders="orders" />
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ChartjsDoughnutChart from '@/@core/components/charts/chartjs/ChartjsDoughnutChart.vue'
import OrdersTable from '@/@core/components/OrdersTable.vue'
import WalleatSettings from '@/views/walleats/WalleatSettings.vue'
import {
  BAvatar,
  BRow,
  BCol,
  BCard,
  BCardBody,
  BCardHeader,
} from 'bootstrap-vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    ChartjsDoughnutChart,
    OrdersTable,
    WalleatSettings,
    BAvatar,
    BRow,
    BCol,
    BCard,
    BCardBody,
    BCardHeader,
  },
  data() {
    return {
      walleat: {
        name: 'test',
      },
      orders: [],
      doughnutData: {},
    }
  },
  computed: {
    ...mapGetters(['apiUrl']),
  },
  beforeMount() {
    const currentBraceletId = this.$router.currentRoute.params.id
    this.fetchWalleat(currentBraceletId).then(response => {
      this.walleat = response
    })
    this.fetchOrders({ by_bracelet: currentBraceletId }).then(response => {
      this.orders = response.data
      this.ordersPagination = response.meta.pagination
    })
    this.fetchWalleatGraph({
      by_bracelet: currentBraceletId,
    }).then(response => {
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
      this.doughnutData = {
        datasets: [
          {
            data: response.data.datasets[0].data,
            labels: response.data.labels,
            backgroundColor: chartColors,
            borderWidth: 0,
            pointStyle: 'rectRounded',
          },
        ],
      }
    })
  },
  methods: {
    ...mapActions('walleats', ['fetchWalleat', 'fetchWalleatGraph', 'editWalleat']),
    ...mapActions('orders', ['fetchOrders']),
    getcurrentDayData() {
      const date = new Date()
      const y = date.getFullYear()
      const m = date.getMonth()
      const d = date.getDate()
      const startDate = new Date(y, m, d)
      const endDate = new Date(y, m, d + 1)
      this.dataPeriod = 'today'
      this.fetchWalleatGraph({
        bracelet_id: this.$route.params.id,
        end_date: endDate,
        start_date: startDate,
      })
      this.fetchOrders({
        by_bracelet: this.$route.params.id,
        by_date: { end_date: endDate, start_date: startDate },
      })
    },
    getcurrentWeekData() {
      this.dataPeriod = 'currentWeek'
      const curr = new Date() // get current date
      const first = curr.getDate() - curr.getDay() // First day is the day of the month - the day of the week
      const last = first + 6 // last day is the first day + 6
      const startDate = new Date(curr.setDate(first))
      const endDate = new Date(curr.setDate(last))
      this.getBraceletGraph({
        bracelet_id: this.$route.params.id,
        end_date: endDate,
        start_date: startDate,
      })
      this.getOrders({
        by_bracelet: this.$route.params.id,
        by_date: { end_date: endDate, start_date: startDate },
      })
    },
    getcurrentMonthData() {
      this.dataPeriod = 'currentMonth'
      const date = new Date()
      const y = date.getFullYear()
      const m = date.getMonth()
      const startDate = new Date(y, m, 1)
      const endDate = new Date(y, m + 1, 0)
      this.getBraceletGraph({
        bracelet_id: this.$route.params.id,
        end_date: endDate,
        start_date: startDate,
      })
      this.getOrders({
        by_bracelet: this.$route.params.id,
        by_date: { end_date: endDate, start_date: startDate },
      })
    },
    changeWalleatActiveStatus() {
      this.editWalleat({
        ...this.walleat,
        active_status: !this.walleat.active_status,
      })
        .then(response => {
          this.updateWalleat(response)
        })
    },
    updateWalleat(walleat) {
      this.walleat = walleat
    },
    changeDailyLimit() {
      this.$swal({
        title: 'Limite diario',
        input: 'text',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
          container: 'dark-layout',
        },
        buttonsStyling: false,
        inputAttributes: {
          autocapitalize: 'off',
        },
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        showLoaderOnConfirm: true,
        preConfirm: dailyLimit => {
          if (!dailyLimit) return null
          return this.editWalleat({
            ...this.walleat,
            daily_limit: dailyLimit,
          })
            .then(response => response)
        },
      })
        .then(response => {
          this.updateWalleat(response.value)
        })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-sweetalert.scss';
.walleat-name {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.3rem;
  font-weight: 600;
}
.lock-icon {
  font-size: 32px;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
