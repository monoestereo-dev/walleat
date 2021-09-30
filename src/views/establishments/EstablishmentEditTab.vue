<template>
  <b-card>
    <b-form class="">

      <div class="d-flex">
        <feather-icon
          icon="ShoppingBagIcon"
          size="19"
        />
        <h4 class="mb-0 ml-50">
          Información del establecimiento
        </h4>
      </div>
      <b-row class="mt-1">
        <b-col cols="12">
          <div class="d-flex mb-1">
            <base-cropper
              :model="establishment"
              @cropped-image="establishment.logo"
            />
          </div>
        </b-col>
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Nombre"
            label-for="birth-date"
          >
            <flat-pickr
              v-model="establishment.name"
              class="form-control"
              placeholder=""
            />
          </b-form-group>
        </b-col>
      </b-row>

      <!-- Header: Personal Info -->
      <div class="d-flex mt-2">
        <feather-icon
          icon="UserIcon"
          size="19"
        />
        <h4 class="mb-0 ml-50">
          Información de contacto
        </h4>
      </div>

      <!-- Form: Personal Info Form -->
      <b-row class="mt-1">

        <!-- Field: Birth Date -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Nombre"
            label-for="birth-date"
          >
            <flat-pickr
              v-model="establishment.contact_name"
              class="form-control"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Mobile -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Teléfono"
            label-for="mobile"
          >
            <b-form-input
              id="mobile"
              v-model="establishment.contact_phone"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Website -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Email"
            label-for="website"
          >
            <b-form-input
              id="website"
              v-model="establishment.contact_email"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <!-- Header: Personal Info -->
      <div class="d-flex mt-2">
        <feather-icon
          icon="MapPinIcon"
          size="19"
        />
        <h4 class="mb-0 ml-50">
          Dirección
        </h4>
      </div>

      <!-- Form: Personal Info Form -->
      <b-row class="mt-1">

        <!-- Field: Address Line 1 -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Address Line 1"
            label-for="address-line-1"
          >
            <b-form-input
              id="address-line-1"
              v-model="userDataInfo.addressLine1"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Address Line 2 -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Address Line 2"
            label-for="address-line-2"
          >
            <b-form-input
              id="address-line-2"
              v-model="userDataInfo.addressLine2"
              placeholder="Los Santos"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Postcode -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Postcode"
            label-for="postcode"
          >
            <b-form-input
              id="postcode"
              v-model="userDataInfo.postcode"
              type="number"
              placeholder="597626"
            />
          </b-form-group>
        </b-col>

        <!-- Field: City -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="City"
            label-for="city"
          >
            <b-form-input
              id="city"
              v-model="userDataInfo.city"
            />
          </b-form-group>
        </b-col>

        <!-- Field: State -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="State"
            label-for="state"
          >
            <b-form-input
              id="state"
              v-model="userDataInfo.state"
              placeholder="Manhattan"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Country -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Country"
            label-for="country"
          >
            <b-form-input
              id="country"
              v-model="userDataInfo.country"
              placeholder="United States"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row class="mt-2">
        <b-col>
          <b-button
            variant="primary"
            class="mb-1 mb-sm-0 mr-0 mr-sm-1"
            :block="$store.getters['app/currentBreakPoint'] === 'xs'"
          >
            Save Changes
          </b-button>
          <b-button
            variant="outline-secondary"
            :block="$store.getters['app/currentBreakPoint'] === 'xs'"
          >
            Reset
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-card>
</template>

<script>
import {
  BRow, BCol, BForm, BFormGroup, BFormInput, BButton, BCard,
} from 'bootstrap-vue'
import BaseCropper from '@/@core/components/BaseCropper.vue'
import flatPickr from 'vue-flatpickr-component'
import { ref } from '@vue/composition-api'

export default {
  components: {
    BRow, BCol, BForm, BFormGroup, flatPickr, BFormInput, BButton, BCard, BaseCropper,
  },
  setup() {
    const userDataInfo = ref({
      dob: null,
      mobile: '+6595895857',
      website: 'https://rowboat.com/insititious/Angelo',
      language: 'French',
      gender: 'female',
      contactOptions: ['Email', 'Message'],
      addressLine1: 'A-65, Belvedere Streets',
      addressLine2: '',
      postcode: '',
      city: 'New York',
      state: '',
      country: '',
    })

    const languageOptions = [
      'English',
      'Spanish',
      'French',
      'Russian',
      'German',
      'Arabic',
      'Sanskrit',
    ]

    const genderOptions = [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' },
    ]

    const contactOptionsOptions = ['Email', 'Message', 'Phone']

    return {
      userDataInfo,
      languageOptions,
      genderOptions,
      contactOptionsOptions,
    }
  },
  data() {
    return {
      establishment: {
        logo: null,
      },
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
