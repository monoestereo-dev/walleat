<template>
  <div>
    <p class="clearfix mb-0 d-none d-sm-block">
      <span class="float-md-left d-block d-md-inline-block mt-25">
        COPYRIGHT  © {{ new Date().getFullYear() }}
        <b-link
          class="ml-25"
          href="https://mywalleat.com"
          target="_blank"
        >{{ appName }}</b-link>
        <span class="d-none d-sm-inline-block">, All rights Reserved</span>
      </span>

      <span class="float-md-right d-none d-md-block text-muted">powered by
        <b-img
          :src="require('@/assets/images/logo/logoMonoestereo.svg')"
          width="20px"
          style="margin-left: 5px; opacity: 0.5"
        />
      </span>
    </p>
    <menu-bottom-mobile
      v-if="userData.role_name === 'customer'"
      class="d-block d-md-none"
    />
  </div>
</template>

<script>
import { $themeConfig } from '@themeConfig'
import { BLink, BImg } from 'bootstrap-vue'
import MenuBottomMobile from '@core/components/MenuBottomMobile.vue'

export default {
  setup() {
    const { appName } = $themeConfig.app
    return {
      appName,
    }
  },
  components: {
    BLink,
    BImg,
    MenuBottomMobile,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
    }
  },
}
</script>
