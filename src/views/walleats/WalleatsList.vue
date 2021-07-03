<template>
  <div>
    <b-row
      class="mt-2"
    >
      <b-col
        v-for="walleat in walleats"
        :key="walleat.id"
        cols="6"
        sm="6"
        md="4"
        lg="3"
      >
        <b-card
          class="mt-1 text-center"
          @click="$router.push({ name: 'walleat-view', params: { id: walleat.id } })"
        >
          <div class="d-flex justify-content-center mt--5 mb-1">
            <b-avatar
              :src="`${apiUrl}${walleat.logo}`"
              size="lg"
            />
          </div>
          <div
            class="walleat-name"
          >
            {{ walleat.name }}
          </div>
          <div
            class="d-flex align-items-center justify-content-center"
          >
            <feather-icon
              icon="SlidersIcon"
              class="mr-1"
            />
            $ {{ walleat.daily_limit | money }}
          </div>
        </b-card>
      </b-col>
      <b-col
        cols="6"
        sm="6"
        md="4"
        lg="3"
      >
        <b-card
          class="mt-1 text-center"
          @click="$router.push({ name: 'walleat-new' })"
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
            class="walleat-name"
          >
            Agregar
          </div>
          <div
            class="d-flex align-items-center justify-content-center"
          >
            Walleat
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getUserData } from '@/auth/utils'
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
      walleats: [],
    }
  },
  computed: {
    ...mapGetters(['apiUrl']),
  },
  beforeMount() {
    const currentUser = getUserData()

    this.fetchWalleats({
      by_user: currentUser.id,
    })
      .then(response => {
        this.walleats = response.data
      })
  },
  methods: {
    ...mapActions('walleats', ['fetchWalleats']),
  },
}
</script>

<style lang="scss" scoped>
.mt--5 {
  margin-top: -3rem;
}
.walleat-name {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.3rem;
  font-weight: 600;
}
</style>
