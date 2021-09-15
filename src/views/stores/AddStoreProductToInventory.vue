<template>
  <div>

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="productData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching user data
      </h4>
      <div class="alert-body">
        No products found with this user id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'apps-users-list'}"
        >
          products List
        </b-link>
        for other prducts.
      </div>
    </b-alert>

    <template v-if="productData">
      <!-- First Row -->
      <b-row class="match-height">
        <b-col
          cols="12"
          md="6"
        >
          <product-info-card :product="productData" />
        </b-col>
        <b-col>
          <b-card>
            <validation-observer
              #default="{ handleSubmit }"
              ref="refFormObserver"
            >
              <h3 class="mb-2">
                Información del producto
              </h3>
              <!-- Form -->
              <b-form
                @submit.prevent="handleSubmit(onSubmit)"
                @reset.prevent="resetForm"
              >

                <!-- PRICE -->
                <validation-provider
                  #default="validationContext"
                  name="Precio"
                  rules="required"
                >
                  <b-form-group
                    label="Precio"
                    label-for="precio"
                  >
                    <b-form-input
                      id="precio"
                      v-model="productFormData.unit_price"
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

                <!-- COST -->
                <validation-provider
                  #default="validationContext"
                  name="Cost"
                  rules="required"
                >
                  <b-form-group
                    label="Costo"
                    label-for="cost"
                  >
                    <b-form-input
                      id="cost"
                      v-model="productFormData.unit_cost"
                      :state="getValidationState(validationContext)"
                      trim
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

    </template>

  </div>
</template>

<script>
import store from '@/store'
import router from '@/router'
import { ref } from '@vue/composition-api'
import {
  BRow, BCol, BAlert, BLink, BCard, BForm, BFormGroup, BFormInput, BFormInvalidFeedback, BButton,
} from 'bootstrap-vue'
import ProductInfoCard from '@/views/products/product-view/ProductInfoCard.vue'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'
import { required, alphaNum } from '@validations'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { mapActions } from 'vuex'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BRow,
    BCol,
    BAlert,
    BLink,
    BCard,
    BForm,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BButton,
    // Local Components
    ProductInfoCard,
    // Form Validation
    ValidationProvider,
    ValidationObserver,
  },
  setup() {
    const productData = ref(null)
    store.dispatch('products/fetchProduct', router.currentRoute.params.product_id)
      .then(response => { productData.value = response })
      .catch(error => {
        if (error.response.status === 404) {
          productData.value = undefined
        }
      })

    const blankProductData = {
      unit_cost: null,
      unit_price: null,
      store_id: router.currentRoute.params.id,
      product_id: router.currentRoute.params.product_id,
      has_inventory: false,
      inventory: 1,
    }

    const productFormData = ref(JSON.parse(JSON.stringify(blankProductData)))
    const resetProductData = () => {
      productFormData.value = JSON.parse(JSON.stringify(blankProductData))
    }

    const {
      getValidationState,
    } = formValidation(resetProductData)

    return {
      getValidationState,
      productData,
      productFormData,
    }
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      required,
      alphaNum,
    }
  },
  methods: {
    ...mapActions('storeProducts', [
      'addStoreProductToStore',
    ]),
    onSubmit() {
      this.addStoreProductToStore(this.productFormData)
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
              text: error.response.data.messages.product[0],
            },
          })
        })
    },
  },
}
</script>

<style>

</style>
