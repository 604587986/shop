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
  return request({
    url: 'collection/goods/list',
    method: 'get',
    loading: false,
    message: false,
    params
  })
}

/**
 * 删除商品收藏
 * @param ids
 * @returns {Promise<any>}
 */
export function deleteGoodsCollection(ids) {
  if (Array.isArray(ids)) ids = ids.join(',')
  return request({
    url: `collection/goods/${ids}`,
    method: 'delete'
  })
}

/**
 * 获取店铺收藏
 * @param params
 * @returns {Promise<any>}
 */
export function getShopCollection(params) {
  return request({
    url: 'collection/shop/list',
    method: 'get',
    params
  })
}

/**
 * 删除店铺收藏
 * @param ids
 * @returns {Promise<any>}
 */
export function deleteShopCollection(ids) {
  if (Array.isArray(ids)) ids = ids.join(',')
  return request({
    url: `collection/shop/${ids}`,
    method: 'delete'
  })
}
