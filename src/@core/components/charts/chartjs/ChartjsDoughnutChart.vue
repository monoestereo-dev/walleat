<template>
  <b-card
    title="Resumen por categorías"
  >
    <!-- chart -->
    <chartjs-component-doughnut-chart
      ref="doughnut"
      :height="doughnutSize"
      :data="graphData"
      :options="chartjsData.doughnutChart.options"
      class="mb-3"
    />
    <!--/ chart -->

    <!-- labels -->
    <b-badge
      v-for="(label,index) in graphData.datasets[0].labels"
      :key="`label-${index}`"
      class="mr-1 mt-1"
      :style="{ backgroundColor: backgroundWithOpacity(graphData.datasets[0].backgroundColor[index], 0.1), color: graphData.datasets[0].backgroundColor[index] }"
    >
      {{ label }}
    </b-badge>
    <!--/ stocks -->
  </b-card>
</template>

<script>
import { BCard, BBadge } from 'bootstrap-vue'
import ChartjsComponentDoughnutChart from './charts-components/ChartjsComponentDoughnutChart.vue'
import chartjsData from './chartjsData'

export default {
  components: {
    ChartjsComponentDoughnutChart,
    BCard,
    BBadge,
  },
  props: {
    graphData: {
      type: Object,
      default: () => ({
        data: {
          labels: [],
          datasets: [
            {
              data: [],
            },
          ],
        },
      }),
    },
    doughnutSize: {
      type: Number,
      default: 256,
    },
  },
  data() {
    return {
      chartjsData,
      stockData: [
        {
          device: 'Desktop', symbol: 'MonitorIcon', color: 'text-primary', percentage: 80, upDown: 2,
        },
        {
          device: 'Mobile', symbol: 'TabletIcon', color: 'text-warning', percentage: 10, upDown: 8,
        },
        {
          device: 'Tablet', symbol: 'TabletIcon', color: 'text-success', percentage: 10, upDown: -5,
        },
      ],
    }
  },
  watch: {
    graphData() {
      this.$refs.doughnut.reRenderChart()
    },
  },
  methods: {
    backgroundWithOpacity(hex, opacity) {
      if (hex) {
        const color = hex.replace('#', '')
        const r = parseInt(color.substring(0, 2), 16)
        const g = parseInt(color.substring(2, 4), 16)
        const b = parseInt(color.substring(4, 6), 16)
        return `rgba(${r}, ${g}, ${b}, ${opacity})`
      }

      return 'rgba(0, 0, 0, 0)'
    },
  },
}
</script>
