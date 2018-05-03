import Vue from 'vue'
import axios from 'axios'
import Storage from '@/utils/storage'
import Foundation from '@/utils/Foundation'
import MD5 from 'md5'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  /** 配置全屏加载 */
  if (config.loading !== false) {
    config.loading = 1
  }
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
    // closeLoading(error)
    const error_response = error.response || {}
    const error_data = error_response.data || {}
    // 403 --> 没有登录、登录状态失效
    // if (error_response.status === 403) fedLogOut()
    if (error.config.message !== false) {
      Vue.prototype.$message.error(error_data.message || '出现错误，请稍后再试！')
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
    // target.config.loading.close()
  }
}

function fedLogOut() {
  //
  Vue.prototype.$message.error('您已被登出！')
}

export default service
