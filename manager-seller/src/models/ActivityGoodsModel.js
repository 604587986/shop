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

/** 活动商品模型 */
export class ActivityGoods extends DataModel {
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

  /** 是否已报名（团购）  1已报名 0未报名*/
  @ServerName('is_signed')
  is_signed
}
