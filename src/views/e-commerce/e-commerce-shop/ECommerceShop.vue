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

              <!-- Item View Radio Button Group  -->
              <b-form-radio-group
                v-model="itemView"
                class="ml-1 list item-view-radio-group"
                buttons
                size="sm"
                button-variant="outline-primary"
              >
                <b-form-radio
                  v-for="option in itemViewOptions"
                  :key="option.value"
                  :value="option.value"
                >
                  <feather-icon
                    :icon="option.icon"
                    size="18"
                  />
                </b-form-radio>
              </b-form-radio-group>
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
        class="ecommerce-card"
        no-body
      >
        <div class="item-img text-center d-flex justify-content-center px-1">
          <b-link :to="{ name: 'product-view', params: { id: product.id } }">
            <b-img
              :alt="`${product.name}-${product.id}`"
              fluid
              rounded
              :src="`${product.logo}`"
              :width="itemView === 'list-view' ? 110 : 200"
            />
          </b-link>
        </div>

        <!-- Product Details -->
        <b-card-body>
          <div class="item-wrapper">
            <div class="item-rating">
              <nutri-score :nutritional-info="product.nutritional_info" />
            </div>
            <!-- <div>
              <h6 class="item-price">
                ${{ product.price }}
              </h6>
            </div> -->
          </div>
          <h6 class="item-name">
            <b-link
              class="text-body"
              :to="{ name: 'product-view', params: { id: product.id } }"
            >
              {{ product.name }}
            </b-link>
            <b-link class="text-muted">
              {{ product.variant }}
            </b-link>
          </h6>
          <b-card-text class="item-description mt-1">
            <b-badge
              v-for="(category, n) in product.categories_names"
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
            <!-- <div class="item-cost">
              <h4 class="item-price">
                ${{ product.price }}
              </h4>
            </div> -->
          </div>
          <b-button
            v-if="$route.name === 'ban-products'"
            variant="light"
            tag="a"
            class="btn-wishlist"
            @click="handleBanProduct(product)"
          >
            <feather-icon
              :icon="product.is_banned? 'SlashIcon' : 'CheckCircleIcon'"
              class="mr-50"
              :stroke="product.is_banned ? '#ea5455' : '#28c76f'"
            />
            <span :class="product.is_banned ? 'text-danger' : 'text-success'">{{ product.is_banned ? 'No permitido' : 'Permitido' }}</span>
          </b-button>
          <b-button
            variant="primary"
            tag="a"
            class="btn-cart"
            :to="{ name: 'product-view', params: { id: product.id } }"
          >
            <feather-icon
              icon="EyeIcon"
              class="mr-50"
            />
            <span>Más detalles</span>
          </b-button>
        </div>
      </b-card>
    </section>

    <!-- Pagination -->
    <section>
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
  BFormRadioGroup, BFormRadio, BRow, BCol, BInputGroup, BInputGroupAppend,
  BFormInput, BCard, BCardBody, BLink, BImg, BCardText, BButton, BPagination, BBadge,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { watch } from '@vue/composition-api'
import { mapActions } from 'vuex'
import { useResponsiveAppLeftSidebarVisibility } from '@core/comp-functions/ui/app'
import NutriScore from '@/@core/components/NutriScore.vue'
import ShopLeftFilterSidebar from './ECommerceShopLeftFilterSidebar.vue'
import { useShopFiltersSortingAndPagination, useShopUi, useShopRemoteData } from './useECommerceShop'
import { useEcommerceUi } from '../useEcommerce'

export default {
  directives: {
    Ripple,
  },
  components: {
    // BSV
    BFormRadioGroup,
    BFormRadio,
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
      products, fetchProducts, categories, fetchCategories,
    } = useShopRemoteData()

    const { mqShallShowLeftSidebar } = useResponsiveAppLeftSidebarVisibility()

    // Wrapper Function for `fetchProducts` which can be triggered initially and upon changes of filters
    // eslint-disable-next-line
    const fetchShopProducts = _.debounce(function() {
      if (/^\d*$/.test(filters.value.q) && filters.value.q !== null && filters.value.q !== '') {
        fetchProducts({
          by_sku: filters.value.q || null,
          by_category: filters.value.categories || null,
          by_active_status: true,
          by_bracelet: ctx.root.$route.params.id || null,
          is_banned: ctx.root.$route.params.id || null,
          meta: {
            pagination: {
              page: filters.value.page,
              per_page: filters.value.perPage,
            },
          },
        })
          .then(response => {
            products.value = response.data.data
            totalProducts.value = response.data.meta.pagination.total_objects
          })
      } else if (filters.value.q !== null && filters.value.q !== '') {
        fetchProducts({
          by_name: filters.value.q || null,
          by_category: filters.value.categories || null,
          by_active_status: true,
          by_bracelet: ctx.root.$route.params.id || null,
          is_banned: ctx.root.$route.params.id || null,
          meta: {
            pagination: {
              page: filters.value.page,
              per_page: filters.value.perPage,
            },
          },
        })
          .then(response => {
            products.value = response.data.data
            totalProducts.value = response.data.meta.pagination.total_objects
          })
      } else if (filters.value.q === null || filters.value.q === '') {
        fetchProducts({
          by_active_status: true,
          by_category: filters.value.categories || null,
          by_bracelet: ctx.root.$route.params.id || null,
          is_banned: ctx.root.$route.params.id || null,
          meta: {
            pagination: {
              page: filters.value.page,
              per_page: filters.value.perPage,
            },
          },
        })
          .then(response => {
            products.value = response.data.data
            totalProducts.value = response.data.meta.pagination.total_objects
          })
      }
    }, 500)

    const fetchProductsCategories = () => {
      fetchCategories({
        by_active_status: true,
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
    ...mapActions('walleats', ['banItem']),
    ...mapActions('products', ['fetchProducts']),
    handleBanProduct(product) {
      this.banItem({
        bracelet_id: this.$route.params.id,
        banneable_id: product.id,
        banneable_type: 'Product',
        _delete: product.is_banned ? 'true' : 'false',
      })
        .then(() => {
          this.fetchProducts({
            by_active_status: true,
            by_bracelet: this.$route.params.id || null,
            is_banned: this.$route.params.id || null,
            meta: {
              pagination: {
                page: this.filters.page,
                per_page: this.filters.perPage,
              },
            },
          })
            .then(response => {
              this.products = response.data
            })
        })
    },
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
