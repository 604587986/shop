/**
 * 分类选择组件
 * 随选随用
 */
import Vue from 'vue'
import CategoryPick from './src/main'

CategoryPick.install = () => {
  Vue.component(CategoryPick.name, CategoryPick)
}

export default CategoryPick
