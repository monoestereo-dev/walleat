<template>
  <b-container>
    <b-card>
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Editar producto
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
          <b-row>
            <b-col sm="auto">
              <div class="d-flex align-items-center h-100">
                <base-cropper
                  :model="productData"
                  @cropped-image="productData.logo"
                />
              </div>
            </b-col>
            <b-col>
              <!-- Product Name -->
              <validation-provider
                #default="validationContext"
                name="Nombre"
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
                    placeholder="Galletas"
                  />

                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>

              <!-- Variant -->
              <validation-provider
                #default="validationContext"
                name="Variedad"
                rules=""
              >
                <b-form-group
                  label="Variedad"
                  label-for="variant"
                >
                  <b-form-input
                    id="variant"
                    v-model="productData.variant"
                    autofocus
                    :state="getValidationState(validationContext)"
                    trim
                    placeholder="300gr"
                  />

                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>
          </b-row>

          <!-- SKU -->
          <validation-provider
            #default="validationContext"
            name="Código de barras"
            rules=""
          >
            <b-form-group
              label="Código de barras"
              label-for="sku"
            >
              <b-form-input
                id="sku"
                v-model="productData.sku"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder=""
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Nutritional info -->
          <validation-provider
            #default="validationContext"
            name="Información nutrimental"
            rules="required"
          >
            <b-form-group
              label="Información nutimental"
              label-for="nutritional-info"
            >
              <b-form-input
                id="nutritional-info"
                v-model="productData.nutritional_info"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder="0"
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Categories -->
          <validation-provider
            #default="validationContext"
            name="Full Name"
            rules="required"
          >
            <b-form-group label="Categorías">
              <!-- prop `add-on - change` is needed to enable adding tags vie the `change` event -->
              <b-form-tags
                v-model="productData.categories_ids"
                size="lg"
                add-on-change
                no-outer-focus
              >
                <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                  <ul
                    v-if="tags.length > 0"
                    class="list-inline d-inline-block mb-1"
                  >
                    <li
                      v-for="tag in tags"
                      :key="tag"
                      class="list-inline-item"
                    >
                      <b-form-tag
                        :title="tag"
                        :disabled="disabled"
                        variant="primary"
                        class="my-50 mr-25"
                        @remove="removeTag(tag)"
                      >
                        {{ getTagNameById(tag) }}
                      </b-form-tag>
                    </li>
                  </ul>
                  <b-form-select
                    v-bind="inputAttrs"
                    :disabled="disabled || availableOptions.length === 0"
                    :options="availableOptions"
                    text-field="name"
                    value-field="id"
                    v-on="inputHandlers"
                  >
                    <template v-slot:first>
                      <!-- This is required to prevent bugs with Safari -->
                      <option
                        disabled
                        value=""
                      >
                        Selecciona una categoría...
                      </option>
                    </template>
                  </b-form-select>
                </template>
              </b-form-tags>
            </b-form-group>
            <b-form-invalid-feedback>
              {{ validationContext.errors[0] }}
            </b-form-invalid-feedback>
          </validation-provider>

          <!-- Form Actions -->
          <div class="d-flex mt-2">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="mr-2"
              type="submit"
            >
              Agregar
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              variant="outline-secondary"
              @click="$router.go(-1)"
            >
              Cancelar
            </b-button>
          </div>

        </b-form>
      </validation-observer>
    </b-card>
  </b-container>
</template>

<script>
import {
  BForm, BFormGroup, BFormInput, BFormInvalidFeedback, BButton,
  BFormTags, BFormTag, BFormSelect, BCard, BContainer, BRow, BCol,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref } from '@vue/composition-api'
import { required } from '@validations'
import { mapActions } from 'vuex'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import BaseCropper from '@/@core/components/BaseCropper.vue'

export default {
  components: {
    BCard,
    BForm,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BButton,
    BFormTags,
    BFormTag,
    BFormSelect,
    BContainer,
    BRow,
    BCol,
    // Form Validation
    ValidationProvider,
    ValidationObserver,
    BaseCropper,
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
      categories: [],
    }
  },
  computed: {
    availableOptions() {
      // eslint-disable-next-line
      return this.categories.filter(opt => {
        return this.productData.categories_ids.indexOf(opt.id) === -1
      })
    },
  },
  setup({ emit }) {
    const blankProductData = {
      name: '',
      variant: '',
      sku: '',
      logo: null,
      nutritional_info: 0,
      categories_ids: [],
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
  beforeMount() {
    this.fetchProduct(this.$route.params.id)
      .then(response => {
        this.productData = response
      })
  },
  mounted() {
    this.fetchCategories({ by_active_status: true, meta: { pagination: { per_page: 100 } } })
      .then(response => {
        this.categories = response.data
      })
  },
  methods: {
    ...mapActions('products', ['editProduct', 'fetchProduct']),
    ...mapActions('categories', ['fetchCategories']),
    onSubmit() {
      this.editProduct({ id: this.$route.params.id, product: this.productData })
        .then(() => {
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: `${this.productData.name}`,
              icon: 'CoffeeIcon',
              variant: 'success',
              text: 'Creado con éxito',
            },
          })
          this.$router.go(-1)
        })
        .catch(error => {
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Error',
              icon: 'CoffeeIcon',
              variant: 'danger',
              text: error.response.messages.base[0],
            },
          })
        })
    },
    getTagNameById(id) {
      let name = ''
      this.categories.forEach(x => {
        if (x.id === id) {
          name = x.name
        }
      })
      return name
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
