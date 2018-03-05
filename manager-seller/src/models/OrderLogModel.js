/**
 * 订单日志模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class OrderLogModel extends DataModel {
  /** 操作ID */
  @ServerName('log_id')
  id

  /** 操作人员 */
  @ServerName('op_name')
  name

  /** 操作时间 */
  @ServerName('op_time')
  time

  /** 详细操作 */
  @ServerName('message')
  content
}
