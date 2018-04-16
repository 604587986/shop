/**
 * 用户信息相关API
 */

import request from '@/utils/request'

/**
 * 登录账户
 * @param params
 * @returns {Promise<any>}
 */
export function login(params) {
  return request({
    url: 'user/login',
    method: 'post',
    data: params
  })
}

/**
 * 退出账户
 * @returns {Promise<any>}
 */
export function logout() {
  return request({
    url: 'user/logout',
    method: 'post'
  })
}

/**
 * 获取当前登录的用户信息
 * @returns {Promise<any>}
 */
export function getUserInfo() {
  return request({
    url: 'user/info',
    method: 'get'
  })
}

/**
 * 保存用户信息
 * @param params
 * @returns {AxiosPromise}
 */
export function saveUserInfo(params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  return request({
    url: 'user/info',
    method: 'post',
    data: _formData
  })
}
