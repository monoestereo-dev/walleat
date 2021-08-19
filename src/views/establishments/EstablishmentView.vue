<template>
  <div>
    <b-row
      class="mt-2"
    >
      <b-col
        v-for="store in establishment.stores_attributes"
        :key="store.id"
        cols="6"
        sm="6"
        md="4"
        lg="3"
      >
        <b-card
          class="mt-1 text-center"
          @click="$router.push({ name: 'POS', params: { store_id: store.id } })"
        >
          <div class="d-flex justify-content-center mt--5 mb-1">
            <b-avatar
              :src="`${store.logo}`"
              size="lg"
            />
          </div>
          <div
            class="store-name"
          >
            {{ store.name }}
          </div>
          <div
            class="d-flex align-items-center justify-content-center"
          >
            <feather-icon
              icon="BoxIcon"
              class="mr-1"
            />
            {{ store.store_products_count }}
          </div>

        </b-card>
      </b-col>
      <b-col
        v-if="userData.role_name === 'admin'"
        cols="6"
        sm="6"
        md="4"
        lg="3"
      >
        <b-card
          class="mt-1 text-center"
          @click="$router.push({ name: 'establishment-new' })"
        >
          <div
            class="d-flex justify-content-center mt--5 mb-1"
          >
            <b-avatar
              text="+"
              size="lg"
              variant="success"
            />
          </div>
          <div
            class="establishment-name"
          >
            Agregar
          </div>
          <div
            class="d-flex align-items-center justify-content-center"
          >
            Tienda
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import {
  BCard,
  BRow,
  BCol,
  BAvatar,
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
      establishment: {},
      userData: JSON.parse(localStorage.getItem('userData')),
    }
  },
  beforeMount() {
    this.fetchEstablishment(this.$route.params.id)
      .then(response => {
        this.establishment = response
      })
  },
  methods: {
    ...mapActions('establishments', ['fetchEstablishment']),
  },
}
</script>

<style lang="scss" scoped>
.mt--5 {
  margin-top: -3rem;
}
.establishment-name {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.3rem;
  font-weight: 600;
}
</style>
