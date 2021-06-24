<template>
  <b-row>
    <b-col>
      <form-wizard-vertical />
    </b-col>
  </b-row>
</template>

<script>
import FormWizardVertical from '@/views/walleats/add-credit/FormWizardVertical.vue'
import { BRow, BCol } from 'bootstrap-vue'

export default {
  components: {
    BRow,
    BCol,
    FormWizardVertical,
  },
}
</script>

<style lang="scss" scoped>
  @import '@core/scss/vue/libs/vue-wizard.scss';
  @import '@core/scss/vue/libs/vue-select.scss';
</style>
