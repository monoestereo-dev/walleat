<template>
  <div>
    <b-row class="match-height">
      <b-col lg="8">
        <establishment-admin-statistics :data="dashboardStats" />
      </b-col>
      <b-col
        lg="4"
        @click="toStablishment()"
      >
        <statistic-card-vertical
          icon="ShoppingBagIcon"
          :statistic="Number(dashboardData.store_count) || 0"
          :statistic-title="`Punto${dashboardData.store_count > 1 ? 's' : ''} de venta`"
          color="primary"
          class="pt-1 cursor-pointer"
        />
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="12">
        <b-card
          no-body
          class="pb-2"
        >
          <b-card-body>
            <b-card-title class="mb-0 d-flex justify-content-between">
              Últimas ventas
            </b-card-title>
          </b-card-body>
          <b-card-text>
            <b-table
              :items="dashboardData.last_transactions"
              :fields="fields"
            >
              <template #cell(created_at)="data">
                {{ data.value | date }} - {{ data.value | time }}
              </template>
              <template #cell(total)="data">
                ${{ data.value | money }}
              </template>
              <template #cell(iva)="data">
                ${{ data.value | money }}
              </template>
              <template #cell(subtotal)="data">
                ${{ data.value | money }}
              </template>
            </b-table>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BTable,
  BCard,
  BCardText,
  BCardTitle,
  BCardBody,
} from 'bootstrap-vue'
import EstablishmentAdminStatistics from '@/@core/components/EstablishmentAdminStatistics.vue'
import StatisticCardVertical from '@core/components/statistics-cards/StatisticCardVertical.vue'
import { mapActions, mapMutations } from 'vuex'

export default {
  components: {
    BCol,
    BRow,
    BTable,
    BCard,
    BCardText,
    BCardTitle,
    BCardBody,
    EstablishmentAdminStatistics,
    StatisticCardVertical,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      dashboardData: {},
      dashboardStats: [],
      fields: [
        {
          key: '#',
          label: '#',
        },
        {
          key: 'created_at',
          label: 'Fecha',
        },
        {
          key: 'payment_type',
          label: 'Tipo de pago',
        },
        {
          key: 'iva',
          label: 'IVA',
          class: 'text-right',
        },
        {
          key: 'subtotal',
          label: 'Subtotal',
          class: 'text-right',
        },
        {
          key: 'total',
          label: 'Total',
          class: 'text-right',
        },
      ],
    }
  },
  mounted() {
    this.fetchDashboard()
      .then(response => {
        this.dashboardData = response
        const labels = {
          daily: 'Hoy',
          weekly: 'Semana en curso',
          monthly: 'Mes en curso',
        }
        Object.keys(response.order_totals).forEach(x => {
          const stat = {
            title: `$ ${response.order_totals[x]}`,
            subtitle: labels[x],
            icon: 'TrendingUpIcon',
            color: 'light-success',
            customClass: 'mb-1',
          }
          this.dashboardStats.push(stat)
        })
      })
  },
  methods: {
    ...mapActions('dashboard', ['fetchDashboard']),
    ...mapMutations('orders', ['setOrders']),
    toStablishment() {
      this.$router.push({
        name: 'establishment-view',
        params: {
          id: this.userData.scoped_roles.filter(x => x.role_resource_type === 'Establishment')[0].role_resource_id,
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
