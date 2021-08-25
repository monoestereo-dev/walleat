<template>
  <b-card>

    <!-- media -->
    <b-media no-body>
      <b-media-aside>
        <base-cropper
          :model="optionsLocal"
          @cropped-image="optionsLocal.logo"
        />
        <!--/ avatar -->
      </b-media-aside>

    </b-media>
    <!--/ media -->

    <!-- form -->
    <validation-observer
      ref="accountRules"
      v-slot="{ invalid }"
    >
      <b-form
        class="mt-2"
        @submit.prevent="handleSubmit()"
      >
        <b-row>
          <b-col sm="6">
            <b-form-group
              label="Username"
              label-for="account-username"
            >
              <validation-provider
                #default="{ errors }"
                name="Nombre"
                rules="required"
              >
                <b-form-input
                  v-model="optionsLocal.name"
                  :state="errors.length > 0 ? false:null"
                  placeholder="Username"
                  name="username"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group
              label="E-mail"
              label-for="account-e-mail"
            >
              <validation-provider
                #default="{ errors }"
                name="Email"
                rules="required|email"
              >
                <b-form-input
                  v-model="optionsLocal.email"
                  :state="errors.length > 0 ? false:null"
                  name="Email"
                  placeholder="Email"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col
            v-if="optionsLocal.customer"
            sm="6"
          >
            <b-form-group
              label="Celular"
              label-for="cel"
            >
              <b-form-input
                v-model="optionsLocal.customer.cel_number"
                name="cel"
                placeholder=""
              />

            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="mt-2 mr-1"
              type="submit"
              :disabled="invalid"
            >
              Save changes
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              variant="outline-secondary"
              type="reset"
              class="mt-2"
              @click.prevent="resetForm"
            >
              Reset
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
  </b-card>
</template>

<script>
import {
  // BFormFile,
  BButton,
  BForm,
  BFormGroup,
  BFormInput,
  BRow,
  BCol,
  BCard,
  // BCardText,
  BMedia,
  BMediaAside,
  // BMediaBody,
  // BLink,
  // BImg,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ref } from '@vue/composition-api'
import { mapActions, mapMutations } from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required, email } from '@validations'
import BaseCropper from '@/@core/components/BaseCropper.vue'

export default {
  components: {
    BButton,
    BForm,
    // BImg,
    // BFormFile,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BCard,
    // BCardText,
    BMedia,
    BMediaAside,
    // BMediaBody,
    // BLink,
    ValidationProvider,
    ValidationObserver,
    BaseCropper,
  },
  directives: {
    Ripple,
  },
  props: {
    generalData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      optionsLocal: JSON.parse(JSON.stringify(this.generalData)),
      profileFile: null,
      required,
      email,
    }
  },
  methods: {
    ...mapActions('users', ['editUser']),
    ...mapMutations('users', ['updateUserData']),
    resetForm() {
      this.optionsLocal = JSON.parse(JSON.stringify(this.generalData))
    },
    handleSubmit() {
      this.$refs.accountRules.validate().then(success => {
        if (success) {
          this.editUser({
            id: this.optionsLocal.id,
            user: {
              name: this.optionsLocal.name,
              email: this.optionsLocal.email,
              logo: this.optionsLocal.logo,
              cel_number: this.optionsLocal.customer ? this.optionsLocal.customer.cel_number : null,
            },
          })
            .then(response => {
              this.updateUserData(response)
              this.$swal({
                title: 'Yeah!',
                text: 'Usuario editado!',
                icon: 'success',
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              })
            })
        } else {
          this.$swal({
            title: 'Oops! 😣',
            text: 'Algo salio mal, intenta de nuevo.',
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        }
      })
    },
  },
  setup() {
    const refInputEl = ref(null)
    const previewEl = ref(null)
    const { inputImageRenderer } = useInputImageRenderer(refInputEl, previewEl)
    return {
      refInputEl,
      previewEl,
      inputImageRenderer,
    }
  },
}
</script>
