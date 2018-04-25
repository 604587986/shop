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
    url: 'goods/list',
    method: 'get',
    params
  })
}
