import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog'// error log
import './permission' // permission control

Vue.use(Element, {
  size: 'medium',
  i18n: (key, value) => i18n.t(key, value)
})

// 全局注册echarts、jsonp
import echarts from 'echarts'
import axios from 'axios'
import jsonp from 'vue-jsonp'
Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios
Vue.use(jsonp)

// register global utility filters.
import * as filters from './filters' // global filter
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// register global utility mixins.
import mixin from './utils/mixin'
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
