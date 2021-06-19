<template>
  <div>
    <b-row class="match-height">
      <b-col
        xl="4"
        md="6"
      >
        <add-your-first-bracelet :data="data.congratulations" />
      </b-col>
      <b-col
        xl="8"
        md="6"
      >
        <customer-statistics :data="data.statisticsItems" />
      </b-col>
    </b-row>
  </div>
</template>

<script>

import { BRow, BCol } from 'bootstrap-vue'
import { getUserData } from '@/auth/utils'
import CustomerStatistics from '@/@core/components/CustomerStatistics.vue'
import AddYourFirstBracelet from '@/@core/components/BraceletWizzard.vue'

export default {
  components: {
    BRow,
    BCol,
    CustomerStatistics,
    AddYourFirstBracelet,
  },
  data() {
    return {
      data: {},
    }
  },
  created() {
    // data
    this.$http.get('/ecommerce/data')
      .then(response => {
        this.data = response.data

        // ? Your API will return name of logged in user or you might just directly get name of logged in user
        // ? This is just for demo purpose
        const userData = getUserData()
        this.data.congratulations.name = userData.fullName.split(' ')[0] || userData.username
      })
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/dashboard-ecommerce.scss';
@import '@core/scss/vue/libs/chart-apex.scss';
</style>
