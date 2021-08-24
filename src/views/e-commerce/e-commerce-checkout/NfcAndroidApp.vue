<template>
  <div>
    <b-button
      block
      :href="`intent://scan/aHR0cHM6Ly9pY2VkZXYucGwvbmZjY2I=/#Intent;scheme=extnfc;package=pl.icedev.nfc.external;end;S.android_app_room=${roomId}`"
      variant="primary"
      class="text-center"
    >
      Continuar
    </b-button>
  </div>
</template>

<script>
/* eslint-disable */
import {
BButton,
} from 'bootstrap-vue'

export default {
  components: {
    BButton,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      roomId: null,
    }
  },
  mounted() {
    this.roomId = Date.now()

    this.connection = new WebSocket(
      `wss://api.mywalleat.com//cable?token=${this.userData.token}`,
    )
    sessionStorage.setItem('wsConnection', JSON.stringify(this.connection))
    this.connection.onmessage = event => {
      const messagex = JSON.parse(event.data)
      if (messagex && messagex.message && messagex.message.display_message) {
        const display_message = JSON.stringify(messagex.message.display_message)
        console.log(display_message)
      }
    }
    this.connection.onopen = event => {
      // console.log('Successfully connected to the echo websocket server...')

      this.connection.send(
        JSON.stringify({
          command: 'subscribe',
          identifier: `{"channel":"ApplicationCable::MyChannel", "android_app_room": ${this.roomId}}`,
        }),
      )
    }
  },
  destroyed() {
    this.connection.send(
      JSON.stringify({
        command: 'unsubscribe',
        identifier: `{"channel":"ApplicationCable::MyChannel", "android_app_room": ${this.roomId}}`,
      }),
    )
  },
}
</script>

<style lang="scss" scoped>

</style>
