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
    url: 'http://www.andste.cc/mock/5aab2c100d9d060b4b99b47f/buyer/collection/goods/list',
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
    url: `http://www.andste.cc/mock/5aab2c100d9d060b4b99b47f/buyer/collection/goods/${goods_id}`,
    method: 'post'
  })
}

/**
 * 删除商品收藏
 * @param ids 商品ID【集合或单个商品ID】
 * @returns {AxiosPromise}
 */
export function deleteGoodsCollection(ids) {
  if (Array.isArray(ids)) ids = ids.join(',')
  return request({
    url: `http://www.andste.cc/mock/5aab2c100d9d060b4b99b47f/buyer/collection/goods/${ids}`,
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
    url: 'http://www.andste.cc/mock/5aab2c100d9d060b4b99b47f/buyer/collection/shop/list',
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
    url: `http://www.andste.cc/mock/5aab2c100d9d060b4b99b47f/buyer/collection/shop/${shop_id}`,
    method: 'post'
  })
}

/**
 * 删除店铺收藏
 * @param ids 店铺ID【集合或单个ID】
 * @returns {AxiosPromise}
 */
export function deleteShopCollection(ids) {
  if (Array.isArray(ids)) ids = ids.join(',')
  return request({
    url: `http://www.andste.cc/mock/5aab2c100d9d060b4b99b47f/buyer/collection/shop/${ids}`,
    method: 'delete'
  })
}
