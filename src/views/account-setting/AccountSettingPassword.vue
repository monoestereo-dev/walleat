<template>
  <b-card>
    <!-- form -->
    <b-form @submit.prevent="handleSubmit()">
      <b-row>
        <!-- buttons -->
        <b-col cols="12">
          <h2>Cambiar contraseña</h2>
          <p>Para cambiar tu contraseña has click en el boton de abajo y te enviaremos un correo electronico con las instrucciones.</p>
        </b-col>
        <b-col cols="12">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mt-1 mr-1"
            type="submit"
          >
            Cambiar contraseña
          </b-button>
        </b-col>
        <!--/ buttons -->
      </b-row>
    </b-form>
  </b-card>
</template>

<script>
import {
  BButton, BForm, BRow, BCol, BCard,
} from 'bootstrap-vue'
import { mapActions } from 'vuex'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BButton,
    BForm,
    BRow,
    BCol,
    BCard,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      passwordValueOld: '',
      newPasswordValue: '',
      RetypePassword: '',
      passwordFieldTypeOld: 'password',
      passwordFieldTypeNew: 'password',
      passwordFieldTypeRetype: 'password',
    }
  },
  computed: {
    passwordToggleIconOld() {
      return this.passwordFieldTypeOld === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    passwordToggleIconNew() {
      return this.passwordFieldTypeNew === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    passwordToggleIconRetype() {
      return this.passwordFieldTypeRetype === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  methods: {
    ...mapActions('auth', ['requestPassword']),
    togglePasswordOld() {
      this.passwordFieldTypeOld = this.passwordFieldTypeOld === 'password' ? 'text' : 'password'
    },
    togglePasswordNew() {
      this.passwordFieldTypeNew = this.passwordFieldTypeNew === 'password' ? 'text' : 'password'
    },
    togglePasswordRetype() {
      this.passwordFieldTypeRetype = this.passwordFieldTypeRetype === 'password' ? 'text' : 'password'
    },
    handleSubmit() {
      const userData = JSON.parse(localStorage.getItem('userData'))
      this.requestPassword({
        email: userData.email,
        redirect: false,
      })
        .then(() => {
          this.$swal({
            title: '¡Genial!',
            text: 'Hemos enviado un correo con las instrucciones!',
            icon: 'success',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        })
    },
  },
}
</script>
