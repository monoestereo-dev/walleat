<template>
  <div>
    <b-row>
      <b-col>
        <b-form-group label="Dirección del establecimiento">
          <vue-google-autocomplete
            id="map"
            classname="form-control"
            placeholder="Ingresa una dirección"
            :country="['mx']"
            @placechanged="getAddressData"
          />
        </b-form-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BFormGroup,

} from 'bootstrap-vue'
import VueGoogleAutocomplete from 'vue-google-autocomplete'

export default {
  components: {
    VueGoogleAutocomplete,
    BRow,
    BCol,
    BFormGroup,
  },
  data() {
    return {
      address: {},
    }
  },
  methods: {
    getAddressData(address) {
      this.address.state = address.administrative_area_level_1 || '🎠'
      this.address.country = address.country || '🎠'
      this.address.city = address.locality || '🎠'
      this.address.street = address.route || '🎠'
      this.address.ext_number = address.street_number || '🎠'
      this.address.postal_code = address.postal_code || '🎠'
      this.address.lat = address.latitude || '🎠'
      this.address.lng = address.longitude || '🎠'
      this.address.suburb = address.sublocality_level_1 || '🎠'
      this.$emit('getAddress', this.address)
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
