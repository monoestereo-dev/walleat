<template>
  <b-card
    no-body
    class="border-primary"
  >
    <b-card-header class="d-flex justify-content-between align-items-center pt-75 pb-25">
      <h5 class="mb-0">
        Establecimiento
      </h5>
      <b-badge variant="light-primary">
        Basic
      </b-badge>
    </b-card-header>

    <b-card-body>
      <div class="d-flex align-items-center justify-content-center flex-column p-1">
        <h1
          v-for="establishment in userData.scoped_roles.filter(x => { return x.role_resource_type === 'Establishment' })"
          :key="`establishment-${establishment.id}`"
        >
          {{ establishment.role_resource_name }}
        </h1>
        <h3
          v-for="establishment in userData.scoped_roles.filter(x => { return x.role_resource_type === 'Store' })"
          :key="`establishment-${establishment.id}`"
        >
          {{ establishment.role_resource_name }}
        </h3>
      </div>
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="primary"
        block
      >
        Agregar crédito
      </b-button>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardBody, BBadge, BButton,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  directives: {
    Ripple,
  },
  components: {
    BCard,
    BCardHeader,
    BCardBody,
    BBadge,
    BButton,
  },
  props: {
    userData: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style>

</style>
