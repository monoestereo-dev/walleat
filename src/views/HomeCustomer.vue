<template>
  <div>
    <b-row class="">
      <b-col
        v-if="userData.customer"
        sm="12"
        md="6"
        lg="5"
        xl="4"
      >
        <current-balance :user-data="userData" />
        <add-your-first-bracelet :data="congratulations" />
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
import CurrentBalance from '@/@core/components/CurrentBalance.vue'

export default {
  components: {
    BRow,
    BCol,
    TransactionsTimeline,
    AddYourFirstBracelet,
    CurrentBalance,
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
      orders: [],
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
    this.fetchOrders()
      .then(response => {
        this.orders = response.data
      })
  },
  methods: {
    ...mapActions('orders', ['fetchOrders']),
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/dashboard-ecommerce.scss';
@import '@core/scss/vue/libs/chart-apex.scss';

</style>
