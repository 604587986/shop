/**
 * 店铺设置相关API
 */

import request from '@/utils/request'
import ShopSettingsModel from '@/models/ShopSettingsModel'

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
      const _response = response
      _response.data = new ShopSettingsModel().map(response)
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
