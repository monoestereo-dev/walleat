<template>
  <div>
    <div
      v-if="userImg && bracelet_id"
      class="d-flex justify-content-center mt-2 mb-1"
    >
      <b-img
        thumbnail
        rounded
        :src="userImg"
        width="200"
      />
    </div>
    <div class="text-center">
      {{ nfcStatus }}
    </div>
    <div>
      <b-button
        v-if="!bracelet_id"
        block
        variant="primary"
        @click="readNfc()"
      >
        Escanear
      </b-button>
      <b-button-group
        v-else
        class="w-100"
      >
        <b-button
          variant="danger"
        >
          cancelar
        </b-button>
        <b-button
          variant="success"
        >
          Continuar
        </b-button>
      </b-button-group>
    </div>
  </div>
</template>

<script>
import {
  BButton,
  BImg,
  BButtonGroup,
} from 'bootstrap-vue'
import { mapActions } from 'vuex'
import { debounce } from 'lodash'

export default {
  components: {
    BButton,
    BImg,
    BButtonGroup,
  },
  data() {
    return {
      bracelet_id: null,
      nfcStatus: null,
      userImg: null,
    }
  },
  watch: {
    bracelet_id: debounce(function searchQuery(query) {
      if (query) {
        this.fetchWalleatByEnc(query)
          .then(response => {
            this.userImg = response.data.logo
          })
      } else {
        this.userImg = null
      }
    }, 250),
  },
  mounted() {
  },
  methods: {
    ...mapActions('walleats', [
      'fetchWalleatByEnc',
    ]),
    async readNfc() {
      this.nfcStatus = 'Scanning'
      try {
        // eslint-disable-next-line
        const ndef = new NDEFReader()
        await ndef.scan()

        ndef.addEventListener('readingerror', () => {
          this.nfcStatus = 'Argh! Cannot read data from the NFC tag. Try another one?'
        })

        // eslint-disable-next-line
        ndef.addEventListener('reading', ({ message, serialNumber }) => {
          const textDecoder = new TextDecoder()
          this.bracelet_id = textDecoder.decode(message.records[0].data).substring(textDecoder.decode(message.records[0].data).lastIndexOf('=') + 1)
          this.nfcStatus = 'Tag Readed'
        })
      } catch (error) {
        this.nfcStatus = 'No nfc'
      }
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
