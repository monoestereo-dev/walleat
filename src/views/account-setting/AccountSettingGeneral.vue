<template>
  <b-card>

    <!-- media -->
    <b-media no-body>
      <b-media-aside>
        <b-link>
          <b-img
            ref="previewEl"
            rounded
            :src="`${apiUrl}${optionsLocal.logo}`"
            height="80"
          />
        </b-link>
        <!--/ avatar -->
      </b-media-aside>

      <b-media-body class="mt-75 ml-75">
        <!-- upload button -->
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
          size="sm"
          class="mb-75 mr-75"
          @click="$refs.refInputEl.$el.click()"
        >
          Upload
        </b-button>
        <b-form-file
          ref="refInputEl"
          v-model="profileFile"
          accept=".jpg, .png, .gif"
          :hidden="true"
          plain
          @input="inputImageRenderer"
        />
        <!--/ upload button -->

        <!-- reset -->
        <b-button
          v-ripple.400="'rgba(186, 191, 199, 0.15)'"
          variant="outline-secondary"
          size="sm"
          class="mb-75 mr-75"
        >
          Reset
        </b-button>
        <!--/ reset -->
        <b-card-text>Allowed JPG, GIF or PNG. Max size of 800kB</b-card-text>
      </b-media-body>
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
          <b-col sm="6">
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
  BFormFile, BButton, BForm, BFormGroup, BFormInput, BRow, BCol, BCard, BCardText, BMedia, BMediaAside, BMediaBody, BLink, BImg,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ref } from '@vue/composition-api'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required, email } from '@validations'

export default {
  components: {
    BButton,
    BForm,
    BImg,
    BFormFile,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BCard,
    BCardText,
    BMedia,
    BMediaAside,
    BMediaBody,
    BLink,
    ValidationProvider,
    ValidationObserver,
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
  computed: {
    ...mapGetters(['apiUrl']),
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
              cel_number: this.optionsLocal.customer.cel_number,
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
