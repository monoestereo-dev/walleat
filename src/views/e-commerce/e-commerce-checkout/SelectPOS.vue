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
          <div class="d-flex justify-content-center mt--5 mb-1">
            <b-avatar
              :src="`${store.role_resource_logo}`"
              size="lg"
              @click="$router.push({ name: 'POS', params: { store_id: store.role_resource_id } })"
            />
          </div>
          <div
            class="store-name"
            @click="$router.push({ name: 'POS', params: { store_id: store.role_resource_id } })"
          >
            {{ store.role_resource_name }}
          </div>
          <open-close-store
            :store="store"
            class="mt-2"
          />
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BCard, BRow, BCol, BAvatar,
} from 'bootstrap-vue'
import OpenCloseStore from './StoresButtonOpenClose.vue'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BAvatar,
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
