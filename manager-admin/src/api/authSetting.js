/**
 * 权限管理相关API
 */

import request from '@/utils/request'
import * as AuthSettingModel from '@/models/AuthSettingModel'

/**
 * 获取管理员列表
 * @param params
 * @returns {Promise<any>}
 */
export function getAdmainistratorList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'core/admin/userAdmin/list-json.do',
      method: 'get',
      loaidng: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new AuthSettingModel.AdministratorModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 获取角色列表
 * @param params
 * @returns {Promise<any>}
 */
export function getRoleList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c250d9d060b4b99b466/admin/permission/role',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new AuthSettingModel.RoleModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 添加角色
 * @param params
 * @returns {Promise<any>}
 */
export function addRole(params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c250d9d060b4b99b466/admin/permission/role',
      method: 'get',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 删除角色
 * @param id
 * @returns {Promise<any>}
 */
export function deleteRole(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `http://www.andste.cc/mock/5aa72c250d9d060b4b99b466/admin/permission/role/${id}`,
      method: 'delete'
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 获取角色具体权限
 * @param id
 * @returns {Promise<any>}
 */
export function getRolePermission(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `http://www.andste.cc/mock/5aa72c250d9d060b4b99b466/admin/permission/role/${id}`,
      method: 'get'
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 添加角色权限
 * @param params
 * @returns {Promise<any>}
 */
export function addRolePermission(params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c250d9d060b4b99b466/admin/permission/role',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 修改角色权限
 * @param id
 * @param params
 * @returns {Promise<any>}
 */
export function editRolePermission(id, params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: `http://www.andste.cc/mock/5aa72c250d9d060b4b99b466/admin/permission/role/${id}`,
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 获取权限点列表
 * @param params
 * @returns {Promise<any>}
 */
export function getAuthList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'core/admin/auth/list-json.do',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new AuthSettingModel.AuthsModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}
