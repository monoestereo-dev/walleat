<template>
  <div>
    <!-- Products search -->
    <div class="mb-2">
      <b-input-group>
        <b-form-input
          v-model="searchQuery"
          autofocus
          variant="outline-primary"
          placeholder="Nombre o Código de barras"
          @input="lookupStoreProducts"
        />
        <b-input-group-append v-if="!searchQuery">
          <b-dropdown
            no-caret
            right
            variant="outline-primary"
          >
            <template #button-content>
              🔧<span class="sr-only">settings</span>
            </template>
            <b-dropdown-item @click="toggleCameraScanner()">
              {{ isCameraScannerActive ? '🎥 Ocultar Camara' : '🎥 Mostrar camara' }}
            </b-dropdown-item>
            <b-dropdown-item @click="toggleCategories()">
              {{ isCategoriesActive ? '🛍️ Ocultar categorías' : '🛍️ Mostrar categorías' }}
            </b-dropdown-item>
          </b-dropdown>
        </b-input-group-append>
        <b-input-group-append v-else>
          <b-button
            variant="outline-warning"
            @click="searchQuery = null"
          >
            Borrar
          </b-button>
        </b-input-group-append>
      </b-input-group>
      <categories-pos v-if="settings.showCategories" />
    </div>
    <div
      v-if="searchQuery"
      class="checkout-items"
    >
      <b-card
        v-for="product in storeProducts"
        :key="product.id"
        class="ecommerce-card"
        no-body
      >

        <!-- Product Image -->
        <div class="">
          <b-link>
            <b-img
              :src="product.product_attributes.logo"
              :alt="`${product.product_attributes.name}-${product.id}`"
              width="120"
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
            variant="success"
            class="mt-1 remove-wishlist"
            @click="addProductAndClearQuery(product)"
          >
            <feather-icon
              icon="PlusIcon"
              class="mr-50"
            />
            <span>Agregar</span>
          </b-button>
        </div>
      </b-card>
    </div>
  </div>

</template>

<script>
import {
  BCard,
  BCardBody,
  BLink,
  BImg,
  BButton,
  BBadge,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BDropdown,
  BDropdownItem,
} from 'bootstrap-vue'
import store from '@/store'
import CategoriesPos from '@/views/e-commerce/e-commerce-checkout/CategoriesPOS.vue'
import { ref } from '@vue/composition-api'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { debounce } from 'lodash'
import { formatDate } from '@core/utils/filter'
import { useEcommerce, useEcommerceUi } from '../useEcommerce'

export default {
  components: {
    BCard,
    BCardBody,
    BLink,
    BImg,
    BButton,
    BBadge,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    BDropdown,
    BDropdownItem,
    CategoriesPos,
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
  props: {
    barcodeScanned: {
      type: String,
      default: () => null,
    },
  },
  data() {
    return {
      searchQuery: '',
      isCameraScannerActive: false,
      isCategoriesActive: false,
    }
  },
  computed: {
    ...mapGetters('storeProducts', ['storeProducts']),
    ...mapGetters('pos', ['settings']),
  },
  watch: {
    barcodeScanned(val) {
      this.searchQuery = val
      this.lookupStoreProducts(val)
    },
  },
  methods: {
    ...mapMutations('pos', [
      'toggleShowCategories',
    ]),
    ...mapActions('storeProducts', ['getStoreProductsStore']),
    ...mapActions('pos', ['addProductToCart']),
    lookupStoreProducts: debounce(function searchQuery(query) {
      if (/^\d*$/.test(query) && query != null && query !== '') {
        this.getStoreProductsStore({
          by_store: this.$route.params.store_id,
          by_sku: query,
        }).then(response => {
          navigator.vibrate(200)
          this.addProductToCart(response)
          this.searchQuery = null
        })
      } else if (query != null && query !== '') {
        this.getStoreProductsStore({
          by_store: this.$route.params.store_id,
          by_name: query,
        }).then(() => {
        })
      }
    }, 100),
    addProductAndClearQuery(product) {
      // eslint-disable-next-line
      const audio = new Audio(require('@/assets/sounds/Beep2.wav'))
      audio.play()
      navigator.vibrate(200)
      this.addProductToCart({ data: [{ ...product }] })
      this.searchQuery = null
    },
    toggleCameraScanner() {
      this.isCameraScannerActive = !this.isCameraScannerActive
      this.$emit('toggle', this.isCameraScannerActive)
    },
    toggleCategories() {
      this.isCategoriesActive = !this.isCategoriesActive
      this.toggleShowCategories(this.isCategoriesActive)
    },
  },
}
</script>

<style>

</style>
