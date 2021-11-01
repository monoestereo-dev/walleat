<template>
  <div style="height: inherit">

    <!-- ECommerce Header -->
    <section id="ecommerce-header">
      <div class="row">
        <div class="col-sm-12">
          <div class="ecommerce-header-items">
            <div class="result-toggler">
              <feather-icon
                icon="MenuIcon"
                class="d-block d-lg-none"
                size="21"
                @click="mqShallShowLeftSidebar = true"
              />
              <div class="search-results">
                {{ totalProducts }} resultados
              </div>
            </div>
            <div class="view-options d-flex">
              <b-button
                variant="primary"
                :to="{ name: 'add-store-products', params: { id: $route.params.id } }"
              >
                <feather-icon
                  icon="PlusIcon"
                />
                Agregar producto
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Overlay -->
    <div class="body-content-overlay" />

    <!-- Searchbar -->
    <div class="ecommerce-searchbar mt-1">
      <b-row>
        <b-col cols="12">
          <b-input-group class="input-group-merge">
            <b-form-input
              v-model="filters.q"
              placeholder="Buscar producto"
              class="search-product"
            />
            <b-input-group-append is-text>
              <feather-icon
                icon="SearchIcon"
                class="text-muted"
              />
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
    </div>

    <!-- Prodcuts -->
    <section :class="itemView">
      <b-card
        v-for="product in products"
        :key="product.id"
        class="ecommerce-card mb-1"
        no-body
      >
        <div class="item-img text-center d-flex justify-content-center px-1">
          <b-link :to="{ name: 'product-view', params: { id: product.id } }">
            <b-img
              :alt="`${product.product_attributes.name}-${product.id}`"
              fluid
              rounded
              :src="`${product.product_attributes.logo}`"
              :width="itemView === 'list-view' ? 110 : 200"
            />
          </b-link>
        </div>

        <!-- Product Details -->
        <b-card-body>
          <div class="item-wrapper">
            <div class="item-rating">
              <nutri-score
                v-if="product.product_attributes.nutritional_info"
                :nutritional-info="product.product_attributes.nutritional_info"
                :class="{ 'mt-1' : itemView === 'list-view'}"
              />
            </div>
            <div>
              <h6 class="item-price">
                ${{ product.unit_price }}
              </h6>
              <h6 class="item-price">
                ${{ product.unit_cost }}
              </h6>
            </div>
          </div>
          <h6 class="item-name">
            <b-link
              class="text-body"
              :to="{ name: 'product-view', params: { id: product.product_attributes.id } }"
            >
              {{ product.product_attributes.name }}
            </b-link>
            <b-link class="text-muted">
              {{ product.product_attributes.variant }}
            </b-link>
          </h6>
          <b-card-text class="item-description mt-1">
            <b-badge
              v-for="(category, n) in product.product_attributes.categories_names"
              :key="`category-${n}`"
              class="mr-1"
            >
              {{ category }}
            </b-badge>
          </b-card-text>
        </b-card-body>

        <!-- Product Actions -->
        <div class="item-options text-center">
          <div class="item-wrapper">
            <div class="item-cost">
              <h5 class="item-price text-success d-flex justify-content-between">
                <span>Precio</span>  ${{ product.unit_price }}
              </h5>
              <h5 class="item-price d-flex justify-content-between mt-1">
                <span>Costo</span>  ${{ product.unit_cost }}
              </h5>
              <h5 class="item-price text-secondary d-flex justify-content-between mt-1">
                <span>Inventario</span>
                <div>
                  <span
                    v-if="product.has_inventory"
                    :class="product.inventory > 0 ? 'text-secondary' : 'text-danger' "
                  >
                    {{ product.inventory }}
                  </span>
                  <span v-else>
                    N/D
                  </span>
                </div>
              </h5>
            </div>
          </div>

          <b-button
            variant="primary"
            tag="a"
            class="btn-cart"
            :to="{
              name: 'edit-store-product',
              params: {
                store_id: $route.params.id,
                store_product_id: product.id,
                product_id: product.product_attributes.id,
                unit_cost: product.unit_cost,
                unit_price: product.unit_price,
                has_inventory: product.has_inventory,
                inventory: product.inventory,
              }
            }"
          >
            <feather-icon
              icon="EditIcon"
              class="mr-50"
            />
            <span>Editar</span>
          </b-button>
        </div>
      </b-card>
    </section>

    <!-- Pagination -->
    <section v-if="totalProducts > filters.perPage">
      <b-row>
        <b-col cols="12">
          <b-pagination
            v-model="filters.page"
            :total-rows="totalProducts"
            :per-page="filters.perPage"
            first-number
            align="center"
            last-number
            prev-class="prev-item"
            next-class="next-item"
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
        </b-col>
      </b-row>
    </section>

    <!-- Sidebar -->
    <portal to="content-renderer-sidebar-detached-left">
      <shop-left-filter-sidebar
        :filters="filters"
        :categories="categories"
        :filter-options="filterOptions"
        :mq-shall-show-left-sidebar.sync="mqShallShowLeftSidebar"
      />
    </portal>
  </div>
