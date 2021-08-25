<template>
  <div>
    <b-card
      no-body
    >
      <div class="d-flex justify-content-start align-items-center">

        <!-- Product Image -->
        <div class="m-1">
          <b-img
            :src="product.logo"
            alt="img"
            width="80"
          />
        </div>

        <!-- Product Details: Card Body -->
        <div class="item-name">
          <h6 class="mb-0">
            <b-link class="text-body">
              {{ product.name }}
            </b-link>
          </h6>
          <div class="item-rating">
            {{ product.variant }}
          </div>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import {
  BCard, BLink, BImg,
} from 'bootstrap-vue'

export default {
  components: {
    BCard, BLink, BImg,
  },
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
