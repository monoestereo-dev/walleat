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

      <span class="float-md-right d-none d-md-block">Hand-crafted &amp; Made with
        <feather-icon
          icon="HeartIcon"
          size="21"
          class="text-danger stroke-current"
        />
      </span>
    </p>
    <menu-bottom-mobile class="d-block d-sm-none" />
  </div>
</template>

<script>
import { $themeConfig } from '@themeConfig'
import { BLink } from 'bootstrap-vue'
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
    MenuBottomMobile,
  },
}
</script>
