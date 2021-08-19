<template>
  <div class="list-view product-checkout mt-0">
    <!-- Products List -->
    <div>
      <e-commerce-checkout-step-cart-products />
      <e-commerce-checkout-cart-products />
    </div>

    <!-- Checkout Options -->
    <div class="checkout-options">
      <b-card>
        <div class="price-details">
          <h6 class="price-title">
            Detalles de la compra
          </h6>
          <ul class="list-unstyled">
            <li class="price-detail">
              <div class="detail-title">
                Productos
              </div>
              <div class="detail-amt discount-amt text-success">
                {{ cart.length }}
              </div>
            </li>
            <li class="price-detail">
              <div class="detail-title">
                Subtotal
              </div>
              <div class="detail-amt">
                ${{ (cartTotal - cartTotal * 0.16) | money }} MXN
              </div>
            </li>
            <li class="price-detail">
              <div class="detail-title">
                IVA
              </div>
              <div class="detail-amt">
                ${{ (cartTotal * 0.16) | money }} MXN
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
                ${{ cartTotal | money }}
              </div>
            </li>
          </ul>
          <b-button
            variant="primary"
            block
            @click="$emit('next-step')"
          >
            Continuar
          </b-button>
        </div>

      </b-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  BButton,
  BCard,
  // BFormInput,
} from 'bootstrap-vue'
import ECommerceCheckoutStepCartProducts from './ECommerceCheckoutStepCartProducts.vue'
import ECommerceCheckoutCartProducts from './ECommerceCheckoutCartProducts.vue'

export default {
  components: {
    // BSV
    BButton,
    BCard,
    // BFormInput,

    // SFC
    ECommerceCheckoutStepCartProducts,
    ECommerceCheckoutCartProducts,
  },
  data() {
    return {
      query: '',
      selectedProduct: null,
    }
  },
  computed: {
    ...mapGetters('pos', [
      'cartTotal',
      'cart',
    ]),
  },
}
</script>
