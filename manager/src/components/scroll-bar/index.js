/**
 * 滚动组件
 * 包含高级模式
 */
import Vue from 'vue'
import ScrollBar from './src/main'

ScrollBar.install = () => {
  Vue.component(ScrollBar.name, ScrollBar)
}

export default ScrollBar
