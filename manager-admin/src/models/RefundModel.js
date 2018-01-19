/**
 * 退款单模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class RefundModel extends DataModel {
  /** 售后ID */
  @ServerName('id')
  id

  /** 退款账户类型码 */
  @ServerName('account_type')
  account_type

  /** 退款账户类型 */
  @ServerName('account_type_text')
  account_type_text

  /** 银行账户名 */
  @ServerName('bank_account_name')
  bank_account_name

  /**  */
  @ServerName('bank_account_number')
  bank_account_number

  /**  */
  @ServerName('bank_deposit_name')
  bank_deposit_name

  /**  */
  @ServerName('bank_name')
  bank_name

  /** 申请时间 */
  @ServerName('create_time')
  create_time

  /** 申请售后备注 */
  @ServerName('customer_remark')
  customer_remark

  /**  */
  @ServerName('finance_remark')
  finance_remark

  /** 会员ID */
  @ServerName('member_id')
  member_id

  /** 会员名称 */
  @ServerName('member_name')
  member_name

  /** 订单号单号 */
  @ServerName('order_sn')
  order_sn

  /**  */
  @ServerName('pay_order_no')
  pay_order_no

  /** 返还积分 */
  @ServerName('refund_point')
  refund_point

  /** 申请售后金额 */
  @ServerName('refund_price')
  refund_price

  /** 申请售后原因 */
  @ServerName('refund_reason')
  refund_reason

  /** 售后状态 [状态码] */
  @ServerName('refund_status')
  refund_status

  /** 售后状态 */
  @ServerName('refund_status_text')
  refund_status_text

  /** 申请退款方式 */
  @ServerName('refund_way')
  refund_way

  /**  */
  @ServerName('refuse_reason')
  refuse_reason

  /** 申请售后类型 */
  @ServerName('refuse_type')
  refuse_type

  /** 退款账户 */
  @ServerName('return_account')
  return_account

  /** 卖家店铺ID */
  @ServerName('seller_id')
  seller_id

  /** 卖家店铺名称 */
  @ServerName('seller_name')
  seller_name

  /** 卖家店铺备注 */
  @ServerName('seller_remark')
  seller_remark

  /** 售后单号 */
  @ServerName('sn')
  sn

  /** 交易单号 */
  @ServerName('trade_sn')
  trade_sn

  /** 库存备注 */
  @ServerName('warehouse_remark')
  warehouse_remark
}
