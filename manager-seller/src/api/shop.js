/**
 * 店铺相关API
 */

import request from '@/utils/request'
import ShopModel from '@/models/ShopModel'

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
      _response.data = new ShopModel().map(response)
      resolve(_response)
    }).catch(error => reject(error))
  })
}

/**
 * 关闭店铺
 * @param ids
 * @returns {Promise<any>}
 */
export function addShopNav(ids) {
  if (!Array.isArray(ids)) ids = [ids]
  const _formData = new FormData()
  ids.forEach(item => _formData.append('shopId', item))
  return new Promise((resolve, reject) => {
    request({
      url: 'b2b2c/admin/shop/dis-shop.do',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}
