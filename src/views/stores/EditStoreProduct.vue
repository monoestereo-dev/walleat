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
          md="8"
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
                    <b-input-group>
                      <b-input-group-prepend is-text>
                        $
                      </b-input-group-prepend>
                      <b-form-input
                        id="precio"
                        v-model="productFormData.unit_price"
                        autofocus
                        :state="getValidationState(validationContext)"
                        trim
                        placeholder=""
                      />
                    </b-input-group>
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
                    <b-input-group>
                      <b-input-group-prepend is-text>
                        $
                      </b-input-group-prepend>
                      <b-form-input
                        id="cost"
                        v-model="productFormData.unit_cost"
                        :state="getValidationState(validationContext)"
                        trim
                      />
                    </b-input-group>

                    <b-form-invalid-feedback>
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>

                <!-- INVENTORY -->
                <div>
                  <div class="d-flex justify-content-between align-items-center my-2">
                    <label for="check-button">Gestionar inventaro</label>
                    <b-form-checkbox
                      v-model="productFormData.has_inventory"
                      name="check-button"
                      switch
                      inline
                      class="m-0"
                    />
                  </div>
                  <b-row
                    v-if="productFormData.has_inventory"
                    class="border-top pt-2 pb-2"
                  >
                    <b-col class="d-flex justify-content-start">
                      <div class="text-center">
                        <h6 class="text-muted font-weight-bolder">
                          Existencia
                        </h6>
                        <h3>
                          {{ productFormData.inventory }}
                        </h3>
                      </div>
                    </b-col>
                    <b-col sm="auto">
                      <b-button
                        v-if="!addProducts"
                        size="sm"
                        class="mt-1"
                        variant="outline-primary"
                        @click="addProducts = true"
                      >
                        Agregar
                      </b-button>
                      <b-input-group
                        v-else
                        class="mt-1"
                      >
                        <b-form-input
                          v-model="unitsToAdd"
                          placeholder="Cantidad"
                          type="number"
                          size="sm"
                        />
                        <b-input-group-append>
                          <b-button
                            variant="outline-primary"
                            size="sm"
                            @click="addProducts = false"
                          >
                            <i class="fas fa-times" />
                          </b-button>
                        </b-input-group-append>
                      </b-input-group>
                    </b-col>
                  </b-row>
                </div>

                <!-- Form Actions -->
                <div class="d-flex mt-2">
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    variant="primary"
                    class="mr-2"
                    type="submit"
                  >
                    Aceptar
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
  BRow, BCol, BAlert, BLink, BCard, BForm, BFormGroup, BFormInput, BFormInvalidFeedback, BButton, BFormCheckbox, BInputGroupPrepend, BInputGroup, BInputGroupAppend,
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
    BFormCheckbox,
    BInputGroupPrepend,
    BInputGroupAppend,
    BInputGroup,
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
      id: router.currentRoute.params.store_product_id,
      unit_cost: router.currentRoute.params.unit_cost,
      unit_price: router.currentRoute.params.unit_price,
      has_inventory: router.currentRoute.params.has_inventory,
      inventory: router.currentRoute.params.inventory,
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
      addProducts: false,
      unitsToAdd: 1,
    }
  },
  methods: {
    ...mapActions('storeProducts', [
      'editStoreProduct',
    ]),
    ...mapActions('products', [
      'fetchProduct',
    ]),
    ...mapActions('orders', [
      'addOrder',
    ]),
    handleAddInventory() {
      this.addOrder({
        order: {
          order_type: 'buy',
          payment_type: 'cash',
          store_id: this.$route.params.store_id,
          order_store_products_attributes: [
            {
              store_product_id: this.$route.params.store_product_id,
              units: this.unitsToAdd,
            },
          ],
        },
        orderType: 'buy',
      })
        .then(() => {
          this.$router.push({ name: 'store-products', params: { id: this.$route.params.store_id } })
        })
    },
    onSubmit() {
      // si cambio el precio o el costo... primero actualizamos el store product, despues agregamos el inventario si es necesario
      if (this.productFormData.unit_cost !== this.$route.params.unit_cost || this.productFormData.unit_price !== this.$route.params.unit_price) {
        this.editStoreProduct(this.productFormData)
          .then(() => {
            if (!this.addProducts) {
              this.$router.push({ name: 'store-products', params: { id: this.$route.params.store_id } })
            }
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
          .then(() => {
            if (this.addProducts && this.unitsToAdd > 0 && this.unitsToAdd !== '' && this.unitsToAdd !== null) {
              // order type buy
              this.handleAddInventory()
            }
          })
      } else if (this.addProducts && this.unitsToAdd > 0 && this.unitsToAdd !== '' && this.unitsToAdd !== null) {
        // order type buy
        this.handleAddInventory()
      }
    },
  },
}
</script>

<style>

</style>
