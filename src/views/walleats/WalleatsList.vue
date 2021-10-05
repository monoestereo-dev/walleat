<template>
  <div>
    <b-row
      class="mt-2 match-height"
    >
      <b-col
        v-for="walleat in walleats"
        :key="walleat.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <b-card
          class="mt-1 text-center cursor-pointer"
          @click="$router.push({ name: 'walleat-view', params: { id: walleat.id } })"
        >
          <div class="d-flex justify-content-center mt--5 mb-1">
            <b-avatar
              :src="`${walleat.logo}`"
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
            $ {{ walleat.daily_limit | money }}
          </div>
        </b-card>
      </b-col>
      <b-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <b-card
          class="mt-1 text-center cursor-pointer"
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
    <!-- Pagination -->
    <b-row v-if="pagination.total_objects > pagination.per_page">
      <b-col
        cols="12"
        sm="6"
        class="d-flex align-items-center justify-content-end justify-content-sm-end"
      >

        <b-pagination
          v-model="pagination.page"
          :total-rows="pagination.total_objects"
          :per-page="pagination.per_page"
          first-number
          last-number
          class="mb-0 mt-1 mt-sm-0"
          prev-class="prev-item"
          next-class="next-item"
          @change="(value)=>{handlePagination({ page: value, per_page: pagination.per_page })}"
        >
          <template #prev-text>
            <feather-icon
              icon="ChevronLeftIcon"
              size="18"
            />
          </template>
          <template #next-text>
            <b-spinner
              v-if="loading"
              small
              label="Loading"
            />
            <feather-icon
              v-else
              icon="ChevronRightIcon"
              size="18"
            />
          </template>
        </b-pagination>

      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { getUserData } from '@/auth/utils'
import {
  BCard, BRow, BCol, BAvatar, BPagination, BSpinner,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BAvatar,
    BPagination,
    BSpinner,
  },
  data() {
    return {
      loading: false,
      walleats: [],
      pagination: {
        page: 0,
        total_objects: 0,
        per_page: 0,
      },
    }
  },
  beforeMount() {
    const currentUser = getUserData()

    this.fetchWalleats({
      by_user: currentUser.id,
      meta: { pagination: { per_page: 15 } },
    })
      .then(response => {
        this.walleats = response.data
        this.pagination = response.meta.pagination
      })
  },
  methods: {
    ...mapActions('walleats', ['fetchWalleats']),
    handlePagination({ page, per_page }) {
      this.loading = true
      const currentUser = getUserData()
      this.fetchWalleats({
        by_user: currentUser.id,
        meta: {
          pagination: {
            page,
            per_page,
          },
        },
      })
        .then(response => {
          this.walleats = response.data
          this.pagination = response.meta.pagination
        })
        .finally(() => {
          this.loading = false
        })
    },
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
