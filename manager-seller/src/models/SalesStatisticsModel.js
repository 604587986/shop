/**
 * 销售统计模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class SalesStatisticsModel extends DataModel {
  /** 订单编号 */
  @ServerName('order_sn')
  order_sn

  /** 买家 */
  @ServerName('buyer')
  buyer

  /** 下单时间 */
  @ServerName('order_time')
  order_time

  /** 订单总额 */
  @ServerName('order_amount')
  order_amount

  /** 订单状态 */
  @ServerName('order_status')
  order_status

  /** 下单量 */
  @ServerName('order_num')
  order_num
}
