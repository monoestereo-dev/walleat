<template>
  <b-tabs
    pills
    nav-class="nav-left"
  >

    <!-- Puntos de venta tab -->
    <b-tab active>

      <!-- title -->
      <template #title>
        <feather-icon
          icon="ShoppingCartIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">Puntos de venta</span>
      </template>

      <stores-list />
    </b-tab>

    <!-- usuarios tab -->
    <b-tab>

      <!-- title -->
      <template #title>
        <feather-icon
          icon="UsersIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">Usuarios</span>
      </template>

      <user-list />
    </b-tab>

    <!-- General tab -->
    <b-tab>
      <!-- title -->
      <template #title>
        <feather-icon
          icon="SettingsIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">General</span>
      </template>

      <establishment-edit-tab />
    </b-tab>

  </b-tabs>
</template>

<script>
import { BTabs, BTab } from 'bootstrap-vue'
import StoresList from '@/views/stores/StoresList.vue'
import EstablishmentEditTab from '@/views/establishments/EstablishmentEditTab.vue'
import UserList from '@/views/user/users-list/UsersList.vue'

export default {
  components: {
    BTabs,
    BTab,
    StoresList,
    EstablishmentEditTab,
    UserList,
  },
  data() {
    return {
      options: {},
      userData: JSON.parse(localStorage.getItem('userData')),
    }
  },
  beforeCreate() {},
}
</script>
