<template>
  <div>
    <b-row class="match-height">
      <b-col
        v-for="stat in dashboardStats"
        :key="stat.subtitle"
        xl="2"
        md="4"
        sm="6"
      >
        <statistic-card-vertical
          :icon="stat.icon"
          :statistic="stat.title"
          :statistic-title="stat.subtitle"
          :color="stat.color"
        />
      </b-col>
      <b-col
        xl="4"
        md="8"
        sm="12"
      >
        <earnings-card />
      </b-col>
      <b-col lg="12">
        <sales-transactions-table :orders="dashboardData.last_transactions" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
} from 'bootstrap-vue'
import SalesTransactionsTable from '@/views/sales/SalesTransactionsTable.vue'
import StatisticCardVertical from '@core/components/statistics-cards/StatisticCardVertical.vue'
import EarningsCard from '@core/components/statistics-cards/EarningsCard.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    BCol,
    BRow,
    SalesTransactionsTable,
    StatisticCardVertical,
    EarningsCard,
  },
  data() {
    return {
      dashboardData: {},
      dashboardStats: [],
    }
  },
  created() {
    this.fetchWalleats({ meta: { pagination: { per_page: 1 } } })
      .then(response => {
        const stat = {
          title: response.meta.pagination.total_objects,
          subtitle: 'Walleats',
          icon: 'DollarSignIcon',
          color: 'warning',
        }
        this.dashboardStats.push(stat)
      })
    this.fetchEstablishments({ meta: { pagination: { per_page: 1 } } })
      .then(response => {
        const stat = {
          title: response.meta.pagination.total_objects,
          subtitle: 'Establecimientos',
          icon: 'ShoppingBagIcon',
          color: 'primary',
        }
        this.dashboardStats.push(stat)
      })
    this.fetchProducts({ meta: { pagination: { per_page: 1 } } })
      .then(response => {
        const stat = {
          title: response.data.meta.pagination.total_objects,
          subtitle: 'Productos',
          icon: 'BoxIcon',
          color: 'success',
        }
        this.dashboardStats.push(stat)
      })
    this.fetchCategories({ meta: { pagination: { per_page: 1 } } })
      .then(response => {
        const stat = {
          title: response.meta.pagination.total_objects,
          subtitle: 'Categorías',
          icon: 'BookmarkIcon',
          color: 'info',
        }
        this.dashboardStats.push(stat)
      })
  },
  methods: {
    ...mapActions('walleats', ['fetchWalleats']),
    ...mapActions('establishments', ['fetchEstablishments']),
    ...mapActions('products', ['fetchProducts']),
    ...mapActions('categories', ['fetchCategories']),
  },
}
</script>

<style lang="scss" scoped>

</style>
