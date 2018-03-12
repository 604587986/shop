import Vue from 'vue'
import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import PaginationModel from '@/models/PaginationModel'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  /** 配置全屏加载 */
  if (config.loading !== false) {
    config.loading = Vue.prototype.$loading({
      lock: true,
      background: 'rgba(0, 0, 0, 0.8)',
      spinner: 'el-icon-loading',
      text: '请稍候...'
    })
  }
  if (store.getters.token) {
    config.headers['X-Token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    closeLoading(response)
    let _data = response.data
    if (typeof _data === 'string' && _data.indexOf('window.open(\'/javashop/admin/login.do\',\'_top\')') !== -1) {
      fedLogOut()
      return Promise.reject('登录失效')
    }
    if (_data.page_no && _data.page_size && _data.data_total) {
      _data = new PaginationModel().map(_data)
    }
    return _data
  },
  error => {
    closeLoading(error)
    const error_response = error.response || {}
    const error_data = error_response.data || {}
    // 403 --> 没有登录、登录状态失效
    if (error_response.status === 403) fedLogOut()
    Message({
      message: error_data.error_message || '出现错误，请稍后再试！',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

/**
 * 关闭全局加载
 * @param target
 */
const closeLoading = (target) => {
  if (target.config.loading) {
    target.config.loading.close()
  }
}

function fedLogOut() {
  MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
    confirmButtonText: '重新登录',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    store.dispatch('FedLogOut').then(() => {
      location.reload()
    })
  }).catch(() => {})
}

export default service
