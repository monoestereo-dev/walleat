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
      <b-card-text>Muestra el codigo al cajero</b-card-text>
      <b-card-text>Chocolate sesame snaps pie carrot cake pastry pie lollipop muffin. Carrot cake dragée chupa chups jujubes. Macaroon liquorice cookie wafer tart marzipan bonbon. Gingerbread jelly-o dragée chocolate.</b-card-text>
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
