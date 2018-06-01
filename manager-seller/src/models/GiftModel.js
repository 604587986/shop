/**
 * 赠品相关模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

/** 赠品模型 */
export class Gift extends DataModel {
  /** 赠品ID */
  @ServerName('gift_id')
  gift_id

  /** 赠品名称 */
  @ServerName('gift_name')
  gift_name

  /** 赠品图片 */
  @ServerName('gift_img')
  gift_image

  /** 赠品价格 */
  @ServerName('gift_price')
  gift_price

  /** 实际库存 */
  @ServerName('actual_store')
  gift_real_stock

  /** 可用库存 */
  @ServerName('enable_store')
  gift_usable_stock

  /** 创建时间 */
  @ServerName('create_time')
  gift_creat_time
}
