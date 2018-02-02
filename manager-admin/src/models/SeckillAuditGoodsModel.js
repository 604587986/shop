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
  /** 申请ID */
  @ServerName('apply_id')
  apply_id

  /** 申请失败原因 */
  @ServerName('fail_reason')
  fail_reason

  /** 商品ID */
  @ServerName('goods_id')
  goods_id

  /** 商品名称 */
  @ServerName('goods_name')
  goods_name

  /** 限时抢购价 */
  @ServerName('price')
  seckill_price

  /** 限时抢购ID */
  @ServerName('seckill_id')
  seckill_id

  /** 店铺ID */
  @ServerName('shop_id')
  shop_id

  /** 店铺名称 */
  @ServerName('shop_name')
  shop_name

  /** sku_id */
  @ServerName('sku_id')
  sku_id

  /** 售空数量 */
  @ServerName('sold_quantity')
  seckill_quantity

  /** 限时抢购日期 */
  @ServerName('start_day')
  start_day

  /** 限时抢购状态 */
  @ServerName('status')
  seckill_status

  /** 限时抢购时间段 */
  @ServerName('time_line')
  time_line
}
