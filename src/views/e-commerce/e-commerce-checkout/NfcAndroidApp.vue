<template>
  <div>
    <div
      v-if="appResponse"
      class="d-flex justify-content-center p-1"
    >
      <b-badge
        variant="light-warning"
      >
        {{ appResponse }}
      </b-badge>
    </div>
    <b-button
      block
      :href="`intent://scan-silent/${callback_encoded_url}/${encoded_android_app_room}=/#Intent;scheme=extnfc;package=pl.icedev.nfc.external;end`"
      :variant="status ? 'warning':'primary'"
      class="text-center"
      :disabled="status"
      @click="waitForResponse"
    >
      <span v-if="!status">
        Continuar
      </span>
      <b-spinner
        v-else
        small
        label="Loading..."
      />
    </b-button>
  </div>
</template>

<script>
/* eslint-disable */
import {
BButton,
BSpinner,
BBadge,
} from 'bootstrap-vue'

export default {
  components: {
    BButton,
    BSpinner,
    BBadge,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      callback_encoded_url: null,
      encoded_android_app_room: null,
      braceletNumber: '',
      status: false,
      appResponse: null,
    }
  },
  mounted() {
    const randomStr = Math.floor(Math.random()*16777215).toString(16)
    this.callback_encoded_url = window.btoa('https://api.mywalleat.com/v1/android_app_callback')
    this.encoded_android_app_room = window.btoa(randomStr)

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
      console.log('Successfully connected to the echo websocket server...')

      this.connection.send(
        JSON.stringify({
          command: 'subscribe',
          identifier: `{"channel":"ApplicationCable::AndroidAppChannel", "android_app_room":"${this.roomId}"}`,
        }),
      )
    }
  },
  methods: {
    waitForResponse() {
      this.appResponse = 'Esperando respuesta'
      this.status = true
      let waitx = setTimeout(() => {
        this.status = false
        this.appResponse = 'Sin respuesta'
      }, 10000)
      waitx
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
