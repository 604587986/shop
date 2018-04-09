/**
 * 活动商品相关模型
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
  @ServerName('activity_id')
  activity_id

  /** 活动名称 */
  @ServerName('activity_name')
  activity_name

  /** 活动副标题 */
  @ServerName('activity_subname')
  activity_subname

  /** 商品ID */
  @ServerName('goods_id')
  goods_id

  /** 商品名称 */
  @ServerName('goods_name')
  goods_name

  /** 商品图片 */
  @ServerName('goods_image')
  goods_image

  /** 审核状态 */
  @ServerName('examine_status')
  examine_status

  /** 活动时间（开始时间） */
  @ServerName('start_time')
  start_time

  /** 结束时间 */
  @ServerName('end_time')
  end_time

  /** 驳回原因 */
  @ServerName('reject_reason')
  reject_reason

  /** 活动别名 */
  @ServerName('alias')
  alias

  /** 活动状态 */
  @ServerName('activity_status')
  activity_status

  /** 报名状态  1已报名 0未报名*/
  @ServerName('is_signed')
  is_signed
}

/** 限时活动详情 */
export class LimitTimeActivitydetails extends DataModel {
  /** 活动ID */
  @ServerName('activity_id')
  activity_id

  /** 活动名称 */
  @ServerName('activity_name')
  activity_name

  /** 活动副标题 */
  @ServerName('activity_subname')
  activity_subname

  /** 商品ID */
  @ServerName('goods_id')
  goods_id

  /** 商品名称 */
  @ServerName('goods_name')
  goods_name

  /** 商品图片 */
  @ServerName('goods_image')
  goods_image

  /** 审核状态 */
  @ServerName('examine_status')
  examine_status

  /** 活动时间（开始时间） */
  @ServerName('start_time')
  start_time

  /** 结束时间 */
  @ServerName('end_time')
  end_time

  /** 驳回原因 */
  @ServerName('reject_reason')
  reject_reason

  /** 活动别名 */
  @ServerName('alias')
  alias
}
