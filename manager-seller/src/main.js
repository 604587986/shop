import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import EnComponents from '~/ui-components'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog'// error log
import './permission' // permission control

import * as filters from './filters' // global filter

Vue.use(Element, {
  size: 'small',
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(EnComponents)

// 全局注册echarts、jsonp
import echarts from 'echarts'
import china from 'echarts/map/js/china'
import axios from 'axios'
Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
