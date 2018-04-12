/**
 * 热卖商品相关模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

/** 热卖商品列表 */
export class HotGoods extends DataModel {
  /** 商品ID */
  @ServerName('goods_id')
  goods_id

  /** 商品名称 */
  @ServerName('goods_name')
  goods_name

  /** 下单金额 */
  @ServerName('order_amount')
  order_amount

  /** 下单商品数 */
  @ServerName('order_goods_num')
  order_goods_num
}
