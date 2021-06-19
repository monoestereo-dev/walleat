<template>
  <div>
    <swiper
      class="swiper-centered-slides p-1"
      :options="swiperOptions"
      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
    >
      <!-- slides -->
      <swiper-slide
        v-for="swipe in swiperData"
        :key="swipe.text"
        class="rounded swiper-shadow card"
      >
        <feather-icon
          :icon="swipe.icon"
          size="28"
        />
        <div class="swiper-text pt-md-1 pt-sm-50">
          {{ swipe.text }}
        </div>
      </swiper-slide>

      <!-- Add Arrows -->
      <div
        slot="button-next"
        class="swiper-button-next"
      />
      <div
        slot="button-prev"
        class="swiper-button-prev"
      />
    </swiper>
    <div class="m-fix">
      <grid-layout
        :layout.sync="layout"
        :col-num="12"
        :row-height="12"
        :is-draggable="true"
        :is-resizable="false"
        :is-mirrored="false"
        responsive
        :vertical-compact="true"
        :margin="[30, 30]"
        :use-css-transforms="true"
        auto-size
      >
        <grid-item
          v-for="widget in layout"
          :key="widget.i"
          :x="widget.x"
          :y="widget.y"
          :w="widget.w"
          :h="widget.h"
          :i="widget.i"
          :static="widget.static"
          preserve-aspect-ratio
        >
          <widget-example
            :widget-type="widget.id"
          />
        </grid-item>
      </grid-layout>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import VueGridLayout from 'vue-grid-layout'
import WidgetExample from '@/views/widgets/trade-widget/WidgetExample.vue'

export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    WidgetExample,
    Swiper,
    SwiperSlide,
  },
  setup() {
    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
    }
    return {
      perfectScrollbarSettings,
    }
  },
  data() {
    return {
      data: {},
      layout: [],
      swiperData: [
        { icon: 'GithubIcon', text: 'Getting Started' },
        { icon: 'FacebookIcon', text: 'Pricing & Plans' },
        { icon: 'TwitterIcon', text: 'Sales Question' },
        { icon: 'InstagramIcon', text: 'Usage Guides' },
        { icon: 'GitlabIcon', text: 'General Guide' },
      ],
      swiperOptions: {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 30,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    }
  },
  beforeCreate() {
    // data
    this.$http.get('/widgets')
      .then(response => {
        this.layout = response.data
        console.log(response.data.filter(x => x.id === 'usdmxn'))
      })
  },
  methods: {
    addItem() {
      // Add a new item. It must have a unique key!
      this.layout.push({
        x: (this.layout.length * 2) % (this.colNum || 12),
        y: this.layout.length + (this.colNum || 12), // puts it at the bottom
        w: 2,
        h: 2,
        i: this.index,
      })
      // Increment the counter to ensure key is always unique.
      this.index += 1
    },
    removeItem(val) {
      const index = this.layout.map(item => item.i).indexOf(val)
      this.layout.splice(index, 1)
    },
  },
}
</script>
<style lang="scss">
@import '@core/scss/vue/pages/dashboard-ecommerce.scss';
@import '@core/scss/vue/libs/chart-apex.scss';

.m-fix{
  margin: -30px -30px 0 -30px;
}
</style>
