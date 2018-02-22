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
      url: 'core/admin/role/list-json.do',
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
