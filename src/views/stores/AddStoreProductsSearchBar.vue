<template>
  <b-container>
    <!-- Products search -->
    <b-card class="mb-2">
      <h5 class="display-4">
        Agregar productos
      </h5>
      <p>Buscar productos por nombre o código de barras</p>
      <b-input-group>
        <b-form-input
          id="sku"
          v-model="searchQuery"
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
          </b-dropdown>
        </b-input-group-append>
        <b-input-group-append v-else>
          <b-button
            variant="outline-warning"
            @click="clearSearchbarAndResetSearch()"
          >
            Borrar
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </b-card>
    <div
      v-if="searchQuery"
      class="checkout-items list-view"
    >
      <!-- SEARCH RESULTS -->
      <b-card
        v-for="product in products"
        :key="product.id"
        class="ecommerce-card mb-1"
        no-body
      >

        <!-- Product Image -->
        <div>
          <b-link>
            <b-img
              :src="product.logo"
              :alt="`${product.name}-${product.id}`"
              width="120"
            />
          </b-link>
        </div>

        <!-- Product Details: Card Body -->
        <b-card-body>
          <div class="item-name">
            <h6 class="mb-0">
              <b-link class="text-body">
                {{ product.name }}
              </b-link>
            </h6>
            <div class="item-rating">
              {{ product.variant }}
            </div>
            <div>
              <b-badge
                v-for="cat in product.categories_names"
                :key="`cat-${cat}`"
              >
                {{ cat }}
              </b-badge>
            </div>
          </div>
        </b-card-body>

        <!-- Product Options/Actions -->
        <div class="item-options text-center">
          <div class="item-wrapper">
            <div class="item-cost">
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
            :to="{ name: 'add-store-product', params: { id: $route.params.id, product_id: product.id }}"
          >
            <feather-icon
              icon="PlusIcon"
              class="mr-50"
            />
            <span>Agregar</span>
          </b-button>
        </div>
      </b-card>

      <!-- PAGINATION -->
      <b-pagination
        v-if="pagination.total_objects > pagination.per_page"
        v-model="pagination.page"
        :total-rows="pagination.total_objects"
        :per-page="pagination.per_page"
        first-number
        last-number
        class="mb-0 mt-1 mt-sm-0"
        prev-class="prev-item"
        next-class="next-item"
        @change="(value)=>{handlePagination({ page: value, per_page: pagination.per_page })}"
      >
        <template #prev-text>
          <feather-icon
            icon="ChevronLeftIcon"
            size="18"
          />
        </template>
        <template #next-text>
          <feather-icon
            icon="ChevronRightIcon"
            size="18"
          />
        </template>
      </b-pagination>
      <!-- ADD NEW PRODUCT -->
      <b-card
        class="mt-1 mb-1"
        no-body
      >
        <b-card-body>
          <h3 class="display-5">
            ¿No encontraste el producto deseado? 😲
          </h3>
          <p>Da click en el botón de abajo para registrar un producto nuevo</p>
          <b-button
            :to="{ name: 'new-store-product', params: { id: $route.params.id } }"
          >Registrar producto nuevo</b-button>
        </b-card-body>
      </b-card>
    </div>
  </b-container>

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
  BContainer,
  BPagination,
} from 'bootstrap-vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { debounce } from 'lodash'

export default {
  components: {
    BCard,
    BContainer,
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
    BPagination,
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
    ...mapGetters('products', [
      'products',
      'pagination',
    ]),
    ...mapGetters('pos', ['settings']),
  },
  watch: {
    barcodeScanned(val) {
      this.searchQuery = val
      this.lookupStoreProducts(val)
    },
  },
  mounted() {
    document.addEventListener('keydown', () => {
      document.getElementById('sku').focus()
    })
  },
  methods: {
    ...mapMutations('pos', [
      'toggleShowCategories',
    ]),
    ...mapActions('products', ['fetchProducts']),
    ...mapActions('pos', ['addProductToCart']),
    lookupStoreProducts: debounce(function searchQuery(query) {
      if (/^\d*$/.test(query) && query != null && query !== '') {
        const barcodeWithOutLastDigit = query.substring(0, query.length - 1)
        this.fetchProducts({
          by_sku: Number(barcodeWithOutLastDigit),
        }).then(response => {
          if (response.data.length === 1) {
            if (navigator.vibrate) {
              navigator.vibrate(200)
            }
          }
        })
      } else if (query != null && query !== '') {
        this.fetchProducts({
          by_name: query,
        })
      } else if (query === null || query === '') {
        this.fetchProducts({ })
      }
    }, 250),
    handlePagination({ page, per_page }) {
      this.fetchProducts({
        by_name: this.searchQuery,
        meta: {
          pagination: {
            page,
            per_page,
          },
        },
      })
    },
    clearSearchbarAndResetSearch() {
      this.searchQuery = ''
    },
  },
}
</script>

<style lang="scss">
@import "~@core/scss/base/pages/app-ecommerce.scss";
</style>
