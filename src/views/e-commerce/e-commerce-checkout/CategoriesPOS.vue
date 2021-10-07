<template>
  <div class="mt-1">
    <b-badge
      class="mr-1 mb-1"
      variant="light-info"
      @click="filterByCategory({by_store: $route.params.store_id})"
    >
      Todas
    </b-badge>
    <b-badge
      v-for="category in categories"
      :key="category.id"
      class="mr-1 mb-1 cursor-pointer"
      pill
      variant="light-primary"
      @click="filterByCategory({by_category: category.id, by_store: $route.params.store_id})"
    >
      {{ category.name }}
    </b-badge>
    <b-row
      class="match-height"
    >
      <b-col
        v-for="product in storeProducts"
        :key="product.id"
        md="6"
        lg="12"
        xl="6"
      >
        <b-card
          v-ripple.400="'rgba(40, 199, 111, 0.15)'"
          no-body
          @click="manageAddProductToCart({ data: [{ ...product }] })"
        >

          <!-- Product Details: Card Body -->
          <b-card-body
            class="d-flex"
          >
            <!-- Product Image -->
            <div class="mr-1">
              <b-link>
                <b-img
                  :src="product.product_attributes.logo"
                  :alt="`${product.product_attributes.name}-${product.id}`"
                  width="80"
                />
              </b-link>
            </div>
            <div class="item-name d-flex flex-column justify-content-between">
              <div>
                <h6 class="">
                  <b-link class="text-body">
                    {{ product.product_attributes.name }}
                  </b-link>
                </h6>
                <b-badge
                  variant="light-primary"
                >
                  {{ product.product_attributes.variant }}
                </b-badge>
              </div>
              <div>
                <h4 class="item-price text-success">
                  ${{ product.unit_price * product.units | money }}
                </h4>
              </div>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BBadge,
  BCol,
  BRow,
  // BButton,

  BImg,
  BCard,
  BLink,
  BCardBody,
} from 'bootstrap-vue'
import { mapActions, mapGetters } from 'vuex'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BBadge,
    BCol,
    BRow,
    // BButton,
    BImg,
    BCard,
    BLink,
    BCardBody,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      categories: [],
    }
  },
  computed: {
    ...mapGetters('storeProducts', [
      'storeProducts',
    ]),
  },
  mounted() {
    this.fetchCategories({ by_store: this.$route.params.store_id })
      .then(response => {
        this.categories = response.data
      })
    this.getStoreProductsStore({ by_store: this.$route.params.store_id })
  },
  methods: {
    ...mapActions('categories', [
      'fetchCategories',
    ]),
    ...mapActions('storeProducts', [
      'getStoreProductsStore',
    ]),
    ...mapActions('pos', [
      'addProductToCart',
    ]),
    filterByCategory(params) {
      this.getStoreProductsStore(params)
        .then(response => {
          this.storeProducts = response.data
        })
    },
    manageAddProductToCart(data) {
      // eslint-disable-next-line
      const audio = new Audio(require('@/assets/sounds/Beep2.wav'))
      audio.play()
      if (navigator.vibrate) {
        navigator.vibrate(200)
      }
      this.addProductToCart(data)
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
