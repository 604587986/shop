/**
 * 用户相关API
 */

import request from '@/utils/request'

/**
 * 获取当前登录的用户信息
 * @returns {AxiosPromise}
 */
export function getUserInfo() {
  return request({
    url: `members`,
    method: 'get'
  })
}

/**
 * 保存用户信息
 * @param params
 * @returns {AxiosPromise}
 */
export function saveUserInfo(params) {
  return request({
    url: 'members',
    method: 'put',
    data: params
  })
}

/**
 * 登出
 * @returns {AxiosPromise}
 */
export function logout() {
  return request({
    url: `members/logout`,
    method: 'post'
  })
}
