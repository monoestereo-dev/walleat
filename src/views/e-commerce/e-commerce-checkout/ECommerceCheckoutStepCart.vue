<template>
  <div class="list-view product-checkout mt-0">
    <!-- Products List -->
    <e-commerce-checkout-step-cart-products />

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
                Subtotal
              </div>
              <div class="detail-amt">
                $598
              </div>
            </li>
            <li class="price-detail">
              <div class="detail-title">
                IVA
              </div>
              <div class="detail-amt">
                $1.3
              </div>
            </li>

            <!-- <li class="price-detail">
              <div class="detail-title">
                Delivery Charges
              </div>
              <div class="detail-amt discount-amt text-success">
                Free
              </div>
            </li> -->
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
            Continuar
          </b-button>
        </div>

      </b-card>
    </div>
  </div>
</template>

<script>
import {
  BButton,
  BCard,
  // BFormInput,
} from 'bootstrap-vue'
import ECommerceCheckoutStepCartProducts from './ECommerceCheckoutStepCartProducts.vue'

export default {
  components: {
    // BSV
    BButton,
    BCard,
    // BFormInput,

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
}
</script>
