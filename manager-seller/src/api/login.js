import request from '@/utils/request'
import { api } from '~/ui-domain'

/**
 * 退出账户
 * @returns {*}
 */
export function logout() {
  return request({
    url: `${api.buyer}/members/logout`,
    method: 'post'
  })
}

/**
 * 获取用户信息
 */
export function getUserInfo() {
  return request({
    url: `${api.buyer}/members`,
    method: 'get'
  })
}

