<template>
  <b-sidebar
    id="add-new-user-sidebar"
    :visible="isAddNewProductSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-new-product-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Agregar producto
        </h5>

        <feather-icon
          class="ml-1 cursor-pointer"
          icon="XIcon"
          size="16"
          @click="hide"
        />

      </div>

      <!-- BODY -->
      <validation-observer
        #default="{ handleSubmit }"
        ref="refFormObserver"
      >
        <!-- Form -->
        <b-form
          class="p-2"
          @submit.prevent="handleSubmit(onSubmit)"
          @reset.prevent="resetForm"
        >

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
                v-model="productData.name"
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

          <!-- Form Actions -->
          <div class="d-flex mt-2">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="mr-2"
              type="submit"
            >
              Add
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="button"
              variant="outline-secondary"
              @click="hide"
            >
              Cancel
            </b-button>
          </div>

        </b-form>
      </validation-observer>
    </template>
  </b-sidebar>
</template>

<script>
import {
  BSidebar, BForm, BFormGroup, BFormInput, BFormInvalidFeedback, BButton,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref } from '@vue/composition-api'
import { required, alphaNum, email } from '@validations'
import { mapActions } from 'vuex'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BSidebar,
    BForm,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BButton,

    // Form Validation
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: 'isAddNewProductSidebarActive',
    event: 'update:is-add-new-product-sidebar-active',
  },
  props: {
    isAddNewProductSidebarActive: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      required,
      alphaNum,
      email,
      establishments: [],
      stores: [],
      selectedEstablishment: '',
    }
  },
  setup({ emit }) {
    const blankProductData = {
      name: '',
      email: '',
      role_name: 'customer',
      role_resource_id: '',
      logo: null,
      cel_number: '',
    }

    const productData = ref(JSON.parse(JSON.stringify(blankProductData)))
    const resetproductData = () => {
      productData.value = JSON.parse(JSON.stringify(blankProductData))
    }

    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetproductData)

    return {
      productData,
      refFormObserver,
      getValidationState,
      resetForm,
      emit,
    }
  },
  beforeMount() {},
  methods: {
    ...mapActions('products', ['addProduct']),
    onSubmit() {
      this.addProduct(this.productData)
        .then(() => {
          this.fetchUsers()
            .then(response => {
              this.$emit('new-products', response.data)
            })
          this.$emit('update:is-add-new-product-sidebar-active', false)
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: `Usuario ${this.productData.role_name} creado con exito`,
              icon: 'CoffeeIcon',
              variant: 'success',
              text: `Se ha enviado un correo a ${this.productData.email} con las intrucciones para establecer su contraseña.`,
            },
          })
        })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

#add-new-user-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
