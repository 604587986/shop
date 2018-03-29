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

  /** 商品名称 */
  @ServerName('goods_name')
  goods_name

  /** 商品图片 */
  @ServerName('goods_image')
  goods_image

  /** 审核状态 */
  @ServerName('examine_status')
  examine_status

  /** 活动时间 */
  @ServerName('start_time')
  start_time

  /** 驳回原因 */
  @ServerName('reject_reason')
  reject_reason

  /** 活动备注信息 */
  @ServerName('reject_reason')
  reject_reason
}
