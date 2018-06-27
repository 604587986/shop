/**
 * 权限管理相关API
 */

import request from '@/utils/request'

/**
 * 获取管理员列表
 * @param params
 */
export function getAdmainistratorList(params) {
  return request({
    url: 'systems/adminuser',
    method: 'get',
    loaidng: false,
    params
  })
}

/**
 * 获取角色列表
 * @param params
 */
export function getRoleList(params) {
  return request({
    url: 'systems/roles',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 删除角色
 * @param id
 */
export function deleteRole(id) {
  return request({
    url: `systems/roles/${id}`,
    method: 'delete'
  })
}

/**
 * 获取角色具体权限
 * @param id
 */
export function getRolePermission(id) {
  return request({
    url: `systems/roles/${id}`,
    method: 'get'
  })
}

/**
 * 添加角色
 * @param params
 */
export function addRole(params) {
  return request({
    url: 'systems/roles',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: params
  })
}

/**
 * 修改角色
 * @param id
 * @param params
 */
export function editRole(id, params) {
  return request({
    url: `systems/roles/${id}`,
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    data: params
  })
}
