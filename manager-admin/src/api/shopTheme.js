/**
 * 店铺模板相关API
 */

import request from '@/utils/request'
import ShopThemeModel from '@/models/ShopThemeModel'

/**
 * 获取店铺模板列表
 * @param params
 * @returns {Promise<any>}
 */
export function getShopThemeList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'b2b2c/admin/store-themes/list-json.do',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new ShopThemeModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 添加店铺模板
 * @param params
 * @returns {Promise<any>}
 */
export function addShopTheme(params) {
  const _params = {
    name: params.name,
    path: params.path
  }
  const _formData = new FormData()
  Object.keys(_params).forEach(key => _formData.append(key, _params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: 'b2b2c/admin/store-themes/save-add.do',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 编辑店铺模板
 * @param id
 * @param params
 * @returns {Promise<any>}
 */
export function editShopTheme(id, params) {
  const _params = {
    id,
    name: params.name,
    path: params.path,
    is_default: params.is_default
  }
  const _formData = new FormData()
  Object.keys(_params).forEach(key => _formData.append(key, _params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: 'b2b2c/admin/store-themes/save-edit.do',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 删除店铺模板
 * @param ids
 * @returns {Promise<any>}
 */
export function deleteShopTheme(ids) {
  // if (!Array.isArray(ids)) ids = [ids]
  return new Promise((resolve, reject) => {
    request({
      url: 'b2b2c/admin/store-themes/delete.do',
      method: 'post',
      params: { id: ids }
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 以下为WAP接口
 */

/**
 * 获取店铺WAP模板列表
 * @param params
 * @returns {Promise<any>}
 */
export function getShopWapThemeList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'b2b2c/admin/wap/store-themes/list-json.do',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new ShopThemeModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 添加店铺WAP模板
 * @param params
 * @returns {Promise<any>}
 */
export function addShopWapTheme(params) {
  const _params = {
    name: params.name,
    path: params.path
  }
  const _formData = new FormData()
  Object.keys(_params).forEach(key => _formData.append(key, _params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: 'b2b2c/admin/wap/store-themes/save-add.do',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 编辑店铺WAP模板
 * @param id
 * @param params
 * @returns {Promise<any>}
 */
export function editShopWapTheme(id, params) {
  const _params = {
    id,
    name: params.name,
    path: params.path,
    is_default: params.is_default
  }
  const _formData = new FormData()
  Object.keys(_params).forEach(key => _formData.append(key, _params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: 'b2b2c/admin/wap/store-themes/save-edit.do',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 删除店铺WAP模板
 * @param ids
 * @returns {Promise<any>}
 */
export function deleteShopWapTheme(ids) {
  // if (!Array.isArray(ids)) ids = [ids]
  return new Promise((resolve, reject) => {
    request({
      url: 'b2b2c/admin/wap/store-themes/delete.do',
      method: 'post',
      params: { id: ids }
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}
