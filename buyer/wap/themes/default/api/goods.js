/**
 * 商品相关API
 */

import request, { Method } from '@/utils/request'
import { api_dev } from '~/ui-domain'

const urlPrefix = process.server ? (api_dev.buyer + '/') : ''
/**
 * 获取商品详情
 * @param goods_id 商品ID
 * @returns {AxiosPromise}
 */
export function getGoods(goods_id) {
  return request({
    url: `${urlPrefix}goods/${goods_id}`,
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
    url: `${urlPrefix}goods/search`,
    method: Method.GET,
    loading: false,
    params
  })
}

/**
 * 获取商品选择器
 * @param params
 */
export function getGoodsSelector(params) {
  return request({
    url: `${urlPrefix}goods/search/selector`,
    method: Method.GET,
    params
  })
}

/**
 * 获取商品关键字对应商品数量
 * @param keyword
 */
export function getKeywordNum(keyword) {
  return request({
    url: `${urlPrefix}goods/search/words`,
    method: Method.GET,
    loading: false,
    params: { keyword }
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

/**
 * 获取商品分类
 * @param parent_id
 */
export function getCategory(parent_id = 0) {
  return request({
    url: `${urlPrefix}goods/categories/${parent_id}/children`,
    method: Method.GET,
    loading: false
  })
}
