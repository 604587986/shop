/**
 * Created by andste.cc@gmail.com on 2018/6/7.
 * 交♂易相关API
 */

import request from '@/utils/request'

/**
 * 获取购物车列表
 * @param show_type 要显示的类型 all：全部 checked：已选中的
 */
export function getCarts(show_type = 'all') {
  return request({
    url: 'trade/carts',
    method: 'get',
    needToken: true,
    loading: false,
    params: { show_type }
  })
}

/**
 * 添加货品到购物车
 * @param sku_id      产品ID
 * @param num         产品的购买数量
 * @param activity_id 默认参与的活动id
 */
export function addToCart(sku_id, num = 1, activity_id) {
  return request({
    url: 'trade/carts',
    method: 'post',
    params: {
      sku_id,
      num,
      activity_id
    }
  })
}

/**
 * 清空购物车
 */
export function cleanCarts() {
  return request({
    url: 'trade/carts',
    method: 'delete'
  })
}

/**
 * 设置全部货品为选中或不选中
 * @param checked
 */
export function checkAll(checked) {
  return request({
    url: 'trade/carts/checked',
    method: 'post',
    params: { checked }
  })
}

/**
 * 设置店铺内全部货品选中状态
 * @param shop_id
 * @param checked
 */
export function checkShop(shop_id, checked) {
  return request({
    url: `trade/carts/seller/${shop_id}`,
    method: 'post',
    params: { checked }
  })
}

/**
 * 获取购物车总价
 */
export function getTotal() {
  return request({
    url: 'trade/carts/total',
    method: 'get',
    loading: false
  })
}
