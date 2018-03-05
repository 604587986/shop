/**
 * 限时抢购模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class SeckillModel extends DataModel {
  /** 报名截止时间 */
  @ServerName('apply_end_time')
  apply_end_time

  /**  */
  @ServerName('is_apply')
  is_apply

  /** 限时抢购ID */
  @ServerName('seckill_id')
  id

  /** 限时抢购名称 */
  @ServerName('seckill_name')
  seckill_name

  /** 申请规则 */
  @ServerName('seckill_rule')
  seckill_rule

  /** 活动日期 */
  @ServerName('start_day')
  start_day

  /** 限时抢购状态 [文本] */
  @ServerName('status_text')
  status_text

  /** 限时抢购状态 */
  @ServerName('status_value')
  status
}
