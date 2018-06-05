/**
 * 店铺相关API
 */

import request from '@/utils/request'

/**
 * 获取店铺列表
 * @param params
 * @returns {Promise<any>}
 */
export function getShopList(params) {
  return request({
    url: 'shops',
    method: 'get',
    loading: false,
    params
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
  return request({
    url: 'b2b2c/admin/shop/level-audit-list-json.do',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 审核店铺等级申请
 * @param id
 * @param status
 * @returns {Promise<any>}
 */
export function auditShopLevelApply(id, params) {
  return request({
    url: 'b2b2c/admin/shop/level-audit.do',
    method: 'post',
    data: params
  })
}

/**
 * 获取店铺模板列表
 * @param params
 * @returns {Promise<any>}
 */
export function getShopThemeList(params) {
  return request({
    url: 'shops/themes',
    method: 'get',
    loading: false,
    params
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
    data: params
  })
}

/**
 * 获取店铺模板详情
 * @param id
 * @returns {Promise<any>}
 */
export function getShopThemeDetail(id) {
  return request({
    url: `shops/themes/${id}`,
    method: 'get'
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
    data: params
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
