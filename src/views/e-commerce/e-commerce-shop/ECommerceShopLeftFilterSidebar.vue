<template>
  <div class="sidebar-detached sidebar-left">
    <div class="sidebar">
      <div
        class="sidebar-shop"
        :class="{'show': mqShallShowLeftSidebar}"
      >
        <b-row>
          <b-col cols="12">
            <h6 class="filter-heading d-none d-lg-block">
              Filtros
            </h6>
          </b-col>
        </b-row>

        <!-- Filters' Card -->
        <b-card>

          <!-- Price Slider -->
          <!-- <div class="price-slider">
            <h6 class="filter-title mt-0">
              Rango de precio
            </h6>
            <vue-slider
              v-model="filters.priceRange"
              :direction="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            />
          </div> -->

          <!-- Categories -->
          <div class="product-categories">
            <h6 class="filter-title mt-0">
              Categorías
            </h6>
            <b-form-checkbox-group
              v-model="filters.categories"
              class="categories-radio-group"
              stacked
              :options="categories"
              text-field="name"
              value-field="id"
            />
          </div>

          <!-- ToDo agregar funcionalidad a el reporte de score nutrimentales -->
          <div
            v-if="false"
            class="ratings"
          >
            <h6 class="filter-title">
              Score nutrimental
            </h6>
            <div
              v-for="(rating, n) in filterOptions.ratings"
              :key="rating.rating"
              class="ratings-list"
            >
              <b-link>
                <div class="d-flex">
                  <nutri-score :nutritional-info="n" />
                </div>
              </b-link>
              <div class="stars-received">
                <span>{{ rating.count }}</span>
              </div>
            </div>
          </div>
        </b-card>
      </div>
    </div>

    <div
      class="body-content-overlay"
      :class="{'show': mqShallShowLeftSidebar}"
      @click="$emit('update:mq-shall-show-left-sidebar', false)"
    />
  </div>
</template>

<script>
import {
  BRow, BCol, BCard, BFormCheckboxGroup, BLink,
} from 'bootstrap-vue'
// import VueSlider from 'vue-slider-component'
import NutriScore from '@/@core/components/NutriScore.vue'

export default {
  components: {
    BRow,
    BCol,
    BFormCheckboxGroup,
    BLink,
    BCard,
    NutriScore,
    // 3rd Party
    // VueSlider,
  },
  props: {
    filters: {
      type: Object,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
    filterOptions: {
      type: Object,
      required: true,
    },
    mqShallShowLeftSidebar: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-slider.scss';
</style>

<style lang="scss" scoped>
.categories-radio-group,
.brands-radio-group,
.price-range-defined-radio-group {
    ::v-deep > .custom-control {
    margin-bottom: 0.75rem;
  }
}
</style>
