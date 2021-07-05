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

      <!-- account datails tab -->
      <tab-content title="Cantidad">
        <b-row>
          <b-col
            cols="12"
            class="mb-2"
          >
            <h5 class="mb-0">
              ¿Cuántos creditos quieres agregar?
            </h5>
            <small class="text-muted">
              El minimo es $25.
            </small>
          </b-col>
          <b-col>
            <b-form-group
              label-for="v-username"
            >
              <b-form-input
                id="v-username"
                placeholder="25"
                size="lg"
              />
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
              label-for="v-first-name"
            >
              <b-form-input
                id="v-first-name"
                placeholder=""
                size="lg"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </tab-content>

      <!-- address -->
      <tab-content title="Confirmar">
        <b-row>
          <b-col
            cols="12"
            class="mb-2"
          >
            <h5 class="mb-0">
              Address
            </h5>
            <small class="text-muted">Enter Your Address.</small>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="Address"
              label-for="v-address"
            >
              <b-form-input
                id="v-address"
                placeholder="98 Borough bridge Road, Birmingham"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="Landmark"
              label-for="v-landmark"
            >
              <b-form-input
                id="v-landmark"
                placeholder="Borough bridge"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="Pincode"
              label-for="v-pincode"
            >
              <b-form-input
                id="v-pincode"
                placeholder="658921"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="City"
              label-for="v-city"
            >
              <b-form-input
                id="v-city"
                placeholder="Birmingham"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </tab-content>

    </form-wizard>

  </div>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import '@/@core/scss/vue/libs/vue-wizard.scss'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import {
  BRow,
  BCol,
  BImg,
  BFormGroup,
  BFormInput,
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
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      selectedContry: 'select_value',
      selectedLanguage: 'nothing_selected',
      countryName: [
        { value: 'select_value', text: 'Select Value' },
        { value: 'Russia', text: 'Russia' },
        { value: 'Canada', text: 'Canada' },
        { value: 'China', text: 'China' },
        { value: 'United States', text: 'United States' },
        { value: 'Brazil', text: 'Brazil' },
        { value: 'Australia', text: 'Australia' },
        { value: 'India', text: 'India' },
      ],
      languageName: [
        { value: 'nothing_selected', text: 'Nothing Selected' },
        { value: 'English', text: 'English' },
        { value: 'Chinese', text: 'Mandarin Chinese' },
        { value: 'Hindi', text: 'Hindi' },
        { value: 'Spanish', text: 'Spanish' },
        { value: 'Arabic', text: 'Arabic' },
        { value: 'Malay', text: 'Malay' },
        { value: 'Russian', text: 'Russian' },
      ],
    }
  },
  methods: {
    formSubmitted() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Form Submitted',
          icon: 'EditIcon',
          variant: 'success',
        },
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
