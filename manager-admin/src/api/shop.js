import request from '@/utils/request'
import ShopModel from '@/models/ShopModel'

/**
 * 获取店铺列表
 * @param params
 * @returns {Promise<any>}
 */
export function getShopList(params) {
  params.shop_disable = params.shop_status
  delete params.shop_status
  return new Promise((resolve, reject) => {
    request({
      url: 'b2b2c/admin/shop/shop-list-json.do',
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
 * 关闭店铺
 * @param ids
 * @returns {Promise<any>}
 */
export function closeShop(ids) {
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

/**
 * 恢复店铺
 * @param ids
 * @returns {Promise<any>}
 */
export function recoverShop(ids) {
  if (!Array.isArray(ids)) ids = [ids]
  const _formData = new FormData()
  ids.forEach(item => _formData.append('shopId', item))
  return new Promise((resolve, reject) => {
    request({
      url: 'b2b2c/admin/shop/use-shop.do',
      method: 'post',
      data: _formData
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}