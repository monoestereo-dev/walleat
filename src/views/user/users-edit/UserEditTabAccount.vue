<template>
  <div>

    <!-- Media -->
    <b-media class="mb-2">
      <div class="d-flex">
        <base-cropper
          :model="userData"
          @cropped-image="userData.logo"
        />
      </div>
    </b-media>

    <!-- User Info: Input Fields -->
    <validation-observer ref="simpleRules">
      <b-form
        @submit.prevent="validationForm"
      >
        <b-row>
          <!-- Field: Full Name -->
          <b-col
            cols="12"
            md="6"
          >
            <validation-provider
              #default="{ errors }"
              name="Nombre"
              rules="required"
            >
              <b-form-group
                label="Name"
                label-for="full-name"
              >
                <b-form-input
                  id="full-name"
                  v-model="userData.name"
                />
              </b-form-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-col>

          <!-- Field: Email -->
          <b-col
            cols="12"
            md="6"
          >
            <validation-provider
              #default="{ errors }"
              name="Nombre"
              rules="required|email"
            >
              <b-form-group
                label="Email"
                label-for="email"
              >
                <b-form-input
                  id="email"
                  v-model="userData.email"
                  type="email"
                />
              </b-form-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-col>
        </b-row>
        <!-- TODO: only admin can see the next block -->
        <b-row v-if="false">
          <!-- Field: Status -->
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Status"
              label-for="user-status"
            >
              <v-select
                v-model="userData.active_status"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="statusOptions"
                :reduce="val => val.value"
                :clearable="false"
                input-id="user-status"
              />
            </b-form-group>
          </b-col>

          <!-- Field: Role -->
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="User Role"
              label-for="user-role"
            >
              <v-select
                v-model="userData.role"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="roleOptions"
                :reduce="val => val.value"
                :clearable="false"
                input-id="user-role"
              />
            </b-form-group>
          </b-col>

          <!-- Field: Company -->
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Company"
              label-for="company"
            >
              <b-form-input
                id="company"
                v-model="userData.company"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <!-- Action Buttons -->
        <b-button
          variant="primary"
          class="mb-1 mb-sm-0 mr-0 mr-sm-1"
          :block="$store.getters['app/currentBreakPoint'] === 'xs'"
          type="submit"
        >
          Guardar
        </b-button>
        <b-button
          variant="outline-secondary"
          @click="$router.go(-1)"
          :block="$store.getters['app/currentBreakPoint'] === 'xs'"
        >
          Cancelar
        </b-button>
      </b-form>
    </validation-observer>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import {
  BButton, BMedia, BRow, BCol, BFormGroup, BFormInput, BForm,
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import vSelect from 'vue-select'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ref } from '@vue/composition-api'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required, email } from '@validations'
import BaseCropper from '@/@core/components/BaseCropper.vue'
import useUsersList from '../users-list/useUsersList'

export default {
  components: {
    BButton,
    BMedia,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    ValidationObserver,
    ValidationProvider,
    vSelect,
    BaseCropper,
  },
  props: {
    userData: {
      type: Object,
      required: false,
      default: () => ({
        name: '',
        logo: null,
      }),
    },
  },
  setup(props) {
    const { resolveUserRoleVariant } = useUsersList()

    const roleOptions = [
      { label: 'Admin', value: 'admin' },
      { label: 'Author', value: 'author' },
      { label: 'Editor', value: 'editor' },
      { label: 'Maintainer', value: 'maintainer' },
      { label: 'Subscriber', value: 'subscriber' },
    ]

    const statusOptions = [
      { label: 'Pending', value: 'pending' },
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ]

    const permissionsData = [
      {
        module: 'Admin',
        read: true,
        write: false,
        create: false,
        delete: false,
      },
      {
        module: 'Staff',
        read: false,
        write: true,
        create: false,
        delete: false,
      },
      {
        module: 'Author',
        read: true,
        write: false,
        create: true,
        delete: false,
      },
      {
        module: 'Contributor',
        read: false,
        write: false,
        create: false,
        delete: false,
      },
      {
        module: 'User',
        read: false,
        write: false,
        create: false,
        delete: true,
      },
    ]

    // ? Demo Purpose => Update image on click of update
    const refInputEl = ref(null)
    const previewEl = ref(null)

    const { inputImageRenderer } = useInputImageRenderer(refInputEl, base64 => {
      // eslint-disable-next-line no-param-reassign
      props.userData.avatar = base64
    })

    return {
      resolveUserRoleVariant,
      avatarText,
      roleOptions,
      statusOptions,
      permissionsData,

      //  ? Demo - Update Image on click of update button
      refInputEl,
      previewEl,
      inputImageRenderer,
    }
  },
  data() {
    return {
      required,
      email,
    }
  },
  methods: {
    ...mapActions('users', ['editUser']),
    validationForm() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          this.editUser({
            id: this.$route.params.id,
            user: {
              name: this.userData.name,
              email: this.userData.email,
              logo: this.userData.logo,
            },
          }).then(() => {
            this.$router.go(-1)
          })
        }
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
