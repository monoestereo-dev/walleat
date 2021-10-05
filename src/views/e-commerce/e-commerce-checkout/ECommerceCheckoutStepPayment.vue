<template>
  <div>
    <div class="list-view product-checkout mt-0">
      <!-- Left Card -->
      <div class="hide-print">
        <div
          v-if="paymentMethod === 'cash'"
          class="mb-1"
        >
          <b-input-group>
            <b-input-group-prepend is-text>
              $
            </b-input-group-prepend>
            <b-form-input
              v-model="cash"
              type="number"
              min="0.00"
              class="form-control"
              placeholder="Recibir efectivo"
              size="lg"
            />
            <b-input-group-append
              v-if="cash > 0"
              is-text
              @click="cash = null"
            >
              <feather-icon
                icon="XIcon"
              />
            </b-input-group-append>
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
              <b-form-radio
                v-model="paymentMethod"
                name="payment-method"
                value="cash"
                class="mt-1"
              >
                Tarjeta bancaria
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
                v-if="isDeviceAndroid"
                v-model="paymentMethod"
                name="payment-method"
                class="mt-1"
                value="chromeNFC"
              >
                Android NFC
              </b-form-radio>
              <b-form-radio
                v-if="isDeviceAndroid"
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
      <div class="amount-payable checkout-options hide-print">
        <b-card
          title="Detalles de la compra"
          class="border-primary"
        >
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
            <android-nfc-chrome
              v-if="paymentMethod === 'chromeNFC'"
              @prev-step="prevStep()"
            />
            <nfc-android-app
              v-if="paymentMethod === 'androidAppNfc'"
              @prev-step="prevStep()"
            />
          </div>

        </b-card>
      </div>
    </div>

    <!-- TICKET ✌️🐔 -->
    <div class="ticket checkout-options pb-5">
      <div class="d-flex justify-content-center p-1">
        <b-img
          :src="require('@/assets/images/logo/walleat_logo.svg')"
          alt="Medal Pic"
          width="100"
        />
      </div>
      <div class="text-center font-weight-bolder pb-1 h6 text-black">
        {{ cart[0].store_attributes.name }}
      </div>
      <div class="price-details">
        <ul class="list-unstyled border-bottom">
          <li class="mb-1 price-detail">
            <div class="detail-title">
              Fecha:
            </div>
            <div class="detail-amt">
              {{ Date.now() | dateNtime }}
            </div>
          </li>
        </ul>
      </div>
      <div class="price-details">
        <ul class="list-unstyled border-bottom">
          <li
            v-for="product in cart"
            :key="`product-ticket-${product.id}`"
            class="mb-1 price-detail"
          >
            <div class="detail-title">
              {{ product.units }} x {{ product.product_attributes.name }}
            </div>
            <div class="detail-amt">
              ${{ product.unit_cost * product.units | money }}
            </div>
          </li>
        </ul>
        <ul class="list-unstyled">
          <li class="price-detail">
            <div class="detail-title">
              Productos
            </div>
            <div class="detail-amt discount-amt">
              {{ cartTotalProducts }}
            </div>
          </li>
          <li class="price-detail">
            <div class="detail-title">
              Subtotal
            </div>
            <div class="detail-amt">
              ${{ (cartTotal - cartTotal * 0.16) | money }}
            </div>
          </li>
          <li class="price-detail">
            <div class="detail-title">
              IVA
            </div>
            <div class="detail-amt">
              ${{ (cartTotal * 0.16) | money }}
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
        <div class="text-center text-black h6 pb-1">
          Gracias ✌️
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { VMoney } from 'v-money'
// import Cleave from 'vue-cleave-component'
import {
  BCard,
  BCardHeader,
  BCardTitle,
  BCardBody,
  BFormGroup,
  BFormRadio,
  BFormInput,
  BInputGroupPrepend,
  BInputGroupAppend,
  BInputGroup,
  BImg,

  // BCardText
  BButton,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import AndroidNfcChrome from './AndroidNfcChrome.vue'
import NfcAndroidApp from './NfcAndroidApp.vue'

export default {
  components: {
    // BSV
    BCard,
    BCardHeader,
    BCardTitle,
    // BCardText,
    BCardBody,
    BImg,
    BFormGroup,
    BFormRadio,
    BButton,
    BFormInput,
    BInputGroupPrepend,
    BInputGroupAppend,
    BInputGroup,

    AndroidNfcChrome,
    NfcAndroidApp,
  },
  directives: { money: VMoney },
  props: {
    // paymentDetails: {
    //   type: Object,
    //   required: true,
    // },
  },
  data() {
    return {
      paymentMethod: 'cash',
      cash: null,
      isDeviceAndroid: false,
      money: {
        decimal: ',',
        thousands: '.',
        prefix: '$ ',
        suffix: ' MXN',
        precision: 0,
      },
    }
  },
  computed: {
    ...mapGetters('pos', [
      'cartTotal',
      'cartTotalProducts',
      'cart',
    ]),
  },
  mounted() {
    const ua = navigator.userAgent.toLowerCase()
    const isAndroid = ua.indexOf('android') > -1
    // && ua.indexOf('mobile')
    if (isAndroid) {
      this.isDeviceAndroid = true
    }
  },
  methods: {
    ...mapActions('orders', [
      'addOrder',
    ]),
    ...mapActions('pos', [
      'emptyCart',
    ]),
    prevStep() {
      this.$emit('prev-step')
    },
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
          window.print()
          this.bracelet_id = null
          // eslint-disable-next-line
          const audio = new Audio(require('@/assets/sounds/Success.wav'))
          audio.play()
          this.$swal({
            title: 'Cobro exitoso!',
            text: 'Grácias.',
            icon: 'success',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
          this.cash = null
          this.emptyCart()
          this.prevStep()
        }).catch(error => {
          this.bannedItems = error.response.data.banned_items
          if (error.response.data.messages[0]) {
            this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                title: 'Error',
                icon: 'CoffeeIcon',
                variant: 'danger',
                text: error.response.data.messages[0],
              },
            })
          }
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

<style lang="scss">
.ticket {
  display: none;
}

@media print {
  .ticket {
    display: block;
    color: black;
    font-size: 10px;

    .h4, .h6 {
      color: black;
    }

  }
  .hide-print {
    display: none !important;
  }
  body {
    background-color: transparent !important;
    min-width: 100% !important;
  }
  .main-menu,
  .footer,
  .header-navbar-shadow,
  .wizard-nav,
  nav.header-navbar {
    display: none !important;
  }
  #app > div > div.app-content.content.ecommerce-application,
  body .app-content {
    margin: 0 !important;
    padding: 0 !important;
  }
}
</style>
