/**
 * Created by andste.cc@gmail.com on 2018/6/7.
 * 交♂易相关API
 */

import request, { Method } from '@/utils/request'

/**
 * 获取购物车列表
 * @param show_type 要显示的类型 all：全部 checked：已选中的
 */
export function getCarts(show_type = 'all') {
  return request({
    url: 'trade/carts',
    method: Method.GET,
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
    method: Method.POST,
    data: {
      sku_id,
      num,
      activity_id
    }
  })
}

/**
 * 更新购物车商品数量
 * @param sku_id
 * @param num
 */
export function updateSkuNum(sku_id, num = 1) {
  return request({
    url: `trade/carts/sku/${sku_id}`,
    method: Method.POST,
    data: { num }
  })
}

/**
 * 更新购物车货品选中状态
 * @param sku_id
 * @param checked
 */
export function updateSkuChecked(sku_id, checked = true) {
  return request({
    url: `trade/carts/sku/${sku_id}`,
    method: Method.POST,
    data: { checked }
  })
}

/**
 * 删除多个货品项
 * @param sku_ids
 */
export function deleteSkuItem(sku_ids) {
  return request({
    url: `trade/carts/${sku_ids}/sku`,
    method: Method.DELETE
  })
}

/**
 * 清空购物车
 */
export function cleanCarts() {
  return request({
    url: 'trade/carts',
    method: Method.DELETE
  })
}

/**
 * 设置全部货品为选中或不选中
 * @param checked
 */
export function checkAll(checked) {
  return request({
    url: 'trade/carts/checked',
    method: Method.POST,
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
    method: Method.POST,
    params: { checked }
  })
}

/**
 * 获取购物车总价
 */
export function getCartTotal() {
  return request({
    url: 'trade/carts/price',
    method: Method.GET,
    loading: false
  })
}

/**
 * 获取结算参数
 */
export function getCheckoutParams() {
  return request({
    url: 'trade/checkout-params',
    method: Method.GET,
    needToken: true
  })
}

/**
 * 设置收货地址ID
 * @param address_id
 */
export function setAddressId(address_id) {
  return request({
    url: `trade/checkout-params/addressId/${address_id}`,
    method: Method.POST,
    needToken: true
  })
}

/**
 * 设置支付类型
 * @param payment_type
 */
export function setPaymentType(payment_type = 'ONLINE') {
  return request({
    url: 'trade/checkout-params/payment-type',
    method: Method.POST,
    needToken: true,
    data: { payment_type }
  })
}

/**
 * 设置发票信息
 * @param params
 */
export function setRecepit(params) {
  params.duty_invoice = params.duty
  return request({
    url: 'trade/checkout-params/receipt',
    method: Method.POST,
    needToken: true,
    data: params
  })
}

/**
 * 设置送货时间
 * @param receive_time
 */
export function setReceiveTime(receive_time) {
  return request({
    url: 'trade/checkout-params/receive-time',
    method: Method.POST,
    needToken: true,
    data: { receive_time }
  })
}

/**
 * 设置订单备注
 * @param remark
 */
export function setRemark(remark) {
  return request({
    url: 'trade/checkout-params/remark',
    method: Method.POST,
    needToken: true,
    data: { remark }
  })
}

/**
 * 获取订单总价
 */
export function getOrderTotal() {
  return request({
    url: 'trade/orders/total',
    method: Method.GET,
    needToken: true
  })
}

/**
 * 创建订单
 */
export function createTrade() {
  return request({
    url: 'trade/orders/create',
    method: Method.POST,
    needToken: true
  })
}
