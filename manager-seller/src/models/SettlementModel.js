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
  @ServerName('bill_sn')
  bill_sn

  /** 开始时间 */
  @ServerName('start_time')
  start_time

  /** 结束时间 */
  @ServerName('end_time')
  end_time

  /** 本期应收 */
  @ServerName('price')
  bill_price

  /** 结算状态 */
  @ServerName('status')
  bill_status

  /** 付款时间 */
  @ServerName('pay_time')
  pay_time
}
