<template>
  <div>
    <b-row
      class="mt-3 match-height"
    >
      <b-col
        v-for="store in establishment.stores_attributes"
        :key="store.id"
        cols="12"
        sm="12"
        md="6"
        lg="6"
        xl="4"
      >
        <b-card
          class="mt-1 text-center"
        >
          <div class="d-flex justify-content-center mt--5 mb-1 position-relative">
            <span @click="$router.push({ name: 'POS', params: { store_id: store.id } })">
              <b-avatar
                :src="`${store.logo}`"
                size="85"
                class="cursor-pointer"
              />
            </span>
          </div>

          <!-- Dropdown -->
          <div class="dropdown settings-btn">
            <b-dropdown
              variant="link"
              no-caret
              toggle-class="p-0"
              right
            >
              <template #button-content>
                <feather-icon
                  icon="MoreVerticalIcon"
                  size="16"
                  class="align-middle text-body"
                />
              </template>
              <b-dropdown-item
                :to="{ name: 'store-users', params: { id: store.id } }"
              >
                Gestionar usuarios
              </b-dropdown-item>
              <b-dropdown-divider />
              <b-dropdown-item
                :to="{ name: 'edit-store', params: { id: $route.params.id, store_id: store.id } }"
              >
                Editar tienda
              </b-dropdown-item>
            </b-dropdown>
          </div>

          <h3
            class="store-name"
          >
            {{ store.name }}
          </h3>
          <div
            class="d-flex align-items-center justify-content-center"
          >
            <b-badge variant="light-secondary">
              <feather-icon
                icon="BoxIcon"
                class="mr-1"
              />
              {{ store.store_products_count }}
            </b-badge>
          </div>
          <b-button
            v-if="store.store_products_count > 0"
            block
            variant="primary"
            size="lg"
            :to="{ name: 'POS', params: { store_id: store.id } }"
            class="my-2"
          >
            <i class="fas fa-cash-register mr-1" />  Punto de venta
          </b-button>
          <b-button
            v-if="store.store_products_count > 0"
            block
            variant="outline-primary"
            :to="{ name: 'sales-view', params: { id: store.id } }"
          >
            <i class="fas fa-chart-line mr-1" />
            Reporte de ventas
          </b-button>

          <div
            v-if="store.store_products_count === 0"
            class="mt-2 mb-2"
          >
            <h4 class="text-success">
              Nuevo
            </h4>
          </div>
          <b-button
            block
            :variant="store.store_products_count === 0 ? 'primary' : 'outline-primary'"
            :to="{ name: 'store-products', params: { id: store.id } }"
          >
            <feather-icon
              class="mr-1"
              icon="PackageIcon"
            />
            Gestionar productos
          </b-button>
          <p
            v-if="store.store_products_count === 0"
            class="mt-1 text-muted"
          >
            👆 Agrega productos al inventario para poder realizar ventas
          </p>
        </b-card>
      </b-col>
      <b-col
        v-if="userData.role_name === 'admin' || userData.role_name === 'establishment_admin'"
        cols="12"
        sm="12"
        md="6"
        lg="4"
      >
        <b-card
          class="mt-1 text-center d-flex justify-content-center align-items-center p-2 cursor-pointer"
          no-body
          @click="$router.push({ name: 'new-store', params: { id: $route.params.id } })"
        >
          <div
            class="d-flex justify-content-center mb-1"
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
            class="establishment-name"
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
  BDropdown,
  BDropdownItem,
  BDropdownDivider,
  BButton,
  BBadge,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  directives: {
    Ripple,
  },
  components: {
    BCard,
    BRow,
    BCol,
    BAvatar,
    BDropdown,
    BDropdownItem,
    BDropdownDivider,
    BButton,
    BBadge,
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
.settings-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
</style>
