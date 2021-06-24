<template>
  <div>

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="productData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching user data
      </h4>
      <div class="alert-body">
        No products found with this user id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'apps-users-list'}"
        >
          products List
        </b-link>
        for other prducts.
      </div>
    </b-alert>

    <template v-if="productData">
      <!-- First Row -->
      <b-row>
        <b-col
          cols="12"
        >
          <product-info-card :product="productData" />
        </b-col>
      </b-row>

    </template>

  </div>
</template>

<script>
import store from '@/store'
import router from '@/router'
import { ref } from '@vue/composition-api'
import {
  BRow, BCol, BAlert, BLink,
} from 'bootstrap-vue'
import ProductInfoCard from './ProductInfoCard.vue'

export default {
  components: {
    BRow,
    BCol,
    BAlert,
    BLink,

    // Local Components
    ProductInfoCard,
  },
  setup() {
    const productData = ref(null)
    store.dispatch('products/fetchProduct', router.currentRoute.params.id)
      .then(response => { productData.value = response })
      .catch(error => {
        if (error.response.status === 404) {
          productData.value = undefined
        }
      })

    return {
      productData,
    }
  },
}
</script>

<style>

</style>
