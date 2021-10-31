<template>
  <div>
    <b-card
      class="balance"
      bg-variant="transparent"
    >
      <b-row class="d-flex">
        <feather-icon
          class="ml-1"
          :icon=" isBalanceVisible ? 'EyeIcon' : 'EyeOffIcon'"
          @click="toggleBalanceVisible(isBalanceVisible = !isBalanceVisible)"
        />
      </b-row>
      <div class="d-flex">
        <b-col>
          Saldo a favor
        </b-col>
        <b-col>
          Saldo por pagar
        </b-col>
      </div>
      <b-row class="d-flex justify-content-around mt-1">
        <b-col>
          <h1
            v-if="isBalanceVisible"
            class="display-5"
          >
            $ {{ userData.customer.current_balance | money }}
          </h1>
          <h1
            v-else
            class="display-5"
          >
            $ *****
          </h1>
        </b-col>
        <b-col>
          <h1
            v-if="isBalanceVisible"
            class="display-6"
          >
            $ {{ userData.customer.current_loan_balance | money }}
          </h1>
          <h1
            v-else
            class="display-6"
          >
            $ *****
          </h1>
        </b-col>
      </b-row>
      <b-row class="d-flex justify-content-around mt-1">
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
            :to="{ name: 'choose-payment-gateway' }"
          >
            Depositar
          </b-button>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import {
  BRow, BCol, BButton, BCard,
} from 'bootstrap-vue'
import { mapMutations, mapGetters } from 'vuex'

export default {
  components: {
    BRow, BCol, BButton, BCard,
  },
  props: {
    userData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters('appConfig', [
      'isBalanceVisible',
    ]),
  },
  methods: {
    ...mapMutations('appConfig', [
      'toggleBalanceVisible',
    ]),
  },
}
</script>

<style lang="scss" scoped>
.display-5 {
  font-size: 2.4rem;
}
.display-6 {
  font-size: 2.4rem;
  color:brown;
}
</style>
