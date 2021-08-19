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
            name="payment-method"
            value="cod"
          >
            Efectivo
          </b-form-radio>
          <b-form-radio
            name="payment-method"
            class="mt-1"
            value="debit-atm-credit-card"
          >
            Credit / Debit / ATM Card
          </b-form-radio>
          <b-form-radio
            name="payment-method"
            class="mt-1"
            value="net-banking"
          >
            Android NFC
          </b-form-radio>
          <b-form-radio
            name="payment-method"
            class="mt-1"
            value="emi"
          >
            Android APP Reader
          </b-form-radio>
        </b-form-group>

        <hr class="my-2">

        <p class="cursor-pointer">
          <feather-icon
            icon="PlusCircleIcon"
            size="21"
            class="mr-75"
          />
          <span class="align-middle">Add Gift Card</span>
        </p>
      </b-card-body>
    </b-card>

    <!-- Right Card -->
    <div class="amount-payable checkout-options">
      <b-card title="Price Details">

        <ul class="list-unstyled price-details">
          <li class="price-detail">
            <div class="details-title">
              Price of 3 items
            </div>
            <div class="detail-amt">
              <strong>$699.30</strong>
            </div>
          </li>
          <li class="price-detail">
            <div class="details-title">
              Delivery Charges
            </div>
            <div class="detail-amt discount-amt text-success">
              Free
            </div>
          </li>
        </ul>
        <hr>
        <ul class="list-unstyled price-details">
          <li class="price-detail">
            <div class="details-title">
              Amount Payable
            </div>
            <div class="detail-amt font-weight-bolder">
              $699.30
            </div>
          </li>
        </ul>

      </b-card>
    </div>
  </div>
</template>

<script>
import {
  BCard, BCardHeader, BCardTitle, BCardBody, BFormGroup, BFormRadio,
  // BCardText
  // BFormInput,
  // BButton,
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
    // BFormInput,
    // BButton,
  },
  props: {
    paymentDetails: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
#cvv {
  width: auto;
}
</style>
