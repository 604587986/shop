/**
 * 限时活动商品相关模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

/** 限时活动列表 */
export class LimitTimeActivitys extends DataModel {
  /** 活动ID */
  @ServerName('seckill_id')
  activity_id

  /** 活动名称 */
  @ServerName('seckill_name')
  activity_name

  /** 活动开始时间 */
  @ServerName('start_day')
  start_time

  /** 报名截止时间 */
  @ServerName('apply_end_time')
  sign_end_time

  /** 报名条件 */
  @ServerName('seckill_rule')
  sign_condition

  /** 报名状态   0未报名 1已报名 2已截止*/
  @ServerName('is_apply')
  is_signed
}

/** 限时活动详情 */
export class LimitTimeActivitydetails extends DataModel {
  /** 活动ID */
  @ServerName('seckill_id')
  seckill_id

  /** 活动名称 */
  @ServerName('seckill_name')
  seckill_name

  /** 申请规则 */
  @ServerName('seckill_rule')
  seckill_rule

  /** 申请状态 */
  @ServerName('seckill_status')
  seckill_status

  /** 活动时间 */
  @ServerName('start_day')
  start_day

  /** 截止报名时间 */
  @ServerName('apply_end_time')
  apply_end_time
}

/** 限时活动商品列表 */
export class LimitTimeGoodsList extends DataModel {
  /** 商品名称 */
  @ServerName('goods_name')
  goods_name

  /** 审核状态 */
  @ServerName('status')
  examine_status

  /** 活动开始时间 */
  @ServerName('start_day')
  start_time

  /** 驳回原因 */
  @ServerName('fail_reason')
  reject_reason
}

