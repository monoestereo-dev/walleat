<template>
  <div>
    <b-card v-if="nfc">
      <b-row class="mb-2">
        <b-col class="text-center">
          <h1 class="">
            Escanear Walleat
          </h1>
          <p>
            acerca el Walleat a tu dispositivo con NFC
          </p>
          <div>
            <b-img
              src="https://thumbs.gfycat.com/LawfulWavyIlsamochadegu-small.gif"
              width="200"
              rounded
            />
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col
          cols="12"
          class="mb-2 text-center"
        >
          <h5 class="mb-0">
            ¿No tienes NFC?
          </h5>
          <small>
            no te preocupes, puedes continuar agregándolo manualmente
          </small>
          <div>
            <b-button
              size="sm"
              variant="outline-secondary"
              class="mt-1"
              @click="nfc = !nfc"
            >
              Continuar sin NFC
            </b-button>
          </div>
        </b-col>
      </b-row>
    </b-card>
    <walleat-new-form-wizzard v-else />
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BImg,
  BButton,
} from 'bootstrap-vue'
import WalleatNewFormWizzard from '@/views/walleats/walleat-new/WalleatNewFormWizzard.vue'

export default {
  components: {
    WalleatNewFormWizzard,
    BCard,
    BRow,
    BCol,
    BImg,
    BButton,
  },
  data() {
    return {
      nfc: true,
    }
  },
  mounted() {
    if (this.$route.query.enc) {
      this.nfc = false
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
