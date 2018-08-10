import Vue from 'vue'
import axios from 'axios'
import { Loading } from 'element-ui'
import { api } from '~/ui-domain'
import Storage from '@/utils/storage'
import { Foundation } from '~/ui-utils'
import md5 from 'js-md5'
import checkToken from '@/utils/checkToken'
const qs = require('qs')

// 创建axios实例
const service = axios.create({
  timeout: 8000,     // 请求超时时间
  baseURL: api.buyer // 买家端API
})

// request拦截器
service.interceptors.request.use(config => {
  const { loading } = config
  // 如果是put/post请求，用qs.stringify序列化参数
  const is_put_post = config.method === 'put' || config.method === 'post'
  const is_json = config.headers['Content-Type'] === 'application/json'
  if (is_put_post && is_json) {
    config.data = JSON.stringify(config.data)
  }
  if (is_put_post && !is_json) {
    config.data = qs.stringify(config.data, { arrayFormat: 'repeat' })
  }
  /** 配置全屏加载 */
  if (process.client && loading !== false) {
    config.loading = Loading.service({
      fullscreen: true,
      background: 'rgba(255,255,255,.3)',
      spinner: 'icon-custom-loading',
      lock: false
    })
  }

  // uuid
  if (process.client) {
    const uuid = Storage.getItem('uuid')
    config.headers['uuid'] = uuid
  }

  // 获取访问Token
  let accessToken = Storage.getItem('accessToken')
  if (accessToken && config.needToken) {
    // 如果前台为开发环境，后台API，则需要替换为下面的代码
    // process.env.NODE_ENV === 'development', 'production'
    if (process.env.NODE_ENV === 'production') {
      const uid = Storage.getItem('uid')
      const nonce = Foundation.randomString(6)
      const timestamp = parseInt(new Date().getTime() / 1000)
      const sign = md5(uid + nonce + timestamp + accessToken)
      const _params = { uid, nonce, timestamp, sign }
      let params = config.params || {}
      params = { ...params, ..._params }
      config.params = params
    } else {
      config.headers['Authorization'] = accessToken
    }
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
    if (process.server) return Promise.reject(error)
    await closeLoading(error)
    const error_response = error.response || {}
    const error_data = error_response.data || {}
    // 109 --> 没有登录、登录状态失效
    if (error_data.code === '109') {
      Vue.prototype.$message.error('您已被登出！')
      const { $store } = Vue.prototype.$nuxt
      $store.dispatch('cart/cleanCartStoreAction')
      $store.dispatch('user/removeUserAction')
      $store.dispatch('user/removeAccessTokenAction')
      $store.dispatch('user/removeRefreshTokenAction')
      return Promise.reject(error)
    }
    if (error.config.message !== false) {
      let _message = error.code === 'ECONNABORTED' ? '连接超时，请稍候再试！' : '网络错误，请稍后再试！'
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
  if (!target.config || !target.config.loading) return true
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      target.config.loading.close()
      resolve()
    }, 200)
  })
}

export const Method = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete'
}

export default function request(options) {
  // 如果是服务端或者是请求的刷新token，不需要检查token直接请求。
  if (process.server || options.url.indexOf('passport/token') !== -1) {
    return service(options)
  }
  return new Promise((resolve, reject) => {
    checkToken(options).then(() => {
      service(options).then(resolve).catch(reject)
    })
  })
}
