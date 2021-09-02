<template>
  <div>
    <b-row
      class="mt-2 match-height"
    >
      <b-col
        v-for="establishment in establishments"
        :key="establishment.id"
        cols="6"
        sm="6"
        md="4"
        lg="3"
      >
        <b-card
          class="mt-1 text-center"
          @click="$router.push({ name: 'establishment-view', params: { id: establishment.id } })"
        >
          <div class="d-flex justify-content-center mt--5 mb-1">
            <b-avatar
              :src="`${establishment.logo}`"
              size="lg"
            />
          </div>
          <div
            class="establishment-name"
          >
            {{ establishment.name }}
          </div>
          <div
            class="d-flex align-items-center justify-content-center"
          >
            <feather-icon
              icon="CalendarIcon"
              class="mr-1"
            />
            {{ establishment.created_at | date }}
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
            establecimiento
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
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
      establishments: [],
      userData: JSON.parse(localStorage.getItem('userData')),
    }
  },
  beforeMount() {
    this.fetchEstablishments()
      .then(response => {
        this.establishments = response.data
      })
  },
  methods: {
    ...mapActions('establishments', ['fetchEstablishments']),
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
