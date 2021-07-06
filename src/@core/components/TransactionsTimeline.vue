<template>
  <b-card no-body>
    <b-card-header>
      <div class="d-flex align-items-center">
        <feather-icon
          size="24"
          class="mr-1"
          icon="ListIcon"
        />
        <b-card-title class="ml-25">
          Últimos Movimientos
        </b-card-title>
      </div>
      <feather-icon
        icon="MoreVerticalIcon"
        size="18"
      />
    </b-card-header>

    <!-- timeline -->
    <b-card-body>
      <app-timeline v-if="orders.length">
        <app-timeline-item
          v-for="order in orders"
          :key="order.id"
          :variant="order.order_type === 'sell' ? 'success' : 'danger'"
        >
          <b-link
            :to="{ name: 'order-view', params:{ id: order.id } }"
          >
            <div class="d-flex justify-content-between flex-row mb-0">
              <div>
                <h6 class="mb-0">
                  <span class="text-success">
                    $ {{ order.total | money }}
                  </span>
                  - {{ order.order_store_products_attributes[0].store_product_attributes.store_attributes.name }}
                </h6>
                <p class="text-muted">
                  {{ order.payment_type }}
                </p>
              </div>
              <small class="timeline-item-time text-nowrap text-muted ml-1">{{ order.created_at | dateNtime }}</small>
            </div>
            <b-avatar-group
              v-if="order.order_store_products_attributes.length > 1"
              size="30px"
            >
              <b-avatar
                v-for="(product, i) in order.order_store_products_attributes.slice(0, 5)"
                :id="`tooltip-product-info-${i}`"
                :key="`productInCart-${i}`"
                v-b-tooltip.hover
                class="pull-up"
                :src="`https://api.mywalleat.com/${product.store_product_attributes.product_attributes.logo}`"
                :title="product.store_product_attributes.product_attributes.name"
              />
              <b-avatar
                v-if="order.order_store_products_attributes.length > 5"
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
              :src="`https://api.mywalleat.com/${order.order_store_products_attributes[0].store_product_attributes.product_attributes.logo}`"
            />
          </b-link>
        </app-timeline-item>

      </app-timeline>
      <!--/ timeline -->
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardBody, BCardHeader, BCardTitle, BAvatar, BAvatarGroup, VBTooltip, BLink,
} from 'bootstrap-vue'
import AppTimeline from '@core/components/app-timeline/AppTimeline.vue'
import AppTimelineItem from '@core/components/app-timeline/AppTimelineItem.vue'
/* eslint-disable global-require */
export default {
  components: {
    BCard,
    BCardBody,
    BCardHeader,
    BCardTitle,
    AppTimeline,
    AppTimelineItem,
    BAvatar,
    BAvatarGroup,
    BLink,
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
      avatars: [
        { userImg: require('@/assets/images/portrait/small/avatar-s-9.jpg'), name: 'Billy Hopkins' },
        { userImg: require('@/assets/images/portrait/small/avatar-s-6.jpg'), name: 'Amy Carson' },
        { userImg: require('@/assets/images/portrait/small/avatar-s-8.jpg'), name: 'Brandon Miles' },
        { userImg: require('@/assets/images/portrait/small/avatar-s-7.jpg'), name: 'Daisy Weber' },
        { userImg: require('@/assets/images/portrait/small/avatar-s-20.jpg'), name: 'Jenny Looper' },
      ],
    }
  },
}
</script>
