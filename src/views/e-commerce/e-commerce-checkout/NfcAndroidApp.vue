<template>
  <div>
    <div
      v-if="userImg && braceletNumber"
      class="d-flex justify-content-center mt-2 mb-1"
    >
      <b-img
        thumbnail
        rounded
        :src="userImg"
        width="200"
      />
    </div>
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

    <div v-if="bannedItems.length">
      <h5 class="text-warning">
        Retira los siguientes productos de la orden para continuar.
      </h5>
      <product-card
        v-for="product in bannedItems"
        :key="`item-${product.id}`"
        :product="product"
      />
      <b-button
        class="mb-2"
        block
        @click="removeBannedProductsFromCart(bannedItems)"
      >
        Retirar productos
      </b-button>
    </div>

    <b-button
      v-if="!braceletNumber"
      block
      :href="`intent://scan-silent/${callback_encoded_url}/${encoded_android_app_room}/#Intent;scheme=extnfc;package=pl.icedev.nfc.external;end`"
      :variant="status ? 'warning':'primary'"
      class="text-center"
      :disabled="status || bannedItems.length > 0"
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

    <b-button-group
      v-if="braceletNumber"
      class="w-100"
    >
      <b-button
        variant="danger"
      >
        cancelar
      </b-button>
      <b-button
        variant="success"
        @click="completeSale()"
      >
        Continuar
      </b-button>
    </b-button-group>
  </div>
</template>

<script>
/* eslint-disable */
import { mapActions, mapMutations, mapGetters } from 'vuex'
import ProductCard from './ProductCard.vue'
import {
BButton,
BSpinner,
BBadge,
BImg,
BButtonGroup,
} from 'bootstrap-vue'

export default {
  components: {
    BButton,
    BSpinner,
    BBadge,
    BImg,
    BButtonGroup,    
    ProductCard,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      callback_encoded_url: null,
      encoded_android_app_room: null,
      roomId: null,
      braceletNumber: null,
      status: false,
      appResponse: null,
      userImg: null,
      bannedItems: []
    }
  },
  computed: {
    ...mapGetters('pos', [
      'cartTotal',
      'cartTotalProducts',
      'cart',
    ]),
  },
  mounted() {
    // const randomStr = Math.floor(Math.random()*16777215).toString(16)
    const randomStr = 'XYPDS23'
    this.roomId = randomStr
    this.callback_encoded_url = window.btoa('https://api.mywalleat.com/v1/android_app_callback')
    this.encoded_android_app_room = window.btoa(randomStr)

    this.connection = new WebSocket(
      `wss://api.mywalleat.com//cable?token=${this.userData.token}`,
    )
    sessionStorage.setItem('wsConnection', JSON.stringify(this.connection))
    this.connection.onmessage = event => {
      const messagex = JSON.parse(event.data)
      if (messagex && messagex.message && messagex.message.link_action) {
        const audio = new Audio(require('@/assets/sounds/Activate.wav'))
        audio.play()
        navigator.vibrate(200)
        const display_message = JSON.stringify(messagex.message.link_action)
        this.appResponse = null
        
        this.braceletNumber = (display_message).substring((display_message).lastIndexOf('=') + 1)
        this.fetchWalleatByEnc(this.braceletNumber)
          .then(response => {
            this.userImg = response.data.logo
          })
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
    ...mapActions('walleats', [
      'fetchWalleatByEnc',
    ]),
    waitForResponse() {
      this.appResponse = 'Esperando respuesta'
      this.status = true
      let waitx = setTimeout(() => {
        this.status = false
      }, 10000)
      waitx
    },
    ...mapActions('orders', [
      'addOrder',
    ]),
    ...mapActions('pos', [
      'emptyCart',
    ]),
    ...mapMutations('pos', [
      'deleteProductFromCarts',
    ]),
    completeSale() {
      const tempCart = []
      this.cart.forEach(product => {
        const refactorProduct = {
          store_product_id: product.id,
          units: product.units,
        }
        tempCart.push(refactorProduct)
      })
      const orderReady = {
        bracelet_number: this.braceletNumber,
        store_id: this.$route.params.store_id,
        payment_type: 'credit',
        order_store_products_attributes: tempCart,
      }
      this.addOrder({ order: orderReady, orderType: 'sell' })
        .then(() => {
          this.braceletNumber = null
          // eslint-disable-next-line
          const audio = new Audio(require('@/assets/sounds/Success.wav'))
          audio.play()
          this.$swal({
            title: 'Cobro exitoso!',
            text: 'Grácias.',
            icon: 'success',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
          this.cash = null
          this.emptyCart()
          this.$emit('prev-step')
        }).catch(error => {
          // eslint-disable-next-line
          const audio = new Audio(require('@/assets/sounds/Denied.wav'))
          audio.play()
          navigator.vibrate(200)
          this.bannedItems = error.response.data.banned_items
        })
    },
    removeBannedProductsFromCart(products) {
      products.forEach(product => {
        this.cart.forEach(prod => {
          if (prod.product_attributes.id === product.id) {
            this.deleteProductFromCarts(prod)
          }
        })
      })
      this.bannedItems = []
      if (this.cartTotalProducts === 0) {
        this.$emit('prev-step')
      }
    },

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
