/**
 * 日志相关模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

/** 消息模型 */
export class Logs extends DataModel {
  /** 日志ID */
  @ServerName('log_id')
  log_id

  /** 日志序号 */
  @ServerName('log_index')
  log_index

  /** 日志类型 */
  @ServerName('log_type')
  log_type

  /** 日志操作 */
  @ServerName('opera_name')
  opera_name

  /** 操作者 */
  @ServerName('operator')
  operator

  /** 操作时间 */
  @ServerName('opera_time')
  opera_time
}
