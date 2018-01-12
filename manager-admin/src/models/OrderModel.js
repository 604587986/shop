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
  sn

  /** 下单时间 */
  @ServerName('create_time')
  order_time

  /** 订单总额 */
  @ServerName('order_amount')
  order_amount

  /** 收货人姓名 */
  @ServerName('ship_name')
  ship_name

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

  /** 发货状态码 */
  @ServerName('ship_status')
  ship_status

  /** 发货状态 */
  @ServerName('ship_status_text')
  ship_status_text

  /** 支付方式名称 [支付宝、微信支付...] */
  @ServerName('payment_name')
  payment_name

  /** 支付方式 [在线支付、货到付款...] */
  @ServerName('payment_type')
  payment_type

  /** 订单来源 [WAP、APP、PC]*/
  @ServerName('client_type')
  client_type
}
