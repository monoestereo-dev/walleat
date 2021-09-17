<template>
  <b-container>
    <b-row>
      <b-col
        md="6"
        lg="4"
      >
        <b-card>
          <b-form @submit.prevent="handleSubmit()">
            <h3>Agregar Tienda</h3>
            <div class="d-flex justify-content-start my-2">
              <base-cropper
                :model="store"
                @cropped-image="store.logo"
              />
            </div>
            <b-form-group
              class="mb-2"
              label="Nombre de la tienda"
            >
              <b-form-input
                v-model="store.name"
                required
              />
            </b-form-group>
            <b-button
              class="mr-1"
              variant="primary"
              type="submit"
            >
              Guardar
            </b-button>
            <b-button
              variant="outline-secondary"
              :to="{ name: 'establishment-view', params: { id: $route.params.id } }"
            >
              Cancelar
            </b-button>
          </b-form>
        </b-card>
      </b-col>
      <b-col>
        <div class="text-center">
          <b-img
            :src="require('@/assets/images/illustration/pricing-Illustration.svg')"
            width="600"
            fluid
          />
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {
  BContainer,
  BCard,
  BButton,
  BForm,
  BRow,
  BCol,
  BFormInput,
  BFormGroup,
  BImg,
} from 'bootstrap-vue'
import { mapActions } from 'vuex'
import BaseCropper from '@/@core/components/BaseCropper.vue'

export default {
  components: {
    BContainer,
    BCard,
    BButton,
    BForm,
    BRow,
    BCol,
    BFormInput,
    BFormGroup,
    BImg,
    BaseCropper,
  },
  data() {
    return {
      store: {
        establishment_id: this.$route.params.id,
        name: null,
        logo: null,
      },
    }
  },
  mounted() {
    if (this.$route.params.store_id) {
      this.fetchStore(this.$route.params.store_id)
        .then(response => {
          this.store = response
        })
    }
  },
  methods: {
    ...mapActions('stores', [
      'addStore',
      'editStore',
      'fetchStore',
    ]),
    handleSubmit() {
      if (!this.$route.params.store_id) {
        this.addStore(this.store)
          .then(() => {
            // this.$router.push({ name: 'add-store-products', params: { id: response.id } })
            this.$router.push({ name: 'establishment-view', params: { id: this.$route.params.id } })
          })
      } else {
        const store = {
          name: this.store.name,
          establishment_id: this.$route.params.id,
          logo: this.store.logo,
        }
        this.editStore({ id: this.$route.params.store_id, store })
          .then(() => {
            this.$router.push({ name: 'establishment-view', params: { id: this.$route.params.id } })
          })
      }
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
