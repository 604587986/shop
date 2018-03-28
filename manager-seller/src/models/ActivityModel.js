/**
 * 活动相关模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

/** 活动模型 */
export class Activity extends DataModel {
  /** 活动ID */
  @ServerName('activity_id')
  activity_id

  /** 活动名称 */
  @ServerName('activity_name')
  activity_name

  /** 活动类型 */
  @ServerName('activity_type')
  activity_type

  /** 活动状态 */
  @ServerName('activity_status')
  activity_status

  /** 开始时间 */
  @ServerName('start_time')
  start_time

  /** 结束时间 */
  @ServerName('end_time')
  end_time

  /** 减价金额 */
  @ServerName('price_reduction')
  price_reduction

  /** 报名截止时间 */
  @ServerName('sign_end_time')
  sign_end_time

  /** 报名条件 */
  @ServerName('sign_condition')
  sign_condition
}
