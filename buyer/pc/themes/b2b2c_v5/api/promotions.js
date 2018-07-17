/**
 * Created by Andste on 2018/7/15.
 * 促销相关API
 */

import request, { Method } from '@/utils/request'

/**
 * 获取商品促销活动列表
 * @param goods_id
 */
export function getGoodsPromotions(goods_id) {
  return request({
    url: `promotions/${goods_id}`,
    method: Method.GET
  })
}

/**
 * 获取团购分类
 */
export function getGroupBuyCategorys() {
  return request({
    url: 'promotions/group-buy/cats',
    method: Method.GET
  })
}

/**
 * 获取团购商品
 * @param cat_id
 */
export function getGroupBuyGoods(cat_id) {
  return request({
    url: `promotions/group-buy/goods`,
    method: Method.GET
  })
}

/**
 * 获取团信息
 * @param gb_id
 */
export function getGroupBuyDetail(gb_id) {
  return request({
    url: `promotions/group-buy/active`,
    method: Method.GET
  })
}

/**
 * 获取店铺优惠券
 * @param seller_id
 */
export function getShopCoupons(seller_id) {
  return request({
    url: 'promotions/coupons',
    method: Method.GET,
    params: { seller_id }
  })
}
