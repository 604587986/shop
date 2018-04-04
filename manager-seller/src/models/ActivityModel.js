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

  /** 活动报名截止时间 */
  @ServerName('sign_end_time')
  sign_end_time

  /** 活动报名条件 */
  @ServerName('sign_condition')
  sign_condition

  /** 活动申请规则 */
  @ServerName('application_rules')
  application_rules

  /** （限时抢购用到）抢购阶段 */
  @ServerName('panic_buy')
  panic_buy

  /** 报名状态  1已报名 0未报名*/
  @ServerName('is_signed')
  is_signed

  /** 是否是全部商品参与  1是 0否*/
  @ServerName('is_all_joined')
  is_all_joined
}
