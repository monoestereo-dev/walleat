<template>
  <section class="app-ecommerce-details">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="product === undefined"
    >
      <h4 class="alert-heading">
        Error fetching product data
      </h4>
      <div class="alert-body">
        No item found with this item slug. Check
        <b-link
          class="alert-link"
          :to="{ name: 'apps-e-commerce-shop'}"
        >
          Shop
        </b-link>
        for other items.
      </div>
    </b-alert>

    <!-- Content -->
    <b-card
      v-if="product"
      no-body
    >
      <b-card-body>
        <b-row class="my-2">

          <!-- Left: Product Image Container -->
          <b-col
            cols="12"
            md="5"
            lg="4"
            class="d-flex align-items-center justify-content-center mb-2 mb-md-0"
          >
            <div class="d-flex align-items-center justify-content-center">
              <b-img
                :src="`${apiUrl}${product.logo}`"
                :alt="`Image of ${product.name}`"
                class="product-img"
                rounded
                fluid
              />
            </div>
          </b-col>

          <!-- Right: Product Details -->
          <b-col
            cols="12"
            md="7"
            lg="8"
          >

            <!-- Product Name -->
            <h4>{{ product.name }}</h4>

            <!-- Product Brand -->
            <b-card-text class="item-company mb-0">
              <b-link class="company-name">
                {{ product.variant }}
              </b-link>
            </b-card-text>

            <!-- Price And Ratings -->
            <div class="d-flex align-items-center my-1">
              <h1
                v-if="false"
                class="item-price mr-1"
              >
                $ 500
              </h1>
              <div class="ecommerce-details-price d-flex flex-wrap">
                <nutri-score :nutritional-info="product.nutritional_info" />
              </div>
            </div>

            <!-- Avability -->
            <b-card-text>Producto - <span :class="product.active_status? 'text-success' : 'text-danger'">{{ product.active_status ? 'Activo' : 'Desactivado' }}</span></b-card-text>

            <!-- Product Description -->
            <b-card-text>{{ product.description }}</b-card-text>

            <hr>

            <!-- Colors -->
            <div class="product-color-options">
              <h6>Categorias</h6>
              <ul class="list-unstyled mb-0">
                <li
                  v-for="category in product.categories_names"
                  :key="`category-${category.id}`"
                  class="d-inline-block"
                >
                  <b-badge>{{ category }}</b-badge>
                </li>
              </ul>
            </div>

            <hr>

            <div class="d-flex flex-column flex-sm-row pt-1">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                class="btn-cart mr-0 mr-sm-1 mb-1 mb-sm-0"
                @click="handleCartActionClick(product)"
              >
                <feather-icon
                  icon="ShoppingCartIcon"
                  class="mr-50"
                />
                <span>{{ product.isInCart ? 'View In Cart' : 'Add to Cart' }}</span>
              </b-button>
              <b-button
                variant="outline-secondary"
                class="btn-wishlist mr-0 mr-sm-1 mb-1 mb-sm-0"
                @click="toggleProductInWishlist(product)"
              >
                <feather-icon
                  icon="HeartIcon"
                  class="mr-50"
                  :class="{'text-danger': product.isInWishlist}"
                />
                <span>Wishlist</span>
              </b-button>
              <b-dropdown
                variant="outline-secondary"
                no-caret
                toggle-class="btn-icon"
                class="btn-share"
                right
              >
                <template #button-content>
                  <feather-icon icon="Share2Icon" />
                </template>
                <b-dropdown-item
                  v-for="icon in [ 'FacebookIcon', 'TwitterIcon', 'YoutubeIcon', 'InstagramIcon', ]"
                  :key="icon"
                >
                  <feather-icon :icon="icon" />
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </b-col>
        </b-row>
      </b-card-body>

      <!-- Static Content -->
      <e-commerce-product-details-item-features />

      <!-- Static Content -->
      <!-- Slider: Related Products -->
      <e-commerce-product-details-related-products />
    </b-card>
  </section>
</template>

<script>
import {
  BCard, BCardBody, BRow, BCol, BImg, BCardText, BLink, BButton, BDropdown, BDropdownItem, BAlert, BBadge,
} from 'bootstrap-vue'
import { mapGetters } from 'vuex'
import NutriScore from '@/@core/components/NutriScore.vue'
import Ripple from 'vue-ripple-directive'

export default {
  directives: {
    Ripple,
  },
  components: {
    // BSV
    BCard,
    BCardBody,
    BRow,
    BCol,
    BImg,
    BCardText,
    BLink,
    BButton,
    BDropdown,
    BDropdownItem,
    BAlert,
    BBadge,

    NutriScore,

  },
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  setup() {

  },
  computed: {
    ...mapGetters(['apiUrl']),
  },
}
</script>

<style lang="scss">
@import "~@core/scss/base/pages/app-ecommerce-details.scss";
</style>
