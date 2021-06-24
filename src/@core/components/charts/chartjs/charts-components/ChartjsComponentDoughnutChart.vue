<script>
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: {
    data: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    },
  },
  watch: {
    data() {
      this.renderChart(this.data, this.options)
    },
  },
  mounted() {
    this.renderChart(this.data, this.options)
  },
  methods: {
    reRenderChart() {
      this.renderChart(this.data.datasets[0].data, this.options)
    },
  },
}
</script>
