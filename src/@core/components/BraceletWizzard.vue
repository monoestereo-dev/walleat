<template>
  <b-card
    v-if="data"
    class="card-congratulation-medal"
  >
    <h5>
      ¡Agrega tu primer Walleat!
    </h5>
    <b-card-text class="font-small-3">
      Tu nueva experiencia de pago.
    </b-card-text>
    <b-button
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      class="mt-1"
      variant="primary"
      :to="{ name: 'walleat-new' }"
    >
      Continua aquí!
      <feather-icon
        icon="ArrowRightIcon"
      />
    </b-button>
    <b-img
      :src="require('@/assets/images/logo/walleat_thumbnail_white.svg')"
      class="congratulation-medal"
      alt="Medal Pic"
      width="80"
    />
  </b-card>
</template>

<script>
import {
  BCard, BCardText, BButton, BImg,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { kFormatter } from '@core/utils/filter'

export default {
  components: {
    BCard,
    BCardText,
    BImg,
    BButton,
  },
  directives: {
    Ripple,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    kFormatter,
  },
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
