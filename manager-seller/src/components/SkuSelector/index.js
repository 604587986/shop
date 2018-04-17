/**
 * 商品规格选择器
 */
import Vue from 'vue'
import SkuSelector from './src/main'

SkuSelector.install = () => {
  Vue.component(SkuSelector.name, SkuSelector)
}

export default SkuSelector
