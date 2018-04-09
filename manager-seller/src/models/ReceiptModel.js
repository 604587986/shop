/**
 * 发票模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class ReceiptModel extends DataModel {
  /** 会员名称 */
  @ServerName('member_name')
  member_name

  /** 订单编号 */
  @ServerName('order_sn')
  order_sn

  /** 发票金额 */
  @ServerName('receipt_amount')
  receipt_amount

  /** 日期 */
  @ServerName('create_time')
  create_time

  /** 发票类型码 */
  @ServerName('receipt_type_code')
  receipt_type_code

  /** 发票抬头 */
  @ServerName('receipt_title')
  receipt_title

  /** 发票内容 */
  @ServerName('receipt_content')
  receipt_content

  /** 纳税人识别号 */
  @ServerName('ITIN')
  ITIN
}
