<template>
  <div>
    {{ nfcStatus }}
    <b-button @click="readNfc()">
      NFC
    </b-button>
  </div>
</template>

<script>
import { BButton } from 'bootstrap-vue'

export default {
  components: {
    BButton,
  },
  data() {
    return {
      bracelet_id: null,
      nfcStatus: null,
    }
  },
  mounted() {
  },
  methods: {
    async readNfc() {
      this.paymentType = 'credit'
      this.nfcStatus = 'Scanning'
      try {
        // eslint-disable-next-line
        const ndef = new NDEFReader()
        await ndef.scan()
        console.log('> Scan started')

        ndef.addEventListener('readingerror', () => {
          console.log('Argh! Cannot read data from the NFC tag. Try another one?')
          this.nfcStatus = 'Argh! Cannot read data from the NFC tag. Try another one?'
        })

        ndef.addEventListener('reading', ({ message, serialNumber }) => {
          console.log(`> Serial Number: ${serialNumber}`)
          const textDecoder = new TextDecoder()
          this.bracelet_id = textDecoder.decode(message.records[0].data).substring(textDecoder.decode(message.records[0].data).lastIndexOf('=') + 1)
          this.nfcStatus = 'Tag Readed'
        })
      } catch (error) {
        console.log(`Argh! ${error}`)
        this.nfcStatus = 'No nfc'
      }
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
