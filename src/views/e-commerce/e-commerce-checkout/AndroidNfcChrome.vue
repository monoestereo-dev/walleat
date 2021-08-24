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
    <div
      v-if="nfcStatus"
      class="d-flex justify-content-center"
    >
      <b-badge variant="light-warning my-1">
        {{ nfcStatus }}
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
          :disabled="bannedItems.length > 0"
          @click="completeSale()"
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
  BBadge,
} from 'bootstrap-vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { debounce } from 'lodash'
import ProductCard from './ProductCard.vue'

export default {
  components: {
    BButton,
    BImg,
    BButtonGroup,
    ProductCard,
    BBadge,
  },
  data() {
    return {
      bracelet_id: null,
      nfcStatus: null,
      userImg: null,
      bannedItems: [],
    }
  },
  computed: {
    ...mapGetters('pos', [
      'cartTotal',
      'cartTotalProducts',
      'cart',
    ]),
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
          // eslint-disable-next-line
          const audio = new Audio(require('@/assets/sounds/Activate.wav'))
          audio.play()
          navigator.vibrate(200)
          const textDecoder = new TextDecoder()
          this.bracelet_id = textDecoder.decode(message.records[0].data).substring(textDecoder.decode(message.records[0].data).lastIndexOf('=') + 1)
          this.nfcStatus = null
        })
      } catch (error) {
        this.nfcStatus = 'Error: No NFC'
      }
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
        bracelet_number: this.bracelet_id,
        store_id: this.$route.params.store_id,
        payment_type: 'credit',
        order_store_products_attributes: tempCart,
      }
      this.addOrder({ order: orderReady, orderType: 'sell' })
        .then(() => {
          this.bracelet_id = null
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
}
</script>

<style lang="scss" scoped>

</style>
