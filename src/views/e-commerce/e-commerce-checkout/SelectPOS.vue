<template>
  <div>
    <b-row
      class="mt-2"
    >
      <b-col
        v-for="store in stores"
        :key="store.id"
        cols="6"
        sm="6"
        md="4"
        lg="3"
      >
        <b-card
          class="mt-1 text-center"
          @click="$router.push({ name: 'POS', params: { store_id: store.role_resource_id } })"
        >
          <div class="d-flex justify-content-center mt--5 mb-1">
            <b-avatar
              :src="`${store.role_resource_logo}`"
              size="lg"
            />
          </div>
          <div
            class="store-name"
          >
            {{ store.role_resource_name }}
          </div>

        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BCard, BRow, BCol, BAvatar,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BAvatar,
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
