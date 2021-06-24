<template>
  <div>
    <b-table
      striped
      hover
      responsive
      :items="orders"
      :fields="salesFields"
      head-variant="primary"
      class="text-center"
    >
      <template
        #cell(name)="data"
        min-width="190px"
      >
        <div
          class="avatar-group"
          @click="showModal(data.item.order_store_products_attributes)"
        >
          <b-avatar-group
            v-if="data.item.order_store_products_attributes.length > 1"
            size="30px"
          >
            <b-avatar
              v-b-tooltip.hover
              v-for="(product, i) in data.item.order_store_products_attributes.slice(0, 5)"
              :id="`tooltip-product-info-${i}`"
              :key="`productInCart-${i}`"
              class="pull-up"
              :src="`https://api.mywalleat.com/${product.store_product_attributes.product_attributes.logo}`"
              :title="product.store_product_attributes.product_attributes.name"
            />
            <b-avatar
              v-if="data.item.order_store_products_attributes.length > 5"
              :id="`tooltip-product-info-+`"
              :key="`productInCart-+`"
              class="pull-up"
              text="+"
            />
          </b-avatar-group>
          <b-avatar
            v-else
            class="pull-up"
            size="30px"
            :src="`https://api.mywalleat.com/${data.item.order_store_products_attributes[0].store_product_attributes.product_attributes.logo}`"
          />
        </div>
      </template>
      <template #cell(total)="data">
        <div
          :class="
            data.item.order_type == 'buy' ? 'text-danger' : 'text-success'
          "
        >
          ${{ data.item.total }}
        </div>
      </template>
      <template #cell(createdAt)="data">
        {{ data.item.created_at | date }}
      </template>
    </b-table>
    <b-modal
      ref="saleDetails-modal"
      :title="$t('saleInfo')"
      size="lg"
      body-class="p-0"
    >
      <b-table
        :items="saleDetail"
        :fields="recieptFields"
        class="m-0"
        responsive
      >
        <template #cell(products)="data">
          <div class="d-flex">
            <b-img
              width="40"
              height="40"
              class="mr-1"
              rounded
              :src="`${apiUrl}${data.item.store_product_attributes.product_attributes.logo}`"
            />
            <b-link
              :to="{ name: 'product-view', params:{ id: data.item.store_product_attributes.product_attributes.id } }"
            >
              {{ data.item.store_product_attributes.product_attributes.name }}
            </b-link>
          </div>
        </template>
        <template #cell(unit_price)="data">
          ${{ data.value | money }}
        </template>
      </b-table>
    </b-modal>
  </div>
</template>

<script>
import {
  BAvatarGroup, BAvatar, BModal, BImg, BTable, BLink, VBTooltip,
} from 'bootstrap-vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    BAvatarGroup,
    BAvatar,
    BModal,
    BLink,
    BImg,
    BTable,
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  props: {
    orders: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      salesFields: [
        {
          key: 'name',
          label: this.$t('products'),
        },
        {
          key: 'total',
          label: this.$t('total'),
        },
        {
          key: 'createdAt',
          label: 'fecha',
        },
      ],
      recieptFields: [
        {
          key: 'products',
          label: this.$t('products'),
        },
        {
          key: 'units',
          label: this.$t('quantity'),
        },
        {
          key: 'unit_price',
          label: this.$t('productPrice'),
        },
      ],
      saleDetail: [],
    }
  },
  computed: {
    ...mapGetters(['apiUrl']),
  },
  methods: {
    showModal(cart) {
      this.saleDetail = cart
      this.$refs['saleDetails-modal'].show()
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
