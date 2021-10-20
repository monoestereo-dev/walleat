<template>
  <div class="list-view product-checkout mt-0">
    <div>
      <b-row>
        <b-col
          order="2"
          order-sm="1"
        >
          <!-- Buscador 🔍-->
          <checkout-step-cart-products
            :barcode-scanned="barcode"
            class="z-index-top"
            @toggle="toggleCameraScanner($event)"
          />
          <!-- carrito 🛒 -->
          <checkout-cart-products v-if="!settings.showCategories" />
        </b-col>
        <b-col
          v-if="isCameraScannerActive"
          sm="12"
          md="auto"
          order="1"
          order-sm="2"
        >
          <!-- Camera Barcode Scanner 🎥 -->
          <div class="d-flex justify-content-center mb-1">
            <stream-barcode-reader
              class="barcodeReader"
              @decode="onDecode"
            />
          </div>
        </b-col>
      </b-row>

    </div>

    <div class="checkout-options">

      <!-- Detalles de la compra 🛍️ -->
      <b-card
        class="sticky-top sticky-offset border-primary"
      >
        <b-card-header class="p-0">
          <h4>
            Detalles de la compra
          </h4>
        </b-card-header>
        <div class="price-details mt-1">
          <ul class="list-unstyled text-small">
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
                ${{ cartTotal | money }} MXN
              </div>
            </li>
          </ul>
          <b-row>
            <b-col
              cols="auto"
            >
              <b-button
                variant="outline-secondary"
                block
                :disabled="cart.length === 0"
                @click="emptyCart()"
              >
                <feather-icon icon="TrashIcon" />
              </b-button>
            </b-col>
            <b-col>
              <b-button
                variant="primary"
                block
                :disabled="cart.length === 0"
                @click="$emit('next-step')"
              >
                Continuar
                <feather-icon icon="ChevronsRightIcon" />
              </b-button>
            </b-col>
          </b-row>
        </div>

      </b-card>
      <div
        v-if="settings.showCategories"
        class="checkout-items"
      >
        <checkout-cart-products
          v-for="product in cart"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import {
  BButton,
  BCard,
  BRow,
  BCol,
  BCardHeader,
  // BFormInput,
} from 'bootstrap-vue'
import { StreamBarcodeReader } from 'vue-barcode-reader'
import CheckoutStepCartProducts from './ECommerceCheckoutStepCartProducts.vue'
import CheckoutCartProducts from './PosCartProducts.vue'

export default {
  components: {
    // BSV
    BButton,
    BCard,
    BRow,
    BCol,
    BCardHeader,
    // BFormInput,

    // SFC
    CheckoutStepCartProducts,
    CheckoutCartProducts,
    StreamBarcodeReader,
  },
  data() {
    return {
      query: '',
      selectedProduct: null,
      barcode: null,
      isCameraScannerActive: false,
    }
  },
  computed: {
    ...mapGetters('pos', [
      'cartTotal',
      'cartTotalProducts',
      'cart',
      'settings',
    ]),
  },
  mounted() {
    this.UPDATE_VERTICAL_MENU_COLLAPSED(true)
  },
  methods: {
    ...mapMutations('verticalMenu', [
      'UPDATE_VERTICAL_MENU_COLLAPSED',
    ]),
    ...mapMutations('pos', [
      'emptyCart',
    ]),
    playSound() {
      /* eslint-disable-next-line */
      const audio = new Audio(require('@/assets/sounds/Beep.wav'))
      audio.play()
    },
    onDecode(code) {
      this.playSound()
      this.barcode = code
    },
    toggleCameraScanner(val) {
      this.isCameraScannerActive = val
    },
  },
}
</script>
<style lang="scss" scoped>
.barcodeReader{
  max-width: 200px;
  overflow: hidden;
  border-radius: 8px;
}
.sticky-offset {
    top: 95px;
    z-index: 9;
}
.text-small {
  font-size: 11px;
  li {
    margin: 0px;
  }
}
</style>
