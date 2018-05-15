/**
 * 结算单模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class SettlementModel extends DataModel {
  /** 结算编号 */
  @ServerName('order_sn')
  order_sn

  /** 开始时间 */
  @ServerName('order_time')
  order_time

  /** 结束时间 */
  @ServerName('order_time')
  order_time

  /** 本期应收 */
  @ServerName('order_amount')
  order_amount

  /** 结算状态 */
  @ServerName('order_status')
  order_status

  /** 付款时间 */
  @ServerName('order_num')
  order_num
}
