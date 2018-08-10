import request from '@/utils/request'
import Storage from '@/utils/storage'
import { api } from '~/ui-domain'

/**
 * 退出账户
 * @returns {*}
 */
export function logout() {
  return request({
    url: `members/logout?uid=${Storage.getItem('uid')}`,
    method: 'post'
  })
}

/**
 * 获取用户信息
 */
export function getUserInfo() {
  return request({
    url: `members`,
    method: 'get'
  })
}

