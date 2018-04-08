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

  /** 活动开始时间 */
  @ServerName('start_time')
  start_time

  /** 活动结束时间 */
  @ServerName('end_time')
  end_time

  /** 优惠减价金额 （满减/单减）*/
  @ServerName('price_reduction')
  price_reduction

  /** 是否是全部商品参与  1是 0否*/
  @ServerName('is_all_joined')
  is_all_joined
}
