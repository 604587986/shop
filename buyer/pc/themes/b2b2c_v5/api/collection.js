/**
 * 收藏相关API
 */

import request from '@/utils/request'

/**
 * 获取商品收藏
 * @param params
 * @returns {Promise<any>}
 */
export function getGoodsCollection(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'collection/goods/list',
      method: 'get',
      loading: false,
      message: false,
      params
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 删除商品收藏
 * @param ids
 * @returns {Promise<any>}
 */
export function deleteGoodsCollection(ids) {
  if (Array.isArray(ids)) ids = ids.join(',')
  return new Promise((resolve, reject) => {
    request({
      url: `collection/goods/${ids}`,
      method: 'delete'
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 获取店铺收藏
 * @param params
 * @returns {Promise<any>}
 */
export function getShopCollection(params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'collection/shop/list',
      method: 'get',
      params
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}

/**
 * 删除店铺收藏
 * @param ids
 * @returns {Promise<any>}
 */
export function deleteShopCollection(ids) {
  if (Array.isArray(ids)) ids = ids.join(',')
  return new Promise((resolve, reject) => {
    request({
      url: `collction/shop/${ids}`,
      method: 'delete'
    }).then(response => resolve(response)).catch(error => reject(error))
  })
}
