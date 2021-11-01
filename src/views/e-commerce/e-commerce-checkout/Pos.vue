<template>
  <div>
    <form-wizard
      ref="refFormWizard"
      color="#7367F0"
      :title="null"
      :subtitle="null"
      finish-button-text="Submit"
      back-button-text="Previous"
      hide-buttons
      class="checkout-form-wizard steps-transparent"
    >
      <!-- Order -->
      <tab-content
        title="Carrito"
        icon="feather icon-shopping-cart"
      >
        <checkout-step-cart @next-step="formWizardNextStep" />
      </tab-content>

      <!-- Payment -->
      <tab-content
        title="Cobro"
        icon="feather icon-credit-card"
      >
        <checkout-step-payment
          @next-step="formWizardNextStep"
          @prev-step="formWizardPrevStep"
        />
      </tab-content>
    </form-wizard>
  </div>
</template>

<script>
import {
// BButton,
} from 'bootstrap-vue'
import { FormWizard, TabContent } from 'vue-form-wizard'
import { ref } from '@vue/composition-api'
import { mapMutations, mapActions } from 'vuex'
import CheckoutStepPayment from './PosPayment.vue'
import CheckoutStepCart from './PosCart.vue'

export default {
  components: {
    // BOOTSTRAP
    // BButton,

    // 3rd Party
    FormWizard,
    TabContent,

    // SFC
    CheckoutStepCart,
    CheckoutStepPayment,
  },
  setup() {
    const refFormWizard = ref(null)
    const formWizardNextStep = () => {
      refFormWizard.value.nextTab()
    }
    const formWizardPrevStep = () => {
      refFormWizard.value.prevTab()
    }

    return {
      refFormWizard,
      formWizardNextStep,
      formWizardPrevStep,

    }
  },
  destroyed() {
    this.emptyCart()
  },
  mounted() {

  },
  methods: {
    ...mapActions('weight', ['startSerial']),
    onDecode() {
      // this.lookupStoreProducts(result)
    },
    onLoaded() {

    },
    ...mapMutations('pos', [
      'emptyCart',
    ]),
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-wizard.scss';
@import '~@core/scss/base/pages/app-ecommerce.scss';
@import '~vue-form-wizard/dist/vue-form-wizard.min.css';
</style>

<style lang="scss" scoped>
.checkout-form-wizard ::v-deep {
  .wizard-tab-content {
    box-shadow: none !important;
    background: transparent !important;
    padding: 0;
  }
}
</style>
