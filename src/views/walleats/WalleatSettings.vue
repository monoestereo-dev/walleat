<template>
  <span>
    <feather-icon
      v-b-toggle.walleatSettings
      class="m-1 cursor-pointer"
      icon="SettingsIcon"
      size="28"
    />
    <b-sidebar
      id="walleatSettings"
      ref="walleatSettingsSidebar"
      bg-variant="white"
      sidebar-class="sidebar-lg"
      right
      backdrop
      no-header
      shadow
    >
      <template #default="{ hide }">
        <!-- Header -->
        <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
          <h5 class="mb-0">
            Editar Walleat
          </h5>

          <feather-icon
            class="ml-1 cursor-pointer"
            icon="XIcon"
            size="16"
            @click="hide"
          />

        </div>

        <validation-observer
          ref="refFormObserver"
        >
          <!-- Form -->
          <b-form
            class="p-2"
            @submit.prevent="handleSubmit()"
            @reset.prevent="resetForm"
          >
            <!-- Walleat picture -->
            <b-avatar
              ref="previewEl"
              class="mb-1"
              :src="`${apiUrl}${walleat.logo}`"
              :text="avatarText(walleat.name)"
              size="90px"
              rounded
            />

            <!-- Full Name -->
            <validation-provider
              #default="validationContext"
              name="Full Name"
              rules="required"
            >
              <b-form-group
                label="Nombre"
                label-for="full-name"
              >
                <b-form-input
                  id="full-name"
                  v-model="walleat.name"
                  autofocus
                  :state="getValidationState(validationContext)"
                  trim
                  placeholder="John Doe"
                />
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

            <!-- Establishment -->
            <validation-provider
              #default="validationContext"
              name="Establecimiento"
              rules="required"
            >
              <b-form-group
                label="Establecimiento"
                label-for="establishment"
              >
                <b-form-input
                  id="establishment"
                  v-model="walleat.establishment_id"
                  autofocus
                  :state="getValidationState(validationContext)"
                  trim
                  placeholder="John Doe"
                />
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

            <!-- Daily limit -->
            <validation-provider
              #default="validationContext"
              name="Limite diario"
              rules="required"
            >
              <b-form-group
                label="Limite diario"
                label-for="daily-limit"
              >
                <b-form-input
                  id="daily-limit"
                  v-model="walleat.daily_limit"
                  autofocus
                  :state="getValidationState(validationContext)"
                  trim
                  placeholder="300"
                />
                <b-form-invalid-feedback>
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

            <!-- Form Actions -->
            <div class="d-flex mt-2">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                class="mr-2"
                type="submit"
              >
                Guardar
              </b-button>
              <b-button
                v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                type="button"
                variant="outline-secondary"
                @click="hide"
              >
                Cancelar
              </b-button>
            </div>

          </b-form>
        </validation-observer>
      </template>
    </b-sidebar>
  </span>
</template>

<script>
import {
  BSidebar,
  VBToggle,
  BForm,
  BFormGroup,
  BFormInput,
  BFormInvalidFeedback,
  BButton,
  BAvatar,
} from 'bootstrap-vue'
import { mapActions, mapGetters } from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { avatarText } from '@core/utils/filter'
import { required, integer } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BSidebar,
    BForm,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BButton,
    BAvatar,
    // Form Validation
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    'b-toggle': VBToggle,
    Ripple,
  },
  setup({ emit }) {
    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation()

    return {
      refFormObserver,
      getValidationState,
      resetForm,
      emit,
      avatarText,
      required,
      integer,
    }
  },
  props: {
    data: {
      type: Object,
      default: () => ({
        data: {
          establishment_id: '',
          name: '',
          daily_limit: '',
          active_status: '',
          logo: null,
        },
      }),
    },
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['apiUrl']),
    ...mapGetters('walleats', ['walleat']),
  },
  mounted() {},
  methods: {
    ...mapActions('walleats', ['editWalleat']),
    handleSubmit() {
      this.$refs.refFormObserver.validate().then(success => {
        if (success) {
          this.editWalleat({ ...this.walleat })
            .then(response => {
              this.$emit('success', response)
              this.$refs.walleatSettingsSidebar.hide()
            })
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
