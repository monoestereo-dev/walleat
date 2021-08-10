<template>
  <div class="list-view product-checkout mt-0">

    <!-- Products search -->
    <div>
      <b-card>
        <label class="section-label mb-1">Search the product by name or SKU</label>
        <vue-typeahead-bootstrap
          class="mb-4"
          v-model="query"
          :ieCloseFix="false"
          :data="storeProducts"
          :serializer="item => item.product_attributes.name"
          @hit="selectedProduct = $event"
          @input="lookupStoreProducts"
        />
      </b-card>
    </div>

    <!-- Products List -->
    <e-commerce-checkout-step-cart-products />

    <!-- Checkout Options -->
    <div class="checkout-options">
      <b-card>
        <div class="price-details">
          <h6 class="price-title">
            Price Details
          </h6>
          <ul class="list-unstyled">
            <li class="price-detail">
              <div class="detail-title">
                Total MRP
              </div>
              <div class="detail-amt">
                $598
              </div>
            </li>
            <li class="price-detail">
              <div class="detail-title">
                Bag Discount
              </div>
              <div class="detail-amt discount-amt text-success">
                -25$
              </div>
            </li>
            <li class="price-detail">
              <div class="detail-title">
                Estimated Tax
              </div>
              <div class="detail-amt">
                $1.3
              </div>
            </li>
            <li class="price-detail">
              <div class="detail-title">
                EMI Eligibility
              </div>
              <a
                href="javascript:void(0)"
                class="detail-amt text-primary"
              >Details</a>
            </li>
            <li class="price-detail">
              <div class="detail-title">
                Delivery Charges
              </div>
              <div class="detail-amt discount-amt text-success">
                Free
              </div>
            </li>
          </ul>
          <hr>
          <ul class="list-unstyled">
            <li class="price-detail">
              <div class="detail-title detail-total">
                Total
              </div>
              <div class="detail-amt font-weight-bolder">
                $574
              </div>
            </li>
          </ul>
          <b-button
            variant="primary"
            block
            @click="$emit('next-step')"
          >
            Place Order
          </b-button>
        </div>

      </b-card>
    </div>
  </div>
</template>

<script>
import {
  BButton, BCard,
} from 'bootstrap-vue'
import VueTypeaheadBootstrap from 'vue-typeahead-bootstrap'
import { mapActions } from 'vuex'
import { debounce } from 'lodash'
import ECommerceCheckoutStepCartProducts from './ECommerceCheckoutStepCartProducts.vue'

export default {
  components: {
    // BSV
    BButton,
    BCard,
    VueTypeaheadBootstrap,

    // SFC
    ECommerceCheckoutStepCartProducts,
  },
  data() {
    return {
      query: '',
      selectedProduct: null,
      storeProducts: [],
    }
  },
  methods: {
    ...mapActions('storeProducts', ['getStoreProductsStore']),
    lookupStoreProducts: debounce(function searchQuery(query) {
      if (/^\d*$/.test(query) && query != null && query !== '') {
        this.getStoreProductsStore({
          by_store: this.$route.params.store_id,
          by_sku: query,
        }).then(response => {
          console.log('Hola', response)
          this.storeProducts = response
          // this.addProductToCart(response)
          this.searchQuery = null
          console.log(this.storeProducts)
        })
      } else if (query != null && query !== '') {
        this.getStoreProductsStore({
          by_store: this.$route.params.store_id,
          by_name: query,
        }).then(response => {
          console.log('Hola', response)
          this.storeProducts = response.data
          // this.addProductToCart(response)
          this.searchQuery = null
          console.log(this.storeProducts)
        })
      }
    }, 500),
  },
}
</script>
