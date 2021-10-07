<template>
  <div>
    <div class="checkout-items">
      <b-card
        v-for="product in cart"
        :key="product.id"
        class="ecommerce-card mb-1"
        no-body
      >

        <!-- Product Image -->
        <div class="d-flex align-items-center justify-content-center p-1">
          <b-link>
            <b-img
              :src="product.product_attributes.logo"
              :alt="`${product.product_attributes.name}-${product.id}`"
              width="100"
            />
          </b-link>
        </div>

        <!-- Product Details: Card Body -->
        <b-card-body>
          <div class="item-name">
            <h6 class="mb-0">
              <b-link class="text-body">
                {{ product.product_attributes.name }}
              </b-link>
            </h6>
            <div class="item-rating">
              {{ product.product_attributes.variant }}
            </div>
          </div>
          <span class="text-success mb-1">${{ product.unit_price | money }}</span>
          <div class="item-quantity">
            <span class="quantity-title">Qty:</span>
            <b-input-group
              class="mx-1"
              size="sm"
            >
              <b-input-group-prepend>
                <b-button variant="outline-secondary">
                  <i class="fas fa-minus" />
                </b-button>
              </b-input-group-prepend>
              <b-form-input
                v-model="product.units"
                class="text-center"
              />
              <b-input-group-append>
                <b-button variant="outline-secondary">
                  <i class="fas fa-plus" />
                </b-button>
              </b-input-group-append>
            </b-input-group>
            <i
              class="fas fa-weight fa-2x cursor-pointer"
              @click="weightProductAndSetUnits(product)"
            />
          </div>
        </b-card-body>

        <!-- Product Options/Actions -->
        <div class="item-options text-center">
          <div class="item-wrapper">
            <div class="item-cost">
              <h4 class="item-price">
                ${{ product.unit_price * product.units | money }}
              </h4>
              <p
                v-if="product.hasFreeShipping"
                class="card-text shipping"
              >
                <b-badge
                  pill
                  variant="light-success"
                >
                  Free Shipping
                </b-badge>
              </p>
            </div>
          </div>
          <b-button
            variant="light"
            class="mt-1 remove-wishlist"
            @click="handleDeleteProductFromCarts(product)"
          >
            <feather-icon
              icon="XIcon"
              class="mr-50"
            />
            <span>Borrar</span>
          </b-button>
        </div>
      </b-card>
    </div>
  </div>

</template>

<script>
import {
  BCard, BCardBody, BLink, BImg, BButton, BBadge, BFormInput, BInputGroup, BInputGroupAppend, BInputGroupPrepend,
} from 'bootstrap-vue'
import store from '@/store'
import { ref } from '@vue/composition-api'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { formatDate } from '@core/utils/filter'
import { useEcommerce, useEcommerceUi } from '../useEcommerce'

export default {
  components: {
    BCard, BCardBody, BLink, BImg, BButton, BBadge, BFormInput, BInputGroup, BInputGroupAppend, BInputGroupPrepend,
  },
  setup() {
    const products = ref([])

    const { toggleProductInWishlist } = useEcommerceUi()
    const { removeProductFromCart } = useEcommerce()
    const removeProductFromCartClick = product => {
      removeProductFromCart(product.id)
        .then(() => {
          const productIndex = products.value.findIndex(p => p.id === product.id)
          products.value.splice(productIndex, 1)

          store.commit('app-ecommerce/UPDATE_CART_ITEMS_COUNT', products.value.length)
        })
    }

    // const fetchCartProducts = () => {
    //   store.dispatch('app-ecommerce/fetchCartProducts')
    //     .then(response => {
    //       this.products.value = response.data.products
    //     })
    // }
    // fetchCartProducts()

    return {
      products,

      // UI
      toggleProductInWishlist,
      removeProductFromCartClick,

      // Filter
      formatDate,
    }
  },
  data() {
    return {
      isWeighted: false,
    }
  },
  computed: {
    ...mapGetters('pos', ['cart']),
    ...mapGetters('weight', ['weight']),
  },
  methods: {
    ...mapActions('weight', ['getWeight']),
    ...mapMutations('pos', [
      'deleteProductFromCarts',
      'setProductQuantity',
    ]),
    handleDeleteProductFromCarts(product) {
      // eslint-disable-next-line
      const audio = new Audio(require('@/assets/sounds/Removed.wav'))
      audio.play()
      this.deleteProductFromCarts(product)
    },
    weightProductAndSetUnits(product) {
      try {
        debugger
        this.getWeight()
          .then(() => {
            this.isWeighted = true
            const x = this.weight.replace(/[^\d.-]/g, '')
            this.setProductQuantity({
              cartItem: product,
              units: Number(x),
            })
          })
      } catch (err) {
        debugger
        console.log(err)
      }
    },
  },
}
</script>

<style>

</style>
