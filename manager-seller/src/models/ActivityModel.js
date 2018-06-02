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
  @ServerName('fd_id')
  activity_id

  /** 活动名称/标题 */
  @ServerName('title')
  activity_name

  /** 活动状态 */
  @ServerName('disabled')
  activity_status

  /** 活动开始时间 */
  @ServerName('start_time')
  start_time

  /** 活动截止时间 */
  @ServerName('end_time')
  end_time

  /** 优惠门槛 */
  @ServerName('full_money')
  discount_threshold

  /** 是否减金额 */
  @ServerName('is_full_minus')
  isReduceCash

  /** 优惠减价金额 （满减）*/
  @ServerName('minus_value')
  reduce_cash

  /** 是否打折 */
  @ServerName('is_discount')
  isDiscount

  /** 打几折 */
  @ServerName('discount_value')
  discount_val

  /** 是否免邮费 */
  @ServerName('is_free_ship')
  freePostage

  /** 是否有优惠券 */
  @ServerName('is_send_bonus')
  isCoupon

  /** 优惠券id */
  @ServerName('bonus_id')
  couponId

  /** 是否有赠品 */
  @ServerName('is_send_gift')
  isGift

  /** 赠品id */
  @ServerName('gift_id')
  giftId

  /** 商品参与方式 全部商品1 部分商品2*/
  @ServerName('range_type')
  is_all_joined

  /** 活动描述/说明 */
  @ServerName('description')
  activity_desc

  /** 单品立减活动id */
  @ServerName('minus_id')
  activity_minus_id

  /** 单品立减金额 */
  @ServerName('single_reduction_value')
  price_reduction
}
