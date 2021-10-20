<template>
  <b-card
    class="ecommerce-card mb-1"
    no-body
  >
    <!-- Product Image -->
    <div class="d-flex align-items-center justify-content-center p-1">
      <b-link>
        <b-img
          :src="product.product_attributes.logo"
          :alt="`${product.product_attributes.name}-${product.id}`"
          width="100"
        />
      </b-link>
    </div>

    <!-- Product Details: Card Body -->
    <b-card-body>
      <div class="item-name">
        <h6 class="mb-0">
          <b-link class="text-body">
            {{ product.product_attributes.name }}
          </b-link>
        </h6>
        <div class="item-rating">
          {{ product.product_attributes.variant }}
        </div>
      </div>
      <span class="text-success mb-1">${{ product.unit_price | money }}</span>
      <div class="item-quantity">
        <span class="quantity-title">Qty:</span>
        <b-input-group
          class="mx-1 d-flex unitsField"
          size="sm"
        >
          <b-input-group-prepend>
            <b-button
              variant="outline-secondary"
              @click="decrementProductQuantity(product)"
            >
              <i class="fas fa-minus" />
            </b-button>
          </b-input-group-prepend>
          <b-form-input
            v-model="product.units"
            class="text-center"
          />
          <b-input-group-append>
            <b-button
              variant="outline-secondary"
              @click="incrementProductQuantity(product)"
            >
              <i class="fas fa-plus" />
            </b-button>
          </b-input-group-append>
        </b-input-group>
        <i
          class="fas fa-weight fa-2x cursor-pointer"
          @click="weightProductAndSetUnits(product)"
        />
      </div>
    </b-card-body>

    <!-- Product Options/Actions -->
    <div class="item-options text-center">
      <div class="item-wrapper">
        <div class="item-cost">
          <h4 class="item-price">
            ${{ product.unit_price * product.units | money }}
          </h4>
          <p
            v-if="product.hasFreeShipping"
            class="card-text shipping"
          >
            <b-badge
              pill
              variant="light-success"
            >
              Free Shipping
            </b-badge>
          </p>
        </div>
      </div>
      <b-button
        variant="light"
        class="mt-1 remove-wishlist"
        @click="handleDeleteProductFromCarts(product)"
      >
        <feather-icon
          icon="XIcon"
          class="mr-50"
        />
        <span>Borrar</span>
      </b-button>
    </div>
    <b-modal
      :ref="`bascula-${product.id}`"
      @ok="product.units = Number(scaleValue).toFixed(3)"
      @cancel="scaleValue = String(product.units)"
    >
      <div class="display-2 text-right scaleDisplay">
        {{ scaleValue }}
      </div>
      <div class="numpad">
        <div
          v-for="n in 9"
          :key="`btn-${n}`"
          v-ripple
          class="btn"
          @click="typeNum(`${n}`)"
        >
          {{ n }}
        </div>
        <div
          v-ripple
          class="btn"
          @click="typeDot('.')"
        >
          .
        </div>
        <div
          v-ripple
          class="btn"
          @click="typeNum('0')"
        >
          0
        </div>
        <div
          v-ripple
          class="btn"
          @click="delNum()"
        >
          <i class="fas fa-backspace" />
        </div>
      </div>
    </b-modal>
  </b-card>
</template>

<script>
import {
  BCard, BCardBody, BLink, BImg, BButton, BBadge, BFormInput, BInputGroup, BInputGroupAppend, BInputGroupPrepend, BModal,
} from 'bootstrap-vue'
import store from '@/store'
import Ripple from 'vue-ripple-directive'
import { ref } from '@vue/composition-api'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { formatDate } from '@core/utils/filter'
import { useEcommerce, useEcommerceUi } from '../useEcommerce'

export default {
  directives: {
    Ripple,
  },
  components: {
    BCard, BCardBody, BLink, BImg, BButton, BBadge, BFormInput, BInputGroup, BInputGroupAppend, BInputGroupPrepend, BModal,
  },
  setup() {
    const products = ref([])

    const { toggleProductInWishlist } = useEcommerceUi()
    const { removeProductFromCart } = useEcommerce()
    const removeProductFromCartClick = product => {
      removeProductFromCart(product.id)
        .then(() => {
          const productIndex = products.value.findIndex(p => p.id === product.id)
          products.value.splice(productIndex, 1)

          store.commit('app-ecommerce/UPDATE_CART_ITEMS_COUNT', products.value.length)
        })
    }

    // const fetchCartProducts = () => {
    //   store.dispatch('app-ecommerce/fetchCartProducts')
    //     .then(response => {
    //       this.products.value = response.data.products
    //     })
    // }
    // fetchCartProducts()

    return {
      products,

      // UI
      toggleProductInWishlist,
      removeProductFromCartClick,

      // Filter
      formatDate,
    }
  },
  props: {
    product: {
      type: Object,
      default: () => ({
        id: '',
        unit_price: 0,
        units: 0,
        product_attributes: {
          id: '',
          name: '',
          variant: '',
        },
      }),
    },
  },
  data() {
    return {
      scaleValue: '',
    }
  },
  computed: {
    ...mapGetters('pos', ['cart']),
    ...mapGetters('weight', ['weight']),
  },
  methods: {
    ...mapActions('weight', ['getWeight']),
    ...mapMutations('pos', [
      'deleteProductFromCarts',
      'incrementProductQuantity',
      'decrementProductQuantity',
      'setProductQuantity',
    ]),
    handleDeleteProductFromCarts(product) {
      // eslint-disable-next-line
      const audio = new Audio(require('@/assets/sounds/Remove.mp3'))
      audio.play()
      this.deleteProductFromCarts(product)
    },
    weightProductAndSetUnits(product) {
      this.getWeight()
        .then(() => {
          // eslint-disable-next-line
          const audio = new Audio(require('@/assets/sounds/Pop.wav'))
          audio.play()
          setTimeout(() => {
            const x = this.weight.replace(/[^\d.-]/g, '')
            this.setProductQuantity({
              cartItem: product,
              units: Number(x),
            })
          }, 250)
        })
        .catch(() => {
          this.$refs[`bascula-${this.product.id}`].show()
        })
    },
    typeNum(val) {
      if (this.scaleValue.includes('.')) {
        const dotPosition = this.scaleValue.split('.')
        console.log(dotPosition)
        if (dotPosition[1].length <= 2) {
          this.scaleValue += val
        }
      } else if (val === '0' && this.scaleValue === '') {
        this.scaleValue = '0.'
      } else {
        this.scaleValue += val
      }
    },
    delNum() {
      this.scaleValue = this.scaleValue.slice(0, -1)
    },
    typeDot() {
      if (!this.scaleValue.includes('.')) {
        if (this.scaleValue === '') {
          this.scaleValue += '0.'
        } else {
          this.scaleValue += '.'
        }
      }
    },
  },
}
</script>

<style lang="scss">
.unitsField{
  width: 140px;
}

.numpad {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5px;
  .btn{
    font-size: 2rem;
    font-weight: 800;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: rgba(white, 0.02);
    border-radius: 10px;
  }
}
.scaleDisplay{
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: rgba(white, 0.02);
  border-radius: 10px;
  padding: .5rem;
  margin-bottom: 1rem;
  overflow: hidden;
}
</style>
