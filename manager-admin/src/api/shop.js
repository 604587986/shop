/**
 * 店铺相关API
 */

import request from '@/utils/request'
import ShopModel, { ShopThemeModel } from '@/models/ShopModel'
const shopModel = new ShopModel()
const shopThemeModel = new ShopThemeModel()

/**
 * 获取店铺列表
 * @param params
 * @returns {Promise<any>}
 */
export function getShopList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'shops',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      response.data = shopModel.map(response.data)
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 获取店铺详情
 * @param shop_id
 */
export function getShopDetail(shop_id) {
  return request({
    url: `shops/${shop_id}`,
    method: 'get'
  })
}

/**
 * 关闭店铺
 * @param shop_id
 */
export function closeShop(shop_id) {
  return request({
    url: `shops/disable/${shop_id}`,
    method: 'put'
  })
}

/**
 * 恢复店铺
 * @param shop_id
 */
export function recoverShop(shop_id) {
  return request({
    url: `shops/enable/${shop_id}`,
    method: 'put'
  })
}

/**
 * 修改审核店铺
 * @param shop_id
 * @param params
 */
export function editAuthShop(shop_id, params) {
  return request({
    url: `shops/${shop_id}`,
    method: 'put',
    data: params
  })
}

/**
 * 获取店铺等级申请列表
 * @param params
 * @returns {Promise<any>}
 */
export function getShopLevelApplyList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'b2b2c/admin/shop/level-audit-list-json.do',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new ShopModel().map(response.data)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 审核店铺等级申请
 * @param id
 * @param status
 * @returns {Promise<any>}
 */
export function auditShopLevelApply(id, status) {
  const _params = {
    storeId: id,
    store_level_apply_status: status
  }
  const _formData = new FormData()
  Object.keys(_params).forEach(key => _formData.append(key, _params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: 'b2b2c/admin/shop/level-audit.do',
      method: 'post',
      params: _params
      // data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 获取店铺模板列表
 * @param params
 * @returns {Promise<any>}
 */
export function getShopThemeList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'shops/themes',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      response.data = shopThemeModel.map(response.data)
      resolve(response)
    }).catch(error => reject(error))
  })
}

/**
 * 添加店铺模板
 * @param params
 * @returns {*}
 */
export function addShopTheme(params) {
  return request({
    url: 'shops/themes',
    method: 'post',
    data: shopThemeModel.params(params)
  })
}

/**
 * 获取店铺模板详情
 * @param id
 * @returns {Promise<any>}
 */
export function getShopThemeDetail(id) {
  return new Promise((resolve, reject) => {
    request({
      url: `shops/themes/${id}`,
      method: 'get'
    }).then(response => resolve(shopThemeModel.map(response))).catch(error => reject(error))
  })
}

/**
 * 修改店铺模板
 * @param id
 * @param params
 * @returns {*}
 */
export function editShopTheme(id, params) {
  return request({
    url: `shops/themes/${id}`,
    method: 'put',
    data: shopThemeModel.params(params)
  })
}

/**
 * 删除店铺模板
 * @param id
 * @returns {*}
 */
export function deleteShopTheme(id) {
  return request({
    url: `shops/themes/${id}`,
    method: 'delete'
  })
}
