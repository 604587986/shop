import Vue from 'vue'
import { Loading, MessageBox } from 'element-ui'
import axios from 'axios'
import store from '@/store'
import Storage from '@/utils/storage'
import checkToken from '@/utils/checkToken'

const qs = require('qs')

// 创建axios实例
const service = axios.create({
  baseURL: process.env.ADMIN_API,
  timeout: 5000,
  paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
})

// request拦截器
service.interceptors.request.use(config => {
  // 如果是put/post请求，用qs.stringify序列化参数
  const is_put_post = config.method === 'put' || config.method === 'post'
  const is_json = config.headers['Content-Type'] === 'application/json'
  if (is_put_post && is_json) {
    config.data = JSON.stringify(config.data)
  }
  if (is_put_post && !is_json) {
    config.data = qs.stringify(config.data, { arrayFormat: 'repeat' })
  }
  // Do something before request is sent
  /** 配置全屏加载 */
  if (config.loading !== false) {
    config.loading = Loading.service({
      lock: true,
      background: 'rgba(0, 0, 0, 0.7)',
      spinner: 'el-icon-loading',
      text: '请稍候...'
    })
  }
  /** 设置令牌 */
  let accessToken = Storage.getItem('adminAccessToken')
  // if (process.env.NODE_ENV === 'production') {
  //   const { member_id } = JSON.parse(Storage.getItem('user'))
  //   const nonce = Foundation.randomString(6)
  //   const timestamp = parseInt(new Date().getTime() / 1000)
  //   accessToken = md5(member_id + nonce + timestamp + accessToken)
  // }
  config.headers['Authorization'] = accessToken
  return config
}, error => {
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
    let _message = error.code === 'ECONNABORTED' ? '连接超时，请稍候再试！' : '网络错误，请稍后再试！'
    Vue.prototype.$message.error(error_data.message || _message)
    return Promise.reject(error)
  }
)

/**
 * 关闭全局加载
 * 延迟200毫秒关闭，以免晃眼睛
 * @param target
 */
const closeLoading = (target) => {
  if (!target.config.loading) return true
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      target.config.loading.close()
      resolve()
    }, 200)
  })
}

function fedLogOut() {
  MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
    confirmButtonText: '重新登录',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    store.dispatch('fedLogOut').then(() => {
      location.reload()
    })
  }).catch(() => {})
}

export default function request(options) {
  // 如果是刷新token或者登录，不需要检查token直接请求。
  if (options.url.indexOf('systems/admin-user/login') + options.url.indexOf('systems/admin-user/token') > -2) {
    console.log(options.url + ' | 请求的刷新token或是登录，不需要检查token直接请求。')
    return service(options)
  }
  return new Promise((resolve, reject) => {
    checkToken(options).then(() => {
      service(options).then(resolve).catch(reject)
    })
  })
}
