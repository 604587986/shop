/**
 * 店铺相关API
 */

import request from '@/utils/request'
import ShopModel from '@/models/ShopModel'

/**
 * 获取店铺信息
 * @param params
 * @returns {Promise<any>}
 */
export function getShopData(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/shops',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response || {}
      _response.data = new ShopModel().map(response)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 保存店铺设置
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function saveShopSettings(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/shops',
      method: 'put',
      data: params
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 修改店铺库存预警数
 * @param params
 * @returns {Promise<any>}
 */
export function saveStockWarningNum(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/shops/warning-counts',
      method: 'put',
      data: params
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 提升店铺等级
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function promoteShopGrade(ids, params) {
  return new Promise((resolve, reject) => {
    request({
      url: `http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/settings/shop/grade/${ids}`,
      method: 'post',
      data: params
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 修改店铺logo
 * @param params
 * @returns {Promise<any>}
 */
export function updateShopLogo(params) {
  return new Promise((resolve, reject) => {
    request({
      url: '/shops/logos',
      method: 'put',
      data: params
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

