/**
 * Created by andste.cc@gmail.com on 2018/7/15.
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
