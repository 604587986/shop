/**
 * 店铺相关API
 */

import request from '@/utils/request'

/**
 * 获取店铺信息
 * @param params
 * @returns {Promise<any>}
 */
export function getShopData(params) {
  return request({
    url: '/shops',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 保存店铺设置
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function saveShopSettings(params) {
  return request({
    url: '/shops',
    method: 'put',
    loading: false,
    data: params
  })
}

/**
 * 修改店铺库存预警数
 * @param params
 * @returns {Promise<any>}
 */
export function saveStockWarningNum(params) {
  return request({
    url: '/shops/warning-counts',
    method: 'put',
    loading: false,
    data: params
  })
}

/**
 * 提升店铺等级
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function promoteShopGrade(ids, params) {
  return request({
    url: `http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/settings/shop/grade/${ids}`,
    method: 'post',
    data: params
  })
}

/**
 * 修改店铺logo
 * @param params
 * @returns {Promise<any>}
 */
export function updateShopLogo(params) {
  return request({
    url: '/shops/logos',
    method: 'put',
    data: params
  })
}

