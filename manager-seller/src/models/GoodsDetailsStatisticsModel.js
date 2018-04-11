/**
 * 商品详情分类模型
 */
import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class GoodsDetailsStatisticsModel extends DataModel {
  /** 商品D */
  @ServerName('goods_id')
  goods_id

  /** 商品名称 */
  @ServerName('goods_name')
  goods_name

  /** 商品价格 */
  @ServerName('goods_price')
  goods_price

  /** 近30天下单商品数 */
  @ServerName('order_goods_num')
  order_goods_num

  /** 近30天下单金额 */
  @ServerName('order_amount')
  order_amount
}

