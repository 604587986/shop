/**
 * 收藏相关API
 */

import request from '@/utils/request'

/**
 * 获取商品收藏
 * @param params
 * @returns {AxiosPromise}
 */
export function getGoodsCollection(params) {
  return request({
    url: 'members/collection/goods',
    method: 'get',
    loading: false,
    message: false,
    params
  })
}

/**
 * 收藏商品
 * @param goods_id 商品ID
 * @returns {AxiosPromise}
 */
export function collectionGoods(goods_id) {
  return request({
    url: 'members/collection/goods',
    method: 'post',
    data: { goods_id }
  })
}

/**
 * 删除商品收藏
 * @param ids 收藏ID【集合或单个商品ID】
 * @returns {AxiosPromise}
 */
export function deleteGoodsCollection(ids) {
  if (Array.isArray(ids)) ids = ids.join(',')
  return request({
    url: `members/collection/goods/${ids}`,
    method: 'delete'
  })
}

/**
 * 获取店铺收藏
 * @param params
 * @returns {AxiosPromise}
 */
export function getShopCollection(params) {
  return request({
    url: 'members/collection/shops',
    method: 'get',
    params
  })
}

/**
 * 收藏店铺
 * @param shop_id 店铺ID
 * @returns {AxiosPromise}
 */
export function collectionShop(shop_id) {
  return request({
    url: 'members/collection/shop',
    method: 'post',
    data: { shop_id }
  })
}

/**
 * 删除店铺收藏
 * @param id
 */
export function deleteShopCollection(id) {
  return request({
    url: `members/collection/shop/${id}`,
    method: 'delete'
  })
}
