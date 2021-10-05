<template>
  <div>
    <b-row>
      <b-col>
        <component
          :is="dashboardDependingRole(userData.role_name)"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BRow, BCol,
} from 'bootstrap-vue'
import EstablishmentAdminDashboard from '@/views/dashboard/EstablishmentAdminDashboard.vue'
import CustomerDashboard from '@/views/dashboard/CustomerDashboard.vue'
import StoreClerkDashboard from '@/views/dashboard/StoreClerkDashboard.vue'
import AdminDashboard from '@/views/dashboard/AdminDashboard.vue'
import { getUserData } from '@/auth/utils'

export default {
  components: {
    BRow,
    BCol,

    EstablishmentAdminDashboard,
    CustomerDashboard,
    StoreClerkDashboard,
    AdminDashboard,
  },
  data() {
    return {
      userData: {},
    }
  },
  created() {
    this.userData = getUserData()
  },
  methods: {
    dashboardDependingRole(role) {
      const roles = {
        admin: 'admin-dashboard',
        establishment_admin: 'establishment-admin-dashboard',
        customer: 'customer-dashboard',
        store_clerk: 'store-clerk-dashboard',
      }
      return roles[role]
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/dashboard-ecommerce.scss';
@import '@core/scss/vue/libs/chart-apex.scss';

</style>
