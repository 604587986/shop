/**
 * 商品审核模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class OrderModel extends DataModel {
  /** 订单ID */
  @Check(CheckTypes.Number)
  @ServerName('order_id')
  id

  /** 订单编号 */
  @ServerName('sn')
  order_sn

  /** 下单时间 */
  @ServerName('create_time')
  order_time

  /** 订单总额 */
  @ServerName('order_amount')
  order_amount

  /** 订单状态码 */
  @ServerName('order_status')
  order_status

  /** 订单状态 */
  @ServerName('order_status_text')
  order_status_text

  /** 付款状态码 */
  @ServerName('pay_status')
  pay_status

  /** 付款状态 */
  @ServerName('pay_status_text')
  pay_status_text

  /** (已)支付金额 */
  @ServerName('paymoney')
  paymoney

  /** 支付账号 */
  @ServerName('payment_account')
  payment_account

  /** 支付方式id */
  @ServerName('payment_method_id')
  payment_method_id

  /** 支付方式名称 [支付宝、微信支付...] */
  @ServerName('payment_name')
  payment_name

  /** 支付方式 ['online'、'cod']*/
  @ServerName('payment_type')
  payment_type

  /** 支付方式 [在线支付、货到付款...]*/
  @ServerName('payment_type_text')
  payment_type_text

  /** 支付时间 */
  @ServerName('payment_time')
  payment_time

  /** 需要支付金额 */
  @ServerName('need_pay_money')
  need_pay_money

  /** 是否需要发票 */
  @ServerName('need_receipt')
  need_receipt

  /** 发票类型 */
  @ServerName('receipt_type')
  receipt_type

  /** 发票抬头 */
  @ServerName('receipt_title')
  receipt_title

  /** 发票内容 */
  @ServerName('receipt_content')
  receipt_content

  /** 税号 */
  @ServerName('duty_invoice')
  duty_invoice

  /** 收货人姓名 */
  @ServerName('ship_name')
  ship_name

  /** 收货人手机号 */
  @ServerName('ship_mobile')
  ship_mobile

  /** 收货地址 - 省份 */
  @ServerName('ship_province')
  ship_province

  /** 收货地址 - 市级 */
  @ServerName('ship_city')
  ship_city

  /** 收货地址 - 县级 */
  @ServerName('ship_region')
  ship_region

  /** 收货地址 - 镇级 */
  @ServerName('ship_town')
  ship_town

  /** 收货地址 - 详细地址 */
  @ServerName('ship_addr')
  ship_addr

  /** 发货状态码 */
  @ServerName('ship_status')
  ship_status

  /** 发货状态 */
  @ServerName('ship_status_text')
  ship_status_text

  /** 发货时间 */
  @ServerName('ship_time')
  ship_time

  /** 快递单号 */
  @ServerName('ship_no')
  ship_no

  /** 卖家名称 */
  @ServerName('seller_name')
  seller_name

  /** 发货时间 */
  @ServerName('signing_time')
  signing_time

  /** 快递公司 */
  @ServerName('logi_name')
  logi_name

  /** 订单来源 [WAP、APP、PC]*/
  @ServerName('client_type')
  client_type
}
