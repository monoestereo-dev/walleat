<template>
  <div
    id="menu-bottom-menu"
    class="d-flex justify-content-around align-items-center menu-shadow"
  >
    <b-link
      v-ripple
      :to="{ name: 'home' }"
    >
      <feather-icon
        size="24"
        icon="UserIcon"
      />
    </b-link>
    <b-link
      v-ripple
      class="qr-icon text-light"
      :to="{ name: 'walleat-pay' }"
    >
      <feather-icon
        size="24"
        icon="CpuIcon"
      />
    </b-link>
    <b-link
      v-ripple
      :to="{ name: 'walleats-list' }"
    >
      <feather-icon
        size="24"
        icon="DollarSignIcon"
      />
    </b-link>
  </div>
</template>

<script>
import { BLink } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  directives: {
    Ripple,
  },
  components: {
    BLink,
  },
}
</script>

<style lang="scss" scoped>
// Color palettes
@import '~@core/scss/base/core/colors/palette-variables.scss';

#menu-bottom-menu {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 50px;
  background: #283046;
  box-shadow: 0 4px 24px 0 rgba(#000, 0.75);
  z-index: 10;
}
.qr-icon {
  $size: 55px;
  display: flex;
  justify-content: center;
  box-shadow: 0 4px 24px 0 rgba(#000, 0.5);
  align-items: center;
  background: $warning;
  margin-bottom: 2rem;
  width: $size;
  height: $size;
  border-radius: 2rem;
}
</style>
