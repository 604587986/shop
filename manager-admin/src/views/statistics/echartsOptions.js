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
      formatter: options.tooltipFormatter || null
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: options.xAxis || [
      {
        type: 'category',
        data: options.xAxisData || [],
        axisTick: { alignWithLabel: true }
      }
    ],
    yAxis: options.yAxis || [
      {
        type: options.yAxisType || 'value',
        data: options.yAxisData || []
      }
    ],
    series: options.series || [
      {
        name: options.seriesName || '数量',
        type: options.seriesType || 'bar',
        barWidth: '60%',
        data: options.seriesData || []
      }
    ]
  }
}
