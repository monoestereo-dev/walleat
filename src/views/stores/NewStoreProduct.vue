<template>
  <b-container>
    <b-row class="match-height">
      <b-col
        class="d-flex align-items-center justify-content-center"
        cols="12"
        md="4"
        lg="6"
      >
        <div>
          <b-img
            :src="require('@/assets/images/illustration/demand.svg')"
            width="600"
            fluid
          />
        </div>

      </b-col>
      <b-col
        cols="12"
        md="8"
        lg="6"
      >
        <b-card>
          <!-- Header -->
          <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
            <h5 class="mb-0">
              Agregar producto
            </h5>
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
                    name="name"
                    rules="required"
                  >
                    <b-form-group
                      label="Nombre del producto"
                      label-for="name"
                    >
                      <b-form-input
                        id="name"
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
              <b-row>
                <b-col>
                  <!-- SKU -->
                  <validation-provider
                    #default="validationContext"
                    name="Código de barras"
                    rules=""
                  >
                    <b-form-group
                      label="Código de barras"
                      label-for="barcode"
                    >
                      <b-form-input
                        id="barcode"
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
                </b-col>
                <b-col>
                  <!-- Nutritional info -->
                  <validation-provider
                    #default="validationContext"
                    name="Información nutrimental"
                    rules=""
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
                </b-col>
              </b-row>

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
              <b-row class="mt-2">
                <b-col>
                  <!-- Product price -->
                  <validation-provider
                    #default="validationContext"
                    name="price"
                    rules="required"
                  >
                    <b-form-group
                      label="Precio"
                      label-for="price"
                    >
                      <b-form-input
                        id="price"
                        v-model="unitPrice"
                        autofocus
                        :state="getValidationState(validationContext)"
                        trim
                        size="lg"
                      />

                      <b-form-invalid-feedback>
                        {{ validationContext.errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>
                <b-col>
                  <!-- product cost -->
                  <validation-provider
                    #default="validationContext"
                    name="cost"
                    rules="required"
                  >
                    <b-form-group
                      label="Costo"
                      label-for="cost"
                    >
                      <b-form-input
                        id="cost"
                        v-model="unitCost"
                        autofocus
                        :state="getValidationState(validationContext)"
                        trim
                        size="lg"
                      />

                      <b-form-invalid-feedback>
                        {{ validationContext.errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>
              </b-row>

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
                  type="button"
                  variant="outline-secondary"
                  :to="{ name: 'store-products', params: { id: $route.params.id } }"
                >
                  Cancelar
                </b-button>
              </div>

            </b-form>
          </validation-observer>

        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {
  BForm,
  BFormGroup,
  BFormInput,
  BFormInvalidFeedback,
  BButton,
  BFormTags,
  BFormTag,
  BFormSelect,
  BCard,
  BRow,
  BCol,
  BContainer,
  BImg,
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
    BForm,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BButton,
    BFormTags,
    BFormTag,
    BFormSelect,
    BCard,
    BRow,
    BCol,
    BImg,
    BContainer,
    // Form Validation
    ValidationProvider,
    ValidationObserver,
    BaseCropper,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      required,
      categories: [],
      unitPrice: null,
      unitCost: null,
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
  beforeMount() {},
  mounted() {
    this.fetchCategories({ by_active_status: true, meta: { pagination: { per_page: 100 } } })
      .then(response => {
        this.categories = response.data
      })
  },
  methods: {
    ...mapActions('products', ['addProduct']),
    ...mapActions('storeProducts', ['addStoreProductToStore']),
    ...mapActions('categories', ['fetchCategories']),
    onSubmit() {
      this.addProduct(this.productData)
        .then(response => {
          const storeProduct = {
            product_id: response.id,
            store_id: this.$route.params.id,
            unit_price: this.unitPrice,
            unit_cost: this.unitCost,
          }
          this.addStoreProductToStore(storeProduct)
            .then(() => {
              this.$router.push({ name: 'store-products', params: { id: this.$route.params.id } })
            })
            .catch(error => {
              this.$toast({
                component: ToastificationContent,
                position: 'top-right',
                props: {
                  title: 'Error',
                  icon: 'CoffeeIcon',
                  variant: 'danger',
                  text: error.response.messages[0],
                },
              })
            })
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

</style>