</template>

<script>
import _ from 'underscore'
import {
  BRow, BCol, BInputGroup, BInputGroupAppend,
  BFormInput, BCard, BCardBody, BLink, BImg, BCardText, BButton, BPagination, BBadge,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import router from '@/router'
import { watch } from '@vue/composition-api'
import { mapActions } from 'vuex'
import { useResponsiveAppLeftSidebarVisibility } from '@core/comp-functions/ui/app'
import NutriScore from '@/@core/components/NutriScore.vue'
import ShopLeftFilterSidebar from '@/views/e-commerce/e-commerce-shop/ECommerceShopLeftFilterSidebar.vue'
import { useShopFiltersSortingAndPagination, useShopUi, useShopRemoteData } from '@/views/stores/useStoreProducts'
import { useEcommerceUi } from '@/views/e-commerce/useEcommerce'

export default {
  directives: {
    Ripple,
  },
  components: {
    // BSV
    BRow,
    BCol,
    BInputGroup,
    BInputGroupAppend,
    BFormInput,
    BCard,
    BCardBody,
    BLink,
    BImg,
    BCardText,
    BButton,
    BPagination,
    BBadge,

    // SFC
    ShopLeftFilterSidebar,

    // Walleat
    NutriScore,

  },
  setup(x, ctx) {
    const {
      filters, filterOptions, sortBy, sortByOptions,
    } = useShopFiltersSortingAndPagination()

    const { handleCartActionClick, toggleProductInWishlist } = useEcommerceUi()

    const {
      itemView, itemViewOptions, totalProducts,
    } = useShopUi()

    const {
      products, fetchStoreProducts, categories, fetchCategories,
    } = useShopRemoteData()

    const { mqShallShowLeftSidebar } = useResponsiveAppLeftSidebarVisibility()

    // Wrapper Function for `fetchProducts` which can be triggered initially and upon changes of filters
    // eslint-disable-next-line
    const fetchShopProducts = _.debounce(function() {
      if (/^\d*$/.test(filters.value.q) && filters.value.q !== null && filters.value.q !== '') {
        const barcodeWithOutLastDigit = filters.value.q.substring(0, filters.value.q.length - 1)
        fetchStoreProducts({
          by_sku: Number(barcodeWithOutLastDigit) || null,
          by_category: filters.value.categories || null,
          by_active_status: true,
          by_store: ctx.root.$route.params.id || null,
          meta: {
            pagination: {
              page: filters.value.page,
              per_page: filters.value.perPage,
            },
          },
        })
          .then(response => {
            products.value = response.data
            totalProducts.value = response.meta.pagination.total_objects
          })
      } else if (filters.value.q !== null && filters.value.q !== '') {
        fetchStoreProducts({
          by_name: filters.value.q || null,
          by_category: filters.value.categories || null,
          by_active_status: true,
          by_store: ctx.root.$route.params.id || null,
          meta: {
            pagination: {
              page: filters.value.page,
              per_page: filters.value.perPage,
            },
          },
        })
          .then(response => {
            products.value = response.data
            totalProducts.value = response.meta.pagination.total_objects
          })
      } else if (filters.value.q === null || filters.value.q === '') {
        fetchStoreProducts({
          by_active_status: true,
          by_category: filters.value.categories || null,
          by_store: ctx.root.$route.params.id || null,
          meta: {
            pagination: {
              page: filters.value.page,
              per_page: filters.value.perPage,
            },
          },
        })
          .then(response => {
            products.value = response.data
            totalProducts.value = response.meta.pagination.total_objects
          })
      }
    }, 500)

    const fetchProductsCategories = () => {
      fetchCategories({
        by_active_status: true,
        by_store: router.currentRoute.params.id,
        meta: {
          pagination: {
            per_page: 10000,
          },
        },
      })
        .then(response => {
          categories.value = response.data
        })
    }

    fetchShopProducts()
    fetchProductsCategories()

    watch([filters, sortBy], () => {
      fetchShopProducts()
    }, {
      deep: true,
    })

    return {
      // useShopFiltersSortingAndPagination
      filters,
      filterOptions,
      sortBy,
      sortByOptions,

      // useShopUi
      itemView,
      itemViewOptions,
      totalProducts,
      toggleProductInWishlist,
      handleCartActionClick,

      // useShopRemoteData
      products,
      categories,
      // mqShallShowLeftSidebar
      mqShallShowLeftSidebar,
    }
  },
  methods: {
    ...mapActions('stores', ['fetchStoreProducts']),
  },
}
</script>

<style lang="scss">
@import "~@core/scss/base/pages/app-ecommerce.scss";
</style>

<style lang="scss" scoped>
.item-view-radio-group ::v-deep {
  .btn {
    display: flex;
    align-items: center;
  }
}
.card-img-top {
  max-width: 225px;
}
</style>
