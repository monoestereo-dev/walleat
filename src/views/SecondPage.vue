<template>
  <div class="d-flex align-items-center flex-column">
    <b-card
      bg-variant="white"
      style="max-width: 250px;"
      class="d-flex align-items-center justify-content-center"
    >
      <qriously value="Walleat test qrcode" :size="200" />
    </b-card>
    <b-card title="WalleatPay">
      <b-card-text>Muestra el codigo al cajero para que lo escanee</b-card-text>
    </b-card>
  </div>
</template>

<script>
import { BCard, BCardText } from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BCardText,
  },
}
</script>

<style>

</style>
