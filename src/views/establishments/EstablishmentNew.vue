<template>
  <b-container>
    <b-row>
      <b-col
        md="6"
        lg="4"
      >
        <b-card>
          <b-form @submit.prevent="handleSubmit()">
            <h3>Agregar Establecimiento</h3>
            <div class="mt-2 mb-2 d-flex justify-content-start">
              <base-cropper
                :model="establishment"
                required
                @cropped-image="establishment.logo"
              />
            </div>
            <b-form-group label="Nombre del establecimiento">
              <b-form-input
                v-model="establishment.name"
                required
              />
            </b-form-group>
            <b-form-group label="Nombre del administrador">
              <b-form-input
                v-model="establishment.contact_name"
                required
              />
            </b-form-group>
            <b-form-group label="Email del administrador">
              <b-form-input
                v-model="establishment.contact_email"
                type="email"
              />
            </b-form-group>
            <address-form-model @getAddress="setAddressForEdit($event)" />
            <b-row class="mt-2">
              <b-col>
                <b-button
                  variant="primary"
                  type="submit"
                >
                  Aceptar
                </b-button>
                <b-button
                  class="ml-1"
                  variant="outline-secondary"
                  :to="{ name: 'establishments-list' }"
                >
                  Cancelar
                </b-button>
              </b-col>
            </b-row>
          </b-form>
        </b-card>
      </b-col>
      <b-col class="d-flex justify-content-center align-items-center">
        <div>
          <b-img
            :src="require('@/assets/images/illustration/marketing.svg')"
            width="600"
            fluid
          />
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions } from 'vuex'

import {
  BRow,
  BCol,
  BCard,
  BForm,
  BFormGroup,
  BFormInput,
  BButton,
  BContainer,
  BImg,

} from 'bootstrap-vue'
import AddressFormModel from '@/@core/components/AddressFormModel.vue'
import BaseCropper from '@/@core/components/BaseCropper.vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    AddressFormModel,
    BRow,
    BCol,
    BCard,
    BForm,
    BFormGroup,
    BFormInput,
    BButton,
    BaseCropper,
    BContainer,
    BImg,
  },
  data() {
    return {
      establishment: {
        name: '',
        contact_name: '',
        contact_email: '',
        address_attributes: {},
      },
    }
  },
  methods: {
    ...mapActions('establishments', [
      'addEstablishments',
    ]),
    setAddressForEdit(x) {
      this.establishment.address_attributes = x
    },
    handleSubmit() {
      this.addEstablishments(this.establishment)
        .then(() => {
          this.$router.push({ name: 'establishments-list' })
        })
        .catch(error => {
          Object.keys(error.response.data.messages).forEach(x => {
            error.response.data.messages[x].forEach(y => {
              this.$toast({
                component: ToastificationContent,
                position: 'top-right',
                props: {
                  title: 'Error',
                  icon: 'CoffeeIcon',
                  variant: 'danger',
                  text: y,
                },
              })
            })
          })
        })
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
