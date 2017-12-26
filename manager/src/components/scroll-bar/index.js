/**
 * 滚动条组件
 * 暂用于左侧侧边栏
 */
import Vue from 'vue'
import ScrollBar from './src/main'

ScrollBar.install = () => {
  Vue.component(ScrollBar.name, ScrollBar)
}

export default ScrollBar
