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
    url: 'core/admin/userAdmin/list-json.do',
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
    url: 'http://www.andste.cc/mock/5aa72c250d9d060b4b99b466/admin/permission/role',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 添加角色
 * @param params
 */
export function addRole(params) {
  return request({
    url: 'http://www.andste.cc/mock/5aa72c250d9d060b4b99b466/admin/permission/role',
    method: 'get',
    data: params
  })
}

/**
 * 删除角色
 * @param id
 */
export function deleteRole(id) {
  return request({
    url: `http://www.andste.cc/mock/5aa72c250d9d060b4b99b466/admin/permission/role/${id}`,
    method: 'delete'
  })
}

/**
 * 获取角色具体权限
 * @param id
 */
export function getRolePermission(id) {
  return request({
    url: `http://www.andste.cc/mock/5aa72c250d9d060b4b99b466/admin/permission/role/${id}`,
    method: 'get'
  })
}

/**
 * 添加角色权限
 * @param params
 */
export function addRolePermission(params) {
  return request({
    url: 'http://www.andste.cc/mock/5aa72c250d9d060b4b99b466/admin/permission/role',
    method: 'post',
    data: params
  })
}

/**
 * 修改角色权限
 * @param id
 * @param params
 */
export function editRolePermission(id, params) {
  return request({
    url: `http://www.andste.cc/mock/5aa72c250d9d060b4b99b466/admin/permission/role/${id}`,
    method: 'post',
    data: params
  })
}

/**
 * 获取权限点列表
 * @param params
 */
export function getAuthList(params) {
  return request({
    url: 'core/admin/auth/list-json.do',
    method: 'get',
    loading: false,
    params
  })
}
