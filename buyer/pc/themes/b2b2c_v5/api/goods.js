/**
 * 商品相关API
 */

import request, { Method } from '@/utils/request'

/**
 * 获取商品详情
 * @param goods_id 商品ID
 * @returns {AxiosPromise}
 */
export function getGoods(goods_id) {
  return request({
    url: `goods/${goods_id}`,
    method: Method.GET
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
    method: Method.GET,
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
    method: Method.GET
  })
}

/**
 * 获取商品sku列表
 * @param goods_id
 */
export function getGoodsSkus(goods_id) {
  return request({
    url: `goods/${goods_id}/skus`,
    method: Method.GET,
    loading: false
  })
}

/**
 * 获取商品咨询列表
 * @param goods_id
 * @param params
 */
export function getGoodsConsultations(goods_id, params) {
  return request({
    url: `goods/${goods_id}/asks`,
    method: Method.GET,
    loading: false,
    params
  })
}

/**
 * 获取商品评论列表
 * @param goods_id
 * @param params
 */
export function getGoodsComments(goods_id, params) {
  return request({
    url: `goods/${goods_id}/comments`,
    method: Method.GET,
    loading: false,
    params
  })
}

/**
 * 获取标签商品
 * @param seller_id 卖家id
 * @param mark      标签 hot：热卖 new：新品 recommend：推荐
 * @param num       获取个数
 */
export function getTagGoods(seller_id, mark = 'hot', num = 5) {
  return request({
    url: `goods/tags/${mark}/goods`,
    method: Method.GET,
    loading: false,
    params: {
      seller_id,
      mark,
      num
    }
  })
}
