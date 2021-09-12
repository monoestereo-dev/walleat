<template>
  <b-tabs
    pills
    nav-wrapper-class="col-md-3 col-12"
    nav-class="nav-left"
  >

    <!-- general tab -->
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
    <!--/ general tab -->

    <!-- change password tab -->
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
    <!--/ change password tab -->

  </b-tabs>
</template>

<script>
import { BTabs, BTab } from 'bootstrap-vue'
import StoresList from '@/views/stores/StoresList.vue'
import UserList from '@/views/user/users-list/UsersList.vue'

export default {
  components: {
    BTabs,
    BTab,
    StoresList,
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
