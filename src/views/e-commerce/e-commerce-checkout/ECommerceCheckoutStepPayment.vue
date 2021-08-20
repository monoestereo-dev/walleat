<template>
  <div class="list-view product-checkout mt-0">
    <!-- Left Card -->
    <div>
      <div
        v-if="paymentMethod === 'cash'"
        class="mb-1"
      >
        <b-input-group class="input-group-merge">
          <b-input-group-prepend is-text>
            $
          </b-input-group-prepend>
          <cleave
            id="number"
            v-model="cash"
            class="form-control search-product"
            :raw="true"
            :options="options.number"
            placeholder="Recibir efectivo"
          />
        </b-input-group>
      </div>
      <b-card no-body>
        <b-card-header class="flex-column align-items-start">
          <b-card-title>Opciones de pago</b-card-title>
        </b-card-header>
        <b-card-body>
          <!-- Radios -->
          <b-form-group>
            <b-form-radio
              v-model="paymentMethod"
              name="payment-method"
              value="cash"
            >
              Efectivo
            </b-form-radio>
            <!-- <b-form-radio
              v-model="paymentMethod"
              name="payment-method"
              class="mt-1"
              value="debit-atm-credit-card"
            >
              Credit / Debit / ATM Card
            </b-form-radio> -->
            <b-form-radio
              v-model="paymentMethod"
              name="payment-method"
              class="mt-1"
              value="chromeNFC"
            >
              Android NFC
            </b-form-radio>
            <b-form-radio
              v-model="paymentMethod"
              name="payment-method"
              class="mt-1"
              value="androidAppNfc"
            >
              Android APP Reader
            </b-form-radio>
          </b-form-group>
        </b-card-body>
      </b-card>
    </div>

    <!-- Right Card -->
    <div class="amount-payable checkout-options">
      <b-card title="Detalles de la compra">
        <div class="price-details">
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
                ${{ cartTotal | money }} MXN
              </div>
            </li>
            <li
              v-if="paymentMethod === 'cash' && cash >= cartTotal"
              class="price-detail"
            >
              <div class="detail-title detail-total">
                Cambio
              </div>
              <div
                class="detail-amt font-weight-bolder"
                :class="[cash - cartTotal > 1 ? 'text-primary' : 'text-danger']"
              >
                ${{ cash - cartTotal| money }} MXN
              </div>
            </li>
          </ul>
          <b-button
            v-if="paymentMethod === 'cash'"
            :variant="cash < cartTotal ? 'warning' : 'success'"
            block
            :disabled="cash < cartTotal"
            @click="completeSale()"
          >
            Continuar
          </b-button>
          <android-nfc-chrome v-if="paymentMethod === 'chromeNFC'" />
          <b-button
            v-if="paymentMethod === 'androidAppNfc'"
            block
            href="intent://scan/aHR0cHM6Ly9pY2VkZXYucGwvbmZjY2I=/#Intent;scheme=extnfc;package=pl.icedev.nfc.external;end"
            variant="primary"
            class="text-center"
          >
            Continuar
          </b-button>
        </div>

      </b-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Cleave from 'vue-cleave-component'
import {
  BCard,
  BCardHeader,
  BCardTitle,
  BCardBody,
  BFormGroup,
  BFormRadio,
  // BCardText
  BInputGroup,
  BInputGroupPrepend,
  BButton,
} from 'bootstrap-vue'
import AndroidNfcChrome from './AndroidNfcChrome.vue'

export default {
  components: {
    // BSV
    BCard,
    BCardHeader,
    BCardTitle,
    // BCardText,
    BCardBody,
    BFormGroup,
    BFormRadio,
    BInputGroup,
    BInputGroupPrepend,
    BButton,
    Cleave,

    AndroidNfcChrome,
  },
  props: {
    paymentDetails: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      paymentMethod: 'cash',
      cash: null,
      options: {
        number: {
          numeral: true,
          numeralThousandsGroupStyle: 'thousand',
        },
      },
    }
  },
  computed: {
    ...mapGetters('pos', [
      'cartTotal',
      'cart',
    ]),
  },
  methods: {
    ...mapActions('orders', [
      'addOrder',
    ]),
    completeSale() {
      const tempCart = []
      this.cart.forEach(product => {
        const refactorProduct = {
          store_product_id: product.id,
          units: product.units,
        }
        tempCart.push(refactorProduct)
      })
      const orderReady = {
        store_id: this.$route.params.store_id,
        payment_type: this.paymentMethod === 'cash' ? 'cash' : 'credit',
        order_store_products_attributes: tempCart,
      }
      this.addOrder({ order: orderReady, orderType: 'sell' })
        .then(() => {
          this.bracelet_id = null
        }).catch(error => {
          this.bannedItems = error.response.data.banned_items
        })
    },
  },
}
</script>

<style lang="scss" scoped>
#cvv {
  width: auto;
}
</style>
