<template>
  <div>
    <b-card
      class="balance"
      bg-variant="transparent"
    >
      <div class="d-flex align-items-center mb-1">
        Balance total
        <feather-icon
          class="ml-1"
          :icon=" isBalanceVisible ? 'EyeIcon' : 'EyeOffIcon'"
          @click="isBalanceVisible = !isBalanceVisible"
        />
      </div>
      <div class="d-flex">
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
      </div>
      <b-row class="d-flex justify-content-around mt-1">
        <b-col>
          <b-button
            block
            pill
            :to="{ name: 'creditCard-banregio' }"
          >
            Retirar
          </b-button>
        </b-col>
        <b-col>
          <b-button
            block
            pill
            variant="success"
            :to="{ name: 'walleat-add-credit' }"
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
    return {
      isBalanceVisible: true,
    }
  },
}
</script>

<style lang="scss" scoped>
.display-5 {
  font-size: 2.9rem;
}
</style>
