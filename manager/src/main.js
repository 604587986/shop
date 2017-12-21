// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import jsonp from 'vue-jsonp'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css'
import App from './App'
import store from './store'
import { Foundation, RegExp } from './framework'
import echarts from 'echarts'
import managerConfig from '../config/manager.config'
import EnPlugins from '@/plugins/selector/vue'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$Foundation = Foundation
Vue.prototype.$RegExp = RegExp
Vue.prototype.$echarts = echarts

Vue.use(ElementUI)
Vue.use(jsonp)
Vue.use(EnPlugins)

/**
 * axios全局配置
 * @type {string}
 */
axios.defaults.baseURL = managerConfig.path === 'admin'
  ? 'https://www.easy-mock.com/mock/5a090349c645f12278296ab9/admin'
  : 'https://www.easy-mock.com/mock/5a09650451a98322935c0ea2/seller'
/* global Promise */
/**
 * axios全局请求拦截
 * · 显示全屏loading
 */
axios.interceptors.request.use((config) => {
  /** 配置全屏加载 */
  if (config.loading !== false) {
    config.loading = Vue.prototype.$loading({
      lock: true,
      background: 'rgba(0, 0, 0, 0.8)',
      spinner: 'el-icon-loading',
      text: '请稍候...'
    })
  }
  /** 设置超时时间 */
  config.timeout = 8000
  return config
}, (error) => {
  closeLoading(error)
  return Promise.reject(error)
})

/**
 * axios全局响应拦截
 * · 关闭全屏loading
 */
axios.interceptors.response.use((response) => {
  closeLoading(response)
  return response
}, (error) => {
  closeLoading(error)
  if (error.message) {
    Vue.prototype.$message.error(error.message)
  }
  return Promise.reject(error)
})

/**
 * 关闭全局加载
 * @param target
 */
const closeLoading = (target) => {
  if (target.config.loading) {
    target.config.loading.close()
  }
}

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
