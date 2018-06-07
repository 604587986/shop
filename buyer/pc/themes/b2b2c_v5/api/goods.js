/**
 * 商品相关API
 */

import request from '@/utils/request'

/**
 * 获取商品详情
 * @param goods_id 商品ID
 * @returns {AxiosPromise}
 */
export function getGoods(goods_id) {
  return request({
    url: `goods/${goods_id}`,
    method: 'get'
  })
}

/**
 * 获取商品列表
 * @param params
 * @returns {AxiosPromise}
 */
export function getGoodsList(params) {
  return request({
    url: 'http://www.andste.cc/mock/5aab2c100d9d060b4b99b47f/buyer/goods/list',
    method: 'get',
    params
  })
}

/**
 * 记录商品浏览次数
 * @param goods_id
 */
export function visitGoods(goods_id) {
  return request({
    url: `goods/${goods_id}/visit`,
    method: 'get'
  })
}

/**
 * 获取商品sku列表
 * @param goods_id
 */
export function getGoodsSkus(goods_id) {
  return request({
    url: `goods/${goods_id}/skus`,
    method: 'get',
    loading: false
  })
}
