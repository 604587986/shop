import Vue from 'vue'
import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
const qs = require('qs')

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000, // 请求超时时间
  paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
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
  /** 设置令牌 */
  if (store.getters.token) {
    config.headers['Authorization'] = 'eyJhbGciOiJIUzUxMiJ9.eyJzZWxmT3BlcmF0ZWQiOjAsInVpZCI6MTAwLCJzdWIiOiJTRUxMRVIiLCJzZWxsZXJJZCI6MTczMiwicm9sZXMiOlsiQlVZRVIiLCJTRUxMRVIiXSwic2VsbGVyTmFtZSI6Iua1i-ivleW6l-mTuiIsInVzZXJuYW1lIjoid29zaGljZXNoaSJ9.cLVAOdWk3hiltbYcN3hTs7az2y6U7FQdjYwLEPcMgeES50O4ahgG4joT_rOAB2XvjS4ZR2R-_AgEMeScpXNW3g'// 让每个请求携带令牌
  }
  /** 进行参数序列化 */
  if ((config.method === 'put' || config.method === 'post') && config.headers['Content-Type'] !== 'application/json') {
    config.data = qs.stringify(config.data, { arrayFormat: 'repeat' })
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  async response => {
    await closeLoading(response)
    return response.data
  },
  async error => {
    await closeLoading(error)
    const error_response = error.response || {}
    const error_data = error_response.data || {}
    // 403 --> 没有登录、登录状态失效
    if (error_response.status === 403) fedLogOut()
    let _message = error.code === 'ECONNABORTED' ? '连接超时，请稍候再试！' : '出现错误，请稍后再试！'
    Vue.prototype.$message.error(error_data.message || _message)
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
