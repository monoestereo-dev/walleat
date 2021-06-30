<template>
  <div>
    <form-wizard
      color="#7367F0"
      :title="null"
      :subtitle="null"
      layout="horizontal"
      finish-button-text="Confirmar"
      next-button-text="Siguiente"
      back-button-text="Regresar"
      class="wizard-vertical mb-3"
      shape="square"
      step-size="sm"
      @on-complete="formSubmitted"
    >

      <!-- Cantidad -->
      <tab-content title="Cantidad">
        <b-row>
          <b-col
            cols="12"
            class="mb-2"
          >
            <h5 class="mb-0">
              ¿Cuantos creditos quieres agregar?
            </h5>
            <small class="text-muted">
              El minimo es $25.
            </small>
          </b-col>
          <b-col>
            <b-form-group
              label-for="v-ammount"
            >
              <b-input-group
                prepend="$"
                class="input-group-merge"
              >
                <b-form-input
                  id="v-ammount"
                  v-model="credits"
                  placeholder="25"
                  size="lg"
                  type="number"
                />
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
      </tab-content>

      <!-- personal info tab -->
      <tab-content title="Metodo de pago">
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
              Numero de teléfono
            </h5>
            <small class="text-muted">Agrega tu numero de telefono para confirmar la operación.</small>
          </b-col>
          <b-col>
            <b-form-group
              label-for="v-cel_number"
            >
              <b-form-input
                id="v-cel_number"
                v-model="payment.cel_number"
                placeholder=""
                size="lg"
                type="number"
              />
            </b-form-group>
          </b-col>
        </b-row>
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
                    Creditos:
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

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { FormWizard, TabContent } from 'vue-form-wizard'
import '@/@core/scss/vue/libs/vue-wizard.scss'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import {
  BRow,
  BCol,
  BImg,
  BFormGroup,
  BFormInput,
  BInputGroup,
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
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      credits: 25.00,
      payment: {
        cel_number: null,
      },
    }
  },
  methods: {
    ...mapActions('walleats', ['addCredit']),
    formSubmitted() {
      const userData = JSON.parse(localStorage.getItem('userData'))
      this.addCredit({
        ...this.payment,
        amount: Number(this.credits) + Number(this.fee(this.credits)),
        customer_id: userData.customer.id,
        referenciaNumerica: 0,
      })
        .then(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Form Submitted',
              icon: 'EditIcon',
              variant: 'success',
            },
          })
          this.$swal({
            title: 'Good job!',
            text: 'You clicked the button!',
            icon: 'success',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        })
    },
    fee(amount) {
      const min = 2
      const max = 20
      return Math.min(Math.max(min, 0.01 * amount), max)
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
