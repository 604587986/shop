/**
 * Created by laiyu on 2018/5/7.
 */

import Vue from 'vue'
import Storage from './storage'
import request from '@/utils/request'

/**
 * 检查token，存在以下几种情况：
 * 1. user/accessToken/refreshToken都不存在。
 *    表示用户没有登录，放行所有API
 * 2. 不存在accessToken，但是user/refreshToken存在。
 *    表示accessToken过期，需要重新获取accessToken
 * 3. accessToken和refreshToken都不存在，user存在。
 *    表示用户已被登出，这时需要需要清除vuex中user数据，以通知页面用户已登出。
 *    如果用户当前如果处于需要登录权限页面，会被自动导航到login页面。
 * @param options
 * @returns {Promise<any>}
 */
export default function checkToken(options) {
  // user
  const user = Storage.getItem('user')
  // 访问Token
  const accessToken = Storage.getItem('accessToken')
  // 刷新Token
  const refreshToken = Storage.getItem('refreshToken')
  // 获取store
  const { $store } = Vue.prototype.$nuxt
  // 返回异步方法
  return new Promise((resolve, reject) => {
    // 1. user/accessToken/refreshToken都没有，放行所有API。
    if (!user && !accessToken && !refreshToken) {
      console.log('user/accessToken/refreshToken都没有，放行所有API。')
      resolve()
      return
    }
    // 2. 不存在accessToken，但是user/refreshToken存在。
    if (!accessToken && user && refreshToken) {
      // 如果没有刷新token锁，需要刷新token
      // 如果有刷新token锁，则进入循环检测
      if (!window.__refreshTokenLock__) {
        console.log(options.url + ' | 这个请求，需要等待刷新token。')
        window.__refreshTokenLock__ = request({
          url: 'passport/token',
          method: 'post',
          data: { refersh_token: refreshToken }
        }).then(response => {
          $store.dispatch('user/setAccessTokenAction', response.accessToken)
          $store.dispatch('user/setRefreshTokenAction', response.refreshToken)
          window.__refreshTokenLock__ = null
          console.log(options.url + ' | 已拿到新的token。')
          resolve()
        }).catch(error => {})
      } else {
        if (options.dontCheckToken) {
          console.log(options.url + ' | 不需要检查token，直接通过...')
          resolve()
          return
        }
        console.log('进入循环检测...')
        // 循环检测刷新token锁，当刷新锁变为null时，说明新的token已经取回。
        function checkLock() {
          setTimeout(() => {
            console.log(options.url + ' | 是否已拿到新的token：', window.__refreshTokenLock__ === null)
            window.__refreshTokenLock__ === null ? resolve() : checkLock()
          }, 300)
        }
        checkLock()
      }
      return
    }
    // 3. accessToken和refreshToken都不存在，user存在。
    if (!accessToken && !refreshToken && user) {
      $store.dispatch('user/removeUserAction')
      $store.dispatch('user/removeAccessTokenAction')
      $store.dispatch('user/removeRefreshTokenAction')
      console.log('需要重新登录...')
      resolve()
      return
    }
    console.log('当前用户已登录...')
    resolve()
  })
}
