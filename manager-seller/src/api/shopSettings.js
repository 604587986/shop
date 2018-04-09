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
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/settings/shop/data',
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
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: `http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/settings/shop-data/${ids}`,
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}
