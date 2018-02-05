/**
 * 导航栏相关API
 */

import request from '@/utils/request'
import SiteMenuModel from '@/models/SiteMenuModel'

/**
 * 获取导航栏 - PC
 * @param params
 */
export function getSiteMenuByPC(params) {
  return getSiteMenu(params, 'PC')
}

/**
 * 获取导航栏 - Mobile
 * @param params
 */
export function getSiteMenuByMobile(params) {
  return getSiteMenu(params, 'MOBILE')
}

/**
 * 获取导航栏
 * @param params
 * @param type
 * @returns {Promise<any>}
 */
function getSiteMenu(params, type) {
  params.clientType = type
  return new Promise((resolve, reject) => {
    request({
      url: 'core/admin/site-menu.do',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new SiteMenuModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 添加导航菜单 - PC
 * @param params
 * @returns {Promise<any>}
 */
export function addPCSiteMenu(params) {
  const _params = {
    name: params.name,
    url: params.url,
    client_type: 'PC'
  }
  const _formData = new FormData()
  Object.keys(_params).forEach(key => _formData.append(key, _params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: 'core/admin/site-menu.do',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 编辑导航菜单 - PC
 * @param id
 * @param params
 * @returns {Promise<any>}
 */
export function editPCSiteMenu(id, params) {
  const _params = {
    name: params.name,
    url: params.name,
    client_type: 'PC',
    sort: params.order,
    menu_id: id
  }
  const _formData = new FormData()
  Object.keys(_params).forEach(key => _formData.append(key, _params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: `core/admin/site-menu/${id}.do`,
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 删除导航菜单 - PC
 * @param id
 * @returns {Promise<any>}
 */
export function deletePCSiteMenu(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `core/admin/site-menu/${id}.do`,
      method: 'delete'
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 添加导航菜单 - Mobile
 * @param params
 * @returns {Promise<any>}
 */
export function addMobileSiteMenu(params) {
  const _params = {
    name: params.name,
    url: params.url,
    client_type: 'MOBILE',
    image_path: params.image
  }
  const _formData = new FormData()
  Object.keys(_params).forEach(key => _formData.append(key, _params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: 'core/admin/site-menu.do',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 编辑导航菜单 - Mobile
 * @param id
 * @param params
 * @returns {Promise<any>}
 */
export function editMobileSiteMenu(id, params) {
  const _params = {
    name: params.name,
    url: params.url,
    client_type: 'MOBILE',
    sort: params.order,
    menu_id: id,
    image_path: params.image
  }
  const _formData = new FormData()
  Object.keys(_params).forEach(key => _formData.append(key, _params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: `core/admin/site-menu/${id}.do`,
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 删除导航菜单 - Mobile
 * @param id
 * @returns {Promise<any>}
 */
export function deleteMobileSiteMenu(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `core/admin/site-menu/${id}.do`,
      method: 'delete'
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}
