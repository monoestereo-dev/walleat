<template>
  <b-row>
    <b-col
      cols="12"
    >
      <b-link
        :to="{ name: 'creditCard-banregio' }"
      >
        <b-card>
          <div class="d-flex align-items-center justify-content-between">
            <h3>Tarjeta de crédito</h3>
            <b-img
              :src="require('@/assets/images/logo/credit-card.png')"
              height="25"
              class="ml-1"
            />
          </div>
        </b-card>
      </b-link>
    </b-col>
    <b-col
      cols="12"
    >
      <b-link
        :to="{ name: 'walleat-add-credit' }"
      >
        <b-card>
          <div class="d-flex align-items-center justify-content-between">
            <h3>CoDi</h3>
            <b-img
              :src="require('@/assets/images/logo/CODI.svg')"
              height="40"
              class="ml-1"
            />
          </div>
        </b-card>
      </b-link>
    </b-col>
  </b-row>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BImg,
  BLink,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BImg,
    BLink,
  },
}
</script>

<style lang="scss" scoped>

</style>
