/**
 * 地区选择器组件
 * Cascader 级联选择器
 */
import Vue from 'vue'
import RegionPick from './src/main'

RegionPick.install = () => {
  Vue.component(RegionPick.name, RegionPick)
}

export default RegionPick
