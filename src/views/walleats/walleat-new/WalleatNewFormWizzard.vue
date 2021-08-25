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

      <!-- general info tab -->
      <tab-content
        title="Informacion general"
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
              <base-cropper
                :model="walleat"
                @cropped-image="walleat.logo"
              />
            </b-col>
            <b-col
              cols="12"
              class="mb-2"
            >
              <h5 class="mb-0">
                Nombre del Walleat
              </h5>
              <small class="text-muted">
                Nombre para identificar tu Walleat
              </small>
            </b-col>
            <b-col>
              <b-form-group
                label-for="name"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Nombre"
                  rules="required"
                >
                  <b-form-input
                    id="name"
                    v-model="walleat.name"
                    :state="errors.length > 0 ? false:null"
                    placeholder=""
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>
        </validation-observer>
      </tab-content>

      <!-- daily limit tab -->
      <tab-content
        title="Configuración"
        :before-change="validationFormInfo"
      >
        <validation-observer
          ref="infoRules"
          tag="form"
        >
          <b-row>
            <b-col
              cols="12"
              class="mb-2"
            >
              <h5 class="mb-0">
                Configuración General
              </h5>
              <small class="text-muted">Ingresa el monto máximo de gasto diario y selecciona donde utilizar tu Walleat</small>
            </b-col>
            <b-col md="6">
              <b-form-group
                label="Límite de gasto diario"
                label-for="first-name"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Limite de gasto diario"
                  rules="required"
                >
                  <b-form-input
                    id="first-name"
                    v-model="walleat.daily_limit"
                    placeholder="300"
                    :state="errors.length > 0 ? false:null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group
                label="Establecimiento"
                label-for="last-name"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Establecimiento"
                  rules="required"
                >
                  <v-select
                    v-model="walleat.establishment_id"
                    :options="establishments"
                    :reduce="val => val.id"
                    label="name"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>
        </validation-observer>
      </tab-content>

      <!-- Walleat id  -->
      <tab-content
        v-if="!$route.query.enc"
        title="Vincular Walleat"
        :before-change="validationFormAddress"
      >
        <validation-observer
          ref="addressRules"
          tag="form"
        >
          <b-row>
            <b-col
              cols="12"
              class="mb-2"
            >
              <h5 class="mb-0">
                Vincula tu Walleat
              </h5>
              <small class="text-muted">Ingresa el número que se te proporcionó junto con tu Walleat</small>
            </b-col>
            <b-col>
              <b-form-group
                label="Walleat ID"
                label-for="address"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Walleat ID"
                  rules="required"
                >
                  <cleave
                    id="customDelimiter"
                    v-model="walleat.bracelet_number"
                    class="form-control"
                    :raw="false"
                    :options="walleatIdDelimiter"
                    placeholder="00:00:00:00:00:00"
                    :state="errors.length > 0 ? false:null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>
        </validation-observer>
      </tab-content>

    </form-wizard>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { FormWizard, TabContent } from 'vue-form-wizard'
import vSelect from 'vue-select'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import '@/@core/scss/vue/libs/vue-wizard.scss'
import BaseCropper from '@/@core/components/BaseCropper.vue'
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
} from 'bootstrap-vue'
import { required, email } from '@validations'
import Cleave from 'vue-cleave-component'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    FormWizard,
    TabContent,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    vSelect,
    Cleave,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
    BaseCropper,
  },
  data() {
    return {
      walleat: {
        name: '',
        establishment_id: '',
        daily_limit: '',
        bracelet_number: '',
        logo: null,
      },
      establishments: [],
      required,
      email,
      walleatIdDelimiter: {
        delimiters: [':', ':', ':', ':', ':', ':', ':', ':'],
        blocks: [2, 2, 2, 2, 2, 2, 2, 2, 2],
        uppercase: true,
      },

    }
  },
  beforeMount() {
    this.fetchEstablishments({
      meta: {
        pagination: {
          per_page: 1000,
        },
      },
    })
      .then(response => {
        this.establishments = response.data
      })
  },
  methods: {
    ...mapActions('walleats', ['addWalleat']),
    ...mapActions('establishments', ['fetchEstablishments']),
    formSubmitted() {
      const userData = JSON.parse(localStorage.getItem('userData'))
      let walleat = {}
      if (this.$route.query.enc) {
        walleat = {
          ...this.walleat,
          bracelet_number: this.$route.query.enc,
        }
      } else {
        walleat = {
          ...this.walleat,
        }
      }

      this.addWalleat({
        ...walleat,
        customer_id: userData.customer.id,
      })
        .then(() => {
          this.$swal({
            title: '¡Oh Yeah!',
            text: 'Walleat vinculado!',
            icon: 'success',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
          this.$router.push({ name: 'walleats-list' })
        })
        .catch(error => {
          // Prepare error messages to print
          const errors = []
          Object.keys(error.response.data.messages).forEach(x => {
            error.response.data.messages[x].forEach(y => {
              errors.push(y)
            })
          })
          this.$swal({
            title: '¡ERROR!',
            text: errors,
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        })
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
    validationFormInfo() {
      return new Promise((resolve, reject) => {
        this.$refs.infoRules.validate().then(success => {
          if (success) {
            resolve(true)
          } else {
            reject()
          }
        })
      })
    },
    validationFormAddress() {
      return new Promise((resolve, reject) => {
        this.$refs.addressRules.validate().then(success => {
          if (success) {
            resolve(true)
          } else {
            reject()
          }
        })
      })
    },
    validationFormSocial() {
      return new Promise((resolve, reject) => {
        this.$refs.socialRules.validate().then(success => {
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
@import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
