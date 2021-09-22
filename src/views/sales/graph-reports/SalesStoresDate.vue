<script>
import { Bar } from 'vue-chartjs'
import Chart from 'chart.js'
import { mapActions } from 'vuex'
import { $themeColors } from '@themeConfig'
import chartjsData from './chartjsData'

// colors
const chartColors = {
  primaryColorShade: '#836AF9',
  yellowColor: '#ffe800',
  successColorShade: '#28dac6',
  warningColorShade: '#ffe802',
  warningLightColor: '#FDAC34',
  infoColorShade: '#299AFF',
  greyColor: '#4F5D70',
  blueColor: '#2c9aff',
  blueLightColor: '#84D0FF',
  greyLightColor: '#EDF1F4',
  tooltipShadow: 'rgba(0, 0, 0, 0.25)',
  lineChartPrimary: '#666ee8',
  lineChartDanger: '#ff4961',
  labelColor: '#6e6b7b',
  grid_line_color: 'rgba(200, 200, 200, 0.05)',
}

/*eslint-disable */
Chart.elements.Rectangle.prototype.draw = function () {
  let ctx = this._chart.ctx
  let viewVar = this._view
  let left, right, top, bottom, signX, signY, borderSkipped, radius
  let borderWidth = viewVar.borderWidth
  let cornerRadius = 20
  if (!viewVar.horizontal) {
    left = viewVar.x - viewVar.width / 2
    right = viewVar.x + viewVar.width / 2
    top = viewVar.y
    bottom = viewVar.base
    signX = 1
    signY = top > bottom ? 1 : -1
    borderSkipped = viewVar.borderSkipped || 'bottom'
  } else {
    left = viewVar.base
    right = viewVar.x
    top = viewVar.y - viewVar.height / 2
    bottom = viewVar.y + viewVar.height / 2
    signX = right > left ? 1 : -1
    signY = 1
    borderSkipped = viewVar.borderSkipped || 'left'
  }

  if (borderWidth) {
    let barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom))
    borderWidth = borderWidth > barSize ? barSize : borderWidth
    let halfStroke = borderWidth / 2
    let borderLeft = left + (borderSkipped !== 'left' ? halfStroke * signX : 0)
    let borderRight = right + (borderSkipped !== 'right' ? -halfStroke * signX : 0)
    let borderTop = top + (borderSkipped !== 'top' ? halfStroke * signY : 0)
    let borderBottom = bottom + (borderSkipped !== 'bottom' ? -halfStroke * signY : 0)
    if (borderLeft !== borderRight) {
      top = borderTop
      bottom = borderBottom
    }
    if (borderTop !== borderBottom) {
      left = borderLeft
      right = borderRight
    }
  }

  ctx.beginPath()
  ctx.fillStyle = viewVar.backgroundColor
  ctx.strokeStyle = viewVar.borderColor
  ctx.lineWidth = borderWidth
  let corners = [
    [left, bottom],
    [left, top],
    [right, top],
    [right, bottom]
  ]

  let borders = ['bottom', 'left', 'top', 'right']
  let startCorner = borders.indexOf(borderSkipped, 0)
  if (startCorner === -1) {
    startCorner = 0
  }

  function cornerAt(index) {
    return corners[(startCorner + index) % 4]
  }

  let corner = cornerAt(0)
  ctx.moveTo(corner[0], corner[1])

  for (let i = 1; i < 4; i++) {
    corner = cornerAt(i)
    let nextCornerId = i + 1
    if (nextCornerId == 4) {
      nextCornerId = 0
    }

    let nextCorner = cornerAt(nextCornerId)

    let width = corners[2][0] - corners[1][0],
      height = corners[0][1] - corners[1][1],
      x = corners[1][0],
      y = corners[1][1]

    let radius = cornerRadius

    if (radius > height / 2) {
      radius = height / 2
    }
    if (radius > width / 2) {
      radius = width / 2
    }

    if (!viewVar.horizontal) {
      ctx.moveTo(x + radius, y)
      ctx.lineTo(x + width - radius, y)
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
      ctx.lineTo(x + width, y + height - radius)
      ctx.quadraticCurveTo(x + width, y + height, x + width, y + height)
      ctx.lineTo(x + radius, y + height)
      ctx.quadraticCurveTo(x, y + height, x, y + height)
      ctx.lineTo(x, y + radius)
      ctx.quadraticCurveTo(x, y, x + radius, y)
    } else {
      ctx.moveTo(x + radius, y)
      ctx.lineTo(x + width - radius, y)
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
      ctx.lineTo(x + width, y + height - radius)
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
      ctx.lineTo(x + radius, y + height)
      ctx.quadraticCurveTo(x, y + height, x, y + height)
      ctx.lineTo(x, y + radius)
      ctx.quadraticCurveTo(x, y, x, y)
    }
  }

  ctx.fill()
  if (borderWidth) {
    ctx.stroke()
  }
}
/* eslint-enable */

export default {
  extends: Bar,
  data() {
    return {
      chartjsData,
      graphData: {
        data: {
          labels: [],
          datasets: [
            {
              data: [],
              backgroundColor: '#299AFF',
              borderColor: 'transparent',
            },
          ],
        },
        options: {
          elements: {
            rectangle: {
              borderWidth: 2,
              borderSkipped: 'bottom',
            },
          },
          responsive: true,
          maintainAspectRatio: false,
          responsiveAnimationDuration: 500,
          legend: {
            display: false,
          },
          tooltips: {
            // Updated default tooltip UI
            shadowOffsetX: 1,
            shadowOffsetY: 1,
            shadowBlur: 8,
            shadowColor: chartColors.tooltipShadow,
            backgroundColor: $themeColors.light,
            titleFontColor: $themeColors.dark,
            bodyFontColor: $themeColors.dark,
          },
          scales: {
            xAxes: [
              {
                display: true,
                gridLines: {
                  display: false,
                  color: chartColors.grid_line_color,
                  zeroLineColor: chartColors.grid_line_color,
                },
                scaleLabel: {
                  display: false,
                },
                ticks: {
                  fontColor: chartColors.labelColor,
                },
              },
            ],
            yAxes: [
              {
                display: true,
                gridLines: {
                  color: chartColors.grid_line_color,
                  zeroLineColor: chartColors.grid_line_color,
                },
                ticks: {
                  stepSize: 5000,
                  min: 0,
                  fontColor: chartColors.labelColor,
                },
              },
            ],
          },
        },
      },
    }
  },
  mounted() {
    this.fetchSalesStoresDate({ by_store_id: this.$route.params.id })
      .then(response => {
        response.forEach(x => {
          this.graphData.data.labels.push(x.date)
          this.graphData.data.datasets[0].data.push(x.total)
        })
        this.renderChart(this.graphData.data, this.graphData.options)
      })
  },
  methods: {
    ...mapActions('reports', [
      'fetchSalesStoresDate',
    ]),
  },
}
</script>

<style lang="scss" scoped>

</style>
