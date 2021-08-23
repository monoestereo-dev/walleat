<template>
  <div>
    <b-button-group size="sm">
      <b-button
        v-b-modal="`openStoreModal-${store.role_resource_id}`"
        variant="outline-success"
      >
        abrir tienda
      </b-button>
      <b-button
        v-b-modal="`closeStoreModal-${store.role_resource_id}`"
        variant="outline-danger"
      >
        cerrar tienda
      </b-button>
    </b-button-group>
    <b-modal
      :id="`openStoreModal-${store.role_resource_id}`"
      title="Abrir tienda"
      size="sm"
      :ok-disabled="cash_inicial < 0 || cash_inicial === null || cash_inicial === ''"
      @ok="handleOpenStore({storeId: store.role_resource_id, cash: cash_inicial})"
    >
      <b-form class="my-2">
        <h1 class="text-center display-3">
          💰
        </h1>
        <h3 class="text-center mb-1">
          ¿Cuánto efectivo hay en la caja?
        </h3>
        <b-input-group>
          <b-input-group-prepend is-text>
            $
          </b-input-group-prepend>
          <b-form-input
            v-model="cash_inicial"
            type="number"
          />
        </b-input-group>
      </b-form>
    </b-modal>
    <b-modal
      :id="`closeStoreModal-${store.role_resource_id}`"
      title="Cerrar tienda"
      size="sm"
      :ok-disabled="cash_final < 0 || cash_final === null || cash_final === ''"
      @ok="handleCloseStore({storeId: store.role_resource_id, cash: cash_final})"
    >
      <b-form class="my-2">
        <h1 class="text-center display-3">
          🏃💨
        </h1>
        <h3 class="text-center mb-1">
          ¿Cuánto efectivo hay en la caja?
        </h3>
        <b-input-group>
          <b-input-group-prepend is-text>
            $
          </b-input-group-prepend>
          <b-form-input
            v-model="cash_final"
            type="number"
          />
        </b-input-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import {
  BModal,
  BForm,
  BFormInput,
  BButton,
  BButtonGroup,
  BInputGroup,
  BInputGroupPrepend,
} from 'bootstrap-vue'

export default {
  components: {
    BModal,
    BForm,
    BFormInput,
    BButton,
    BButtonGroup,
    BInputGroup,
    BInputGroupPrepend,
  },
  props: {
    store: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      cash_inicial: null,
      cash_final: null,
    }
  },
  methods: {
    ...mapActions('stores', [
      'openStore',
      'closeStore',
    ]),
    handleOpenStore(data) {
      this.openStore(data)
        .then(() => {
          this.$router.push({ name: 'POS', parmams: { store_id: data.store_id } })
        })
        .catch(error => {
          error.response.data.messages.base.forEach(element => {
            this.$toast({
              component: ToastificationContent,
              position: 'top-center',
              props: {
                title: 'Error',
                icon: 'CoffeeIcon',
                variant: 'danger',
                text: element,
              },
            })
          })
        })
    },
    handleCloseStore(data) {
      this.closeStore(data)
        .then(() => {
          this.$swal({
            title: '¡Cierre de dia exitoso!',
            text: 'Grácias.',
            icon: 'success',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        })
        .catch(error => {
          debugger
          error.response.data.messages.base.forEach(element => {
            this.$toast({
              component: ToastificationContent,
              position: 'top-center',
              props: {
                title: 'Error',
                icon: 'CoffeeIcon',
                variant: 'danger',
                text: element,
              },
            })
          })
        })
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
