/**
 * 店铺幻灯片相关API
 */

import request from '@/utils/request'
import ShopSlideModel from '@/models/ShopSlideModel'

/**
 * 获取店铺幻灯片列表
 * @param params
 * @returns {Promise<any>}
 */
export function getShopSlideList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/shop/banner/list',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new ShopSlideModel().map(response)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 保存店铺幻灯片列表（更新操作）
 * @param params
 * @returns {Promise<any>}
 */
export function saveShopSlideList(params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/shop/banner',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}
