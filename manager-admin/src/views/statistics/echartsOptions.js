/**
 * echarts基本配置项
 * options.color
 * options.titleText
 * options.tooltipFormatter
 * options.xAxisData
 * options.seriesName
 * options.seriesData
 */

export default function(options) {
  options = options || {}
  return {
    color: options.color || ['#3398DB'],
    title: {
      x: 'center',
      text: options.titleText || '排行TOP10'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: options.tooltipFormatter
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: options.xAxisData || ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        axisTick: { alignWithLabel: true }
      }
    ],
    yAxis: [{ type: 'value' }],
    series: [
      {
        name: options.seriesName || '数量',
        type: 'bar',
        barWidth: '60%',
        data: options.seriesData || []
      }
    ]
  }
}
