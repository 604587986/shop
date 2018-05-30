import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import UIComponents from '~/ui-components'
import EnComponents from '@/components'

import '@/styles/index.scss' // global css
import App from './App'
import router from './router'
import store from './store'

import i18n from './lang' // Internationalization
import './icons' // icon
import './permission' // permission control
// 全局注册echarts、jsonp
import echarts from 'echarts'
import axios from 'axios'
import jsonp from 'vue-jsonp'
// register global utility filters.
import * as filters from './filters' // global filter
// register global utility mixins.
import mixin from './utils/mixin'

Vue.use(Element, {
  size: 'small',
  i18n: (key, value) => i18n.t(key, value)
})

Vue.use(UIComponents)
Vue.use(EnComponents)

Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios
Vue.use(jsonp)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.mixin(mixin)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
