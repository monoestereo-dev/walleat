<template>
  <b-card>
    <b-form @submit.prevent="editEstablishmentPrompt()">
      <div class="d-flex">
        <feather-icon
          icon="ShoppingBagIcon"
          size="19"
        />
        <h4 class="mb-0 ml-50">
          Información del establecimiento
        </h4>
      </div>
      <b-row class="mt-1">
        <b-col cols="12">
          <div class="d-flex mb-1">
            <base-cropper
              :model="establishment"
              @cropped-image="establishment.logo"
            />
          </div>
        </b-col>
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Nombre"
            label-for="name"
          >
            <b-form-input
              v-model="establishment.name"
              class="form-control"
              placeholder=""
            />
          </b-form-group>
        </b-col>
      </b-row>

      <!-- Header: Personal Info -->
      <div class="d-flex mt-2">
        <feather-icon
          icon="UserIcon"
          size="19"
        />
        <h4 class="mb-0 ml-50">
          Información de contacto
        </h4>
      </div>

      <!-- Form: Personal Info Form -->
      <b-row class="mt-1">

        <!-- Field: Birth Date -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Nombre"
            label-for="contact-name"
          >
            <b-form-input
              v-model="establishment.contact_name"
              class="form-control"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Mobile -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Teléfono"
            label-for="mobile"
          >
            <b-form-input
              id="mobile"
              v-model="establishment.contact_phone"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Website -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Email"
            label-for="website"
          >
            <b-form-input
              id="website"
              v-model="establishment.contact_email"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <!-- Header: Personal Info -->
      <div class="d-flex mt-2">
        <feather-icon
          icon="MapPinIcon"
          size="19"
        />
        <h4 class="mb-0 ml-50">
          Dirección
        </h4>
      </div>

      <!-- Form: Personal Info Form -->
      <b-row class="mt-1">

        <!-- Field: Address Line 1 -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Calle"
            label-for="address-line-1"
          >
            <b-form-input
              id="address-line-1"
              v-model="establishment.address_attributes.street"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Address Line 2 -->
        <b-col
          cols="12"
          md="6"
          lg="2"
        >
          <b-form-group
            label="# exterior"
            label-for="address-ext-number"
          >
            <b-form-input
              id="address-ext-number"
              v-model="establishment.address_attributes.ext_number"
              placeholder=""
            />
          </b-form-group>
        </b-col>

        <!-- Field: Postcode -->
        <b-col
          cols="12"
          md="6"
          lg="2"
        >
          <b-form-group
            label="# interior"
            label-for="address-int-number"
          >
            <b-form-input
              id="address-int-number"
              v-model="establishment.address_attributes.int_number"
              type="number"
              placeholder=""
            />
          </b-form-group>
        </b-col>
        <!-- Field: Postcode -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Código postal"
            label-for="address-postal-code"
          >
            <b-form-input
              id="address-postal-code"
              v-model="establishment.address_attributes.postal_code"
              type="number"
              placeholder=""
            />
          </b-form-group>
        </b-col>

        <!-- Field: City -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="City"
            label-for="city"
          >
            <b-form-input
              id="city"
              v-model="establishment.address_attributes.city"
            />
          </b-form-group>
        </b-col>

        <!-- Field: State -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="State"
            label-for="state"
          >
            <b-form-input
              id="state"
              v-model="establishment.address_attributes.state"
              placeholder="Manhattan"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Country -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Country"
            label-for="country"
          >
            <b-form-input
              id="country"
              v-model="establishment.address_attributes.country"
              placeholder="United States"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row class="mt-2">
        <b-col>
          <b-button
            variant="primary"
            class="mb-1 mb-sm-0 mr-0 mr-sm-1"
            :block="$store.getters['app/currentBreakPoint'] === 'xs'"
            type="submit"
          >
            Guardar
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-card>
</template>

<script>
import {
  BRow, BCol, BForm, BFormGroup, BFormInput, BButton, BCard,
} from 'bootstrap-vue'
import BaseCropper from '@/@core/components/BaseCropper.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    BRow, BCol, BForm, BFormGroup, BFormInput, BButton, BCard, BaseCropper,
  },
  data() {
    return {
      establishment: {
        logo: null,
      },
    }
  },
  mounted() {
    this.fetchEstablishment(this.$route.params.id)
      .then(response => {
        this.establishment = response
      })
  },
  methods: {
    ...mapActions('establishments', ['fetchEstablishment', 'editEstablishment']),
    editEstablishmentPrompt() {
      this.$swal({
        title: '¿Estás seguro?',
        text: 'Estás apunto de editar la información de el establecimiento',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, ¡Quiero editar!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.editEstablishment({ id: this.$route.params.id, establishment: this.establishment })
            .then(() => {
              this.$swal({
                icon: 'success',
                title: '¡Establecimiento editado!',
                text: '😎',
                customClass: {
                  confirmButton: 'btn btn-success',
                },
              })
            })
        }
      })
    },
  },
}
</script>

<style lang="scss">

</style>
