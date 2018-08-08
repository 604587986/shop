/**
 * Created by Andste on 2018/8/8.
 */

import request from '@/utils/request'

/**
 * 获取店员列表
 * @param params
 */
export function getShopAssistantList(params) {
  return request({
    url: 'shops/clerks',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 添加店员
 * @param params
 */
export function addShopAssistant(params) {
  return request({
    url: 'shops/clerks',
    method: 'post',
    data: params
  })
}

/**
 * 修改店员
 * @param id
 * @param params
 */
export function editShopAssistant(id, params) {
  return request({
    url: `shops/clerks/${id}`,
    method: 'put',
    data: params
  })
}

/**
 * 删除店员
 * @param id
 */
export function deleteShopAssistant(id) {
  return request({
    url: `shops/clerks/${id}`,
    method: 'delete'
  })
}

/**
 * 恢复店员
 * @param id
 */
export function recoveryShopAssistant(id) {
  return request({
    url: `shops/clerks/${id}/recovery`,
    method: 'put'
  })
}

/**
 * 获取角色列表
 * @param params
 */
export function getRoleList(params) {
  return request({
    url: 'shops/roles',
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
    url: 'shops/roles',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: params
  })
}

/**
 * 获取角色权限
 * @param id
 */
export function getRoleDetail(id) {
  return request({
    url: `shops/roles/${id}`,
    method: 'get'
  })
}

/**
 * 修改角色权限
 * @param id
 * @param params
 */
export function editRole(id, params) {
  return request({
    url: `shops/roles/${id}`,
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    data: params
  })
}

/**
 * 删除角色
 * @param id
 */
export function deleteRole(id) {
  return request({
    url: `shops/roles/${id}`,
    method: 'delete'
  })
}

