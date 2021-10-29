<template>
  <b-card
    class="card-tiny-line-stats"
    body-class="pb-50"
  >
    <b-card-title>
      Historial de ganancias
    </b-card-title>
    <!-- chart -->
    <vue-apex-charts
      height="108"
      :options="statisticsProfit.chartOptions"
      :series="statisticsProfit.series"
    />
  </b-card>
</template>

<script>
import { BCard, BCardTitle } from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import { $themeColors } from '@themeConfig'
import { mapGetters } from 'vuex'

const $trackBgColor = '#EBEBEB'

export default {
  components: {
    BCard,
    VueApexCharts,
    BCardTitle,
  },
  data() {
    return {
      statisticsProfit: {
        series: [
          {
            data: [0],
          },
        ],
        chartOptions: {
          chart: {
            id: 'vuechart-example',
            type: 'line',
            toolbar: {
              show: false,
            },
            zoom: {
              enabled: false,
            },
          },
          grid: {
            borderColor: $trackBgColor,
            strokeDashArray: 5,
            xaxis: {
              lines: {
                show: true,
              },
            },
            yaxis: {
              lines: {
                show: false,
              },
            },
            padding: {
              top: -30,
              bottom: -10,
            },
          },
          stroke: {
            width: 3,
          },
          colors: [$themeColors.info],
          markers: {
            size: 2,
            colors: $themeColors.info,
            strokeColors: $themeColors.info,
            strokeWidth: 2,
            strokeOpacity: 1,
            strokeDashArray: 0,
            fillOpacity: 1,
            discrete: [
              {
                seriesIndex: 0,
                dataPointIndex: 5,
                fillColor: '#ffffff',
                strokeColor: $themeColors.info,
                size: 5,
              },
            ],
            shape: 'circle',
            radius: 2,
            hover: {
              size: 3,
            },
          },
          xaxis: {
            categories: [],
            labels: {
              show: true,
              style: {
                fontSize: '0px',
              },
            },
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },
          yaxis: {
            show: false,
          },
          tooltip: {
            x: {
              show: true,
              format: 'ddd',
            },
            y: {
              title: {
                formatter: () => '$',
              },
            },
          },
        },
      },
    }
  },
  computed: {
    ...mapGetters('reports', [
      'marginCurrentDate',
    ]),
  },
  watch: {
    marginCurrentDate() {
      this.updateChart()
    },
  },
  methods: {
    updateChart() {
      this.statisticsProfit = {
        series: [
          {
            data: this.marginCurrentDate.data,
          },
        ],
        chartOptions: {
          chart: {
            id: 'vuechart-example',
            type: 'line',
            toolbar: {
              show: false,
            },
            zoom: {
              enabled: false,
            },
          },
          grid: {
            borderColor: $trackBgColor,
            strokeDashArray: 5,
            xaxis: {
              lines: {
                show: true,
              },
            },
            yaxis: {
              lines: {
                show: false,
              },
            },
            padding: {
              top: -30,
              bottom: -10,
            },
          },
          stroke: {
            width: 3,
          },
          colors: [$themeColors.info],
          markers: {
            size: 2,
            colors: $themeColors.info,
            strokeColors: $themeColors.info,
            strokeWidth: 2,
            strokeOpacity: 1,
            strokeDashArray: 0,
            fillOpacity: 1,
            discrete: [],
            shape: 'circle',
            radius: 2,
            hover: {
              size: 3,
            },
          },
          xaxis: {
            categories: this.marginCurrentDate.dates,
            labels: {
              show: true,
              style: {
                fontSize: '0px',
              },
            },
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },
          yaxis: {
            show: false,
          },
          tooltip: {
            x: {
              show: true,
            },
            y: {
              title: {
                formatter: () => '$',
              },
            },
          },
        },
      }
    },
  },
}
</script>
