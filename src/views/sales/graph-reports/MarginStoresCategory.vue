<template>
  <div>
    <pre>
      {{ graphData }}
    </pre>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      graphData: [],
    }
  },
  methods: {
    ...mapActions('reports', [
      'fetchSalesStoresDay',
    ]),
  },
  mounted() {
    this.fetchSalesStoresDay({ by_store_id: this.$route.params.id })
      .then(response => {
        this.graphData = response
      })
  },
}
</script>

<style lang="scss" scoped>

</style>
