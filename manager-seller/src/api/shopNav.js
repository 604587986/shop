/**
 * 店铺导航相关API
 */

import request from '@/utils/request'
import ShopNavModel from '@/models/ShopNavModel'

/**
 * 获取店铺导航列表
 * @param params
 * @returns {Promise<any>}
 */
export function getShopNavList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'http://www.andste.cc/mock/5aa72c080d9d060b4b99b45b/seller/shop/nav/list',
      method: 'get',
      loading: false,
      params
    }).then(response => {
      const _response = response
      _response.data = new ShopNavModel().map(response)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 添加店铺导航
 * @param params
 * @returns {Promise<any>}
 */
export function addShopNav(params) {
  const _formData = new FormData()
  Object.keys(params).forEach(key => _formData.append(key, params[key]))
  return new Promise((resolve, reject) => {
    request({
      url: 'b2b2c/admin/shop/dis-shop.do',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}
