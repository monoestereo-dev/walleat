<template>
  <div>
    <div v-if="userData.customer">
      <div class="d-flex align-items-center mb-1">
        Balance total
        <feather-icon class="ml-1" icon="EyeIcon" />
      </div>
      <div class="d-flex">
        <h1 class="display-4">
          $ {{userData.customer.current_balance}}
        </h1>
        <feather-icon
          icon="InfoIcon"
        />
      </div>
      <b-row class="d-flex justify-content-around mt-1 mb-2">
        <b-col>
          <b-button
            block
            pill
          >
            Retirar
          </b-button>
        </b-col>
        <b-col>
          <b-button
            block
            pill
            variant="success"
          >
            Depositar
          </b-button>
        </b-col>
      </b-row>
    </div>
    <b-row class="match-height mt-1">
      <b-col
        xl="4"
        md="6"
      >
        <add-your-first-bracelet :data="congratulations" />
      </b-col>
      <b-col
        xl="8"
        md="6"
      >
        <customer-statistics :data="statisticsItems" />
      </b-col>
    </b-row>
  </div>
</template>

<script>

import { BRow, BCol, BButton } from 'bootstrap-vue'
import { getUserData } from '@/auth/utils'
import CustomerStatistics from '@/@core/components/CustomerStatistics.vue'
import AddYourFirstBracelet from '@/@core/components/BraceletWizzard.vue'

export default {
  components: {
    BRow,
    BCol,
    BButton,

    CustomerStatistics,
    AddYourFirstBracelet,
  },
  data() {
    return {
      userData: {},
      congratulations: {
        name: 'John',
        saleToday: '48900',
      },
      statisticsItems: [
        {
          icon: 'TrendingUpIcon',
          color: 'light-primary',
          title: '230k',
          subtitle: 'Sales',
          customClass: 'mb-2 mb-xl-0',
        },
        {
          icon: 'UserIcon',
          color: 'light-info',
          title: '8.549k',
          subtitle: 'Customers',
          customClass: 'mb-2 mb-xl-0',
        },
        {
          icon: 'BoxIcon',
          color: 'light-danger',
          title: '1.423k',
          subtitle: 'Products',
          customClass: 'mb-2 mb-sm-0',
        },
        {
          icon: 'DollarSignIcon',
          color: 'light-success',
          title: '$9745',
          subtitle: 'Revenue',
          customClass: '',
        },
      ],
    }
  },
  created() {
    // data
    // this.$http.get('/ecommerce/data')
    //   .then(response => {
    //     this.data = response.data

    //     // ? Your API will return name of logged in user or you might just directly get name of logged in user
    //     // ? This is just for demo purpose
    //     const userData = getUserData()
    //     this.data.congratulations.name = userData.fullName.split(' ')[0] || userData.username
    //   })
    this.userData = getUserData()
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/dashboard-ecommerce.scss';
@import '@core/scss/vue/libs/chart-apex.scss';
</style>
