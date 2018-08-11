import request from '@/utils/request'
import Storage from '@/utils/storage'
import { api } from '~/ui-domain'

/**
 * 退出账户
 * @returns {*}
 */
export function logout() {
  return request({
    url: `${api.buyer}/members/logout?uid=${Storage.getItem('uid')}`,
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

/**
 * 获取用户角色权限
 * @param role_id
 * @returns {*}
 */
export function getUserRolesPermissions(role_id) {
  return request({
    url: `seller/shops/roles/${role_id}/checked`,
    method: 'get'
  })
}

