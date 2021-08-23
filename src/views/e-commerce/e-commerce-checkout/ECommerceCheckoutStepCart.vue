<template>
  <div class="list-view product-checkout mt-0">
    <div>
      <b-row>
        <b-col>
          <!-- Buscador 🔍-->
          <e-commerce-checkout-step-cart-products
            :barcode-scanned="barcode"
            @toggle="toggleCameraScanner($event)"
          />
          <!-- carrito 🛒 -->
          <e-commerce-checkout-cart-products v-if="!settings.showCategories" />
        </b-col>
        <b-col
          v-if="isCameraScannerActive"
          sm="12"
          md="auto"
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
      <e-commerce-checkout-cart-products v-if="settings.showCategories" />
      <!-- Detalles de la compra 🛍️ -->
      <b-card title="Detalles de la compra">
        <div class="price-details">
          <ul class="list-unstyled">
            <li class="price-detail">
              <div class="detail-title">
                Productos
              </div>
              <div class="detail-amt discount-amt text-success">
                {{ cartTotalProducts }}
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
                ${{ cartTotal | money }} MXN
              </div>
            </li>
          </ul>
          <b-button
            variant="primary"
            block
            :disabled="cart.length === 0"
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
import { mapGetters, mapMutations } from 'vuex'
import {
  BButton,
  BCard,
  BRow,
  BCol,
  // BFormInput,
} from 'bootstrap-vue'
import { StreamBarcodeReader } from 'vue-barcode-reader'
import ECommerceCheckoutStepCartProducts from './ECommerceCheckoutStepCartProducts.vue'
import ECommerceCheckoutCartProducts from './ECommerceCheckoutCartProducts.vue'

export default {
  components: {
    // BSV
    BButton,
    BCard,
    BRow,
    BCol,
    // BFormInput,

    // SFC
    ECommerceCheckoutStepCartProducts,
    ECommerceCheckoutCartProducts,
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
</style>
