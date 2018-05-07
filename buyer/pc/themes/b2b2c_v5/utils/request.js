import Vue from 'vue'
import axios from 'axios'
import { Loading } from 'element-ui'
import Storage from '@/utils/storage'
import Foundation from '@/utils/Foundation'
import MD5 from 'md5'
import GetFullUrl from '@/utils/urls'
const qs = require('qs')

// 创建axios实例
const service = axios.create({
  timeout: 8000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  /** url处理 */
  const { url, loading } = config
  if (!/^http/.test(url)) {
    config.url = GetFullUrl(url)
  }
  /** 如果是post或put请求，用qs.stringify序列化参数 */
  if (config.method === 'post' || config.method === 'put') {
    config.data = qs.stringify(config.data)
  }
  /** 配置全屏加载 */
  if (loading !== false) {
    config.loading = Loading.service({
      fullscreen: true,
      background: 'rgba(0,0,0,.6)',
      lock: true,
      text: '努力加载中...'
    })
  }
  // 如果是刷新Token的请求，直接放行。
  if (config.isRefreshTokenRequest) {
    return config
  }
  // 获取访问Token
  let accessToken = Storage.getItem('accessToken')
  if (accessToken) {
    // if (process.env.NODE_ENV === 'production') {
    //   const { member_id } = JSON.parse(Storage.getItem('user') || "{}")
    //   const nonce = Foundation.randomString(6)
    //   const timestamp = parseInt(new Date().getTime() / 1000)
    //   accessToken = MD5(member_id + nonce + timestamp + accessToken)
    // }
    config.headers['Authorization'] = accessToken
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
    // if (typeof _data === 'string' && _data.indexOf('window.open(\'/javashop/admin/login.do\',\'_top\')') !== -1) {
    //   fedLogOut()
    //   return Promise.reject('登录失效')
    // }
    // if (_data.page_no && _data.page_size && _data.data_total) {
    //   _data = new PaginationModel().map(_data)
    // }
    return _data
  },
  error => {
    closeLoading(error)
    const error_response = error.response || {}
    const error_data = error_response.data || {}
    // 403 --> 没有登录、登录状态失效
    if (error_data.code === '109') fedLogOut()
    let _message = error.code === 'ECONNABORTED' ? '连接超时，请稍候再试！' : '出现错误，请稍后再试！'
    if (error.config.message !== false) {
      Vue.prototype.$message.error(error_data.message || _message)
    }
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

/**
 * 已被登出
 */
function fedLogOut() {
  Vue.prototype.$message.error('您已被登出！')
  return Promise.reject(error)
}

export default service
