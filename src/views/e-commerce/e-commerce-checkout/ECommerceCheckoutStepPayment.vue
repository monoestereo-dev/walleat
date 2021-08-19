<template>
  <div class="list-view product-checkout mt-0">
    <!-- Left Card -->
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
            value="net-banking"
          >
            Android NFC
          </b-form-radio>
          <b-form-radio
            v-model="paymentMethod"
            name="payment-method"
            class="mt-1"
            value="emi"
          >
            Android APP Reader
          </b-form-radio>
        </b-form-group>

        <hr class="my-2">
        <div v-if="paymentMethod === 'cash'">
          <b-form-input
            v-model="cash"
            placeholder="Recibir efectivo"
          />
        </div>

      </b-card-body>
    </b-card>

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
            variant="success"
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
  BCard,
  BCardHeader,
  BCardTitle,
  BCardBody,
  BFormGroup,
  BFormRadio,
  // BCardText
  BFormInput,
  BButton,
} from 'bootstrap-vue'

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
    BFormInput,
    BButton,
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

<style lang="scss" scoped>
#cvv {
  width: auto;
}
</style>
