import Vue from 'vue'
import axios from 'axios'
import { MessageBox, Loading } from 'element-ui'
import Storage from '@/utils/storage'
import { Foundation } from '~/ui-utils'
import { domain } from '~/ui-domain'
import md5 from 'js-md5'
import checkToken from '@/utils/checkToken'
const qs = require('qs')

// 创建axios实例
const service = axios.create({
  baseURL: process.env.SELLER_API, // 基础api
  timeout: 5000, // 请求超时时间
  paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
})

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  /** 配置全屏加载 */
  if (config.loading !== false) {
    config.loading = Loading.service({
      lock: true,
      background: 'rgba(0, 0, 0, 0.8)',
      spinner: 'el-icon-loading'
    })
  }
  /** 设置令牌 */
  let accessToken = Storage.getItem('accessToken')
  // if (process.env.NODE_ENV === 'production') {
  //   const { member_id } = JSON.parse(Storage.getItem('user'))
  //   const nonce = Foundation.randomString(6)
  //   const timestamp = parseInt(new Date().getTime() / 1000)
  //   accessToken = md5(member_id + nonce + timestamp + accessToken)
  // }
  config.headers['Authorization'] = accessToken
  /** 进行参数序列化 */
  if ((config.method === 'put' || config.method === 'post') && config.headers['Content-Type'] !== 'application/json') {
    config.data = qs.stringify(config.data, { arrayFormat: 'repeat' })
  }
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
    if (error.config.message !== false) {
      let _message = error.code === 'ECONNABORTED' ? '连接超时，请稍候再试！' : '网络错误，请稍后再试！'
      Vue.prototype.$message.error(error_data.message || _message)
    }
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
  MessageBox.alert('您的登录状态已失效，请重新登录！', '权限错误', {
    type: 'error',
    callback: () => {
      window.location.href = `${domain.buyer_pc}/login?forward=${window.location.href}`
    }
  })
}

export default function request(options) {
  // 如果是请求刷新token，不需要检查token直接请求。
  if (options.url.indexOf('passport/token') !== -1) {
    console.log(options.url + ' | 刷新token，不需要检查token直接请求。')
    return service(options)
  }
  return new Promise((resolve, reject) => {
    checkToken(options).then(() => {
      service(options).then(resolve).catch(reject)
    })
  })
}
