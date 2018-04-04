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

/** 优惠券模型 */
export class Coupon extends DataModel {
  /** 优惠券ID */
  @ServerName('coupon_id')
  coupon_id

  /** 优惠券名称 */
  @ServerName('coupon_name')
  coupon_name

  /** 优惠券面额（元） */
  @ServerName('coupon_denomination')
  coupon_denomination

  /** 使用限制（元） */
  @ServerName('coupon_use_limit')
  coupon_use_limit

  /** 使用时限  开始时间  */
  @ServerName('coupon_time_start')
  coupon_time_start

  /** 使用时限  结束时间  */
  @ServerName('coupon_time_end')
  coupon_time_end

  /** 发行量（个） */
  @ServerName('coupon_circulation')
  coupon_circulation

  /** 已使用量（个） */
  @ServerName('coupon_used_num')
  coupon_used_num
}
