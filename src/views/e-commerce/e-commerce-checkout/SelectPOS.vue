<template>
  <div>
    <b-row
      class="mt-2"
    >
      <b-col
        v-for="store in stores.filter(x => x.role_resource_type === 'Store')"
        :key="store.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <b-card
          class="mt-1 text-center"
        >
          <div
            class="d-flex justify-content-center mt--5 mb-1"
          >
            <b-avatar
              :src="`${store.role_resource_logo}`"
              size="85"
              :to="{ name: 'POS', params: { store_id: store.role_resource_id } }"
            />
          </div>
          <b-link
            class="store-name"
            :to="{ name: 'POS', params: { store_id: store.role_resource_id } }"
          >
            <h2>
              {{ store.role_resource_name }}
            </h2>
          </b-link>
          <b-button
            size="lg"
            variant="primary"
            class="my-2"
            :to="{ name: 'POS', params: { store_id: store.role_resource_id } }"
          >
            <i class="fas fa-cash-register mr-1" />
            Punto de venta
          </b-button>
          <open-close-store
            :store="store"
            class="mt-1"
          />
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BAvatar,
  BLink,
  BButton,
} from 'bootstrap-vue'
import OpenCloseStore from './StoresButtonOpenClose.vue'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BAvatar,
    BLink,
    BButton,
    OpenCloseStore,
  },
  data() {
    return {
      stores: [],
      userData: JSON.parse(localStorage.getItem('userData')),
    }
  },
  beforeMount() {
    this.stores = this.userData.scoped_roles
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
.mt--5 {
  margin-top: -3rem;
}
.store-name {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.3rem;
  font-weight: 600;
}
</style>
