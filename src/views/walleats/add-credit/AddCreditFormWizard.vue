<template>
  <b-overlay
    :show="loading"
    rounded="sm"
    variant="transparent"
  >
    <template #overlay>
      <div class="text-center">
        <b-spinner />
        <p class="mt-1">
          Procesando cobro
        </p>
      </div>
    </template>
    <form-wizard
      color="#7367F0"
      :title="null"
      :subtitle="null"
      layout="horizontal"
      :finish-button-text="loading ? 'Procesando...':'Confirmar'"
      next-button-text="Siguiente"
      back-button-text="Regresar"
      class="wizard-vertical mb-3"
      shape="square"
      step-size="sm"
      @on-complete="formSubmitted"
    >

      <!-- Cantidad -->
      <tab-content
        title="Cantidad"
        :before-change="validationForm"
      >
        <validation-observer
          ref="accountRules"
          tag="form"
        >
          <b-row>
            <b-col
              cols="12"
              class="mb-2"
            >
              <h5 class="mb-0">
                ¿Cuántos créditos quieres agregar?
              </h5>
              <small class="text-muted">
                La cantidad mínima es de $25
              </small>
            </b-col>
            <b-col>
              <b-form-group
                label-for="v-ammount"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Créditos"
                  rules="required"
                >
                  <b-input-group
                    class=""
                  >
                    <template #prepend>
                      <b-input-group-text
                        :state="errors.length > 0 ? false:null"
                      >
                        <strong :class="errors.length > 0 ? 'text-danger' : null">$</strong>
                      </b-input-group-text>
                    </template>
                    <b-form-input
                      id="v-ammount"
                      v-model="credits"
                      :state="errors.length > 0 ? false:null"
                      placeholder="25"
                      size="lg"
                      type="number"
                    />
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>
        </validation-observer>
      </tab-content>

      <!-- personal info tab -->
      <tab-content
        title="Método de pago"
        :before-change="validationCelForm"
      >
        <validation-observer
          ref="accountCelRules"
          tag="form"
        >
          <b-row>
            <b-col
              cols="12"
              class="mb-2"
            >
              <b-img
                :src="require('@/assets/images/logo/CODI.svg')"
                width="150"
              />
              <h5 class="mb-0">
                Número de teléfono
              </h5>
              <small class="text-muted">Agrega tu número de teléfono para confirmar la operación</small>
            </b-col>
            <b-col>
              <b-form-group
                label-for="v-cel_number"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Celular"
                  rules="required|digits:10"
                >
                  <b-form-input
                    id="v-cel_number"
                    v-model="payment.cel_number"
                    placeholder=""
                    size="lg"
                    type="number"
                    :state="errors.length > 0 ? false:null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>
        </validation-observer>
      </tab-content>

      <!-- address -->
      <tab-content title="Confirmar">
        <b-row>
          <b-col>
            <div class="mb-1">
              <p class="mb-0 text-muted">
                Total:
              </p>
              <h2 class="display-4">
                $ {{ Number(credits) + Number(fee(credits)) | money }}
              </h2>
            </div>
            <b-row>
              <b-col>
                <p class="d-flex flex-column">
                  <span class="text-muted">
                    Créditos:
                  </span>
                  ${{ credits | money }}
                </p>
              </b-col>
              <b-col>
                <p class="d-flex flex-column">
                  <span class="text-muted">
                    Comisión:
                  </span>
                  $ {{ fee(credits) | money }}
                </p>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </tab-content>

    </form-wizard>

  </b-overlay>
</template>

<script>
import { mapActions } from 'vuex'
import { FormWizard, TabContent } from 'vue-form-wizard'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required, email } from '@validations'
import '@/@core/scss/vue/libs/vue-wizard.scss'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import {
  BRow,
  BCol,
  BImg,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupText,
  BOverlay,
  BSpinner,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    FormWizard,
    TabContent,
    BRow,
    BCol,
    BImg,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupText,
    BOverlay,
    BSpinner,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      credits: 25.00,
      payment: {
        cel_number: null,
      },
      required,
      email,
      loading: false,
    }
  },
  methods: {
    ...mapActions('walleats', ['addCredit']),
    formSubmitted() {
      this.loading = true
      const userData = JSON.parse(localStorage.getItem('userData'))
      this.addCredit({
        ...this.payment,
        amount: Number(this.credits) + Number(this.fee(this.credits)),
        customer_id: userData.customer.id,
        referenciaNumerica: 0,
      })
        .then(() => {
          this.$swal({
            title: 'Cobro solicitado!',
            text: 'Autoriza el cobro en tu celular.',
            icon: 'success',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        })
        .catch(error => {
          this.$swal({
            title: 'Error!',
            text: error.response.data.messages.base[0],
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        })
        .then(() => {
          this.loading = false
        })
    },
    fee(amount) {
      const min = 2
      const max = 20
      return Math.min(Math.max(min, 0.01 * amount), max)
    },
    validationForm() {
      return new Promise((resolve, reject) => {
        this.$refs.accountRules.validate().then(success => {
          if (success) {
            resolve(true)
          } else {
            reject()
          }
        })
      })
    },
    validationCelForm() {
      return new Promise((resolve, reject) => {
        this.$refs.accountCelRules.validate().then(success => {
          if (success) {
            resolve(true)
          } else {
            reject()
          }
        })
      })
    },
  },
}
</script>
<style lang="scss">
.wizard-icon-container {
  border-radius: 6px !important;
  background: red;
}
</style>
