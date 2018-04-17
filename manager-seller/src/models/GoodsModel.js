/**
 * 商品模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class GoodsModel extends DataModel {
  /** 商品ID */
  @ServerName('goods_id')
  goods_id

  /** 商品图片 小图路径 */
  @ServerName('small')
  goods_image

  // /** 商品编号 */
  // @ServerName('goods_sn')
  // sn

  /** 商品名称 */
  @ServerName('goods_name')
  goods_name

  // /** 卖家名称 */
  // @ServerName('seller_name')
  // seller_name

  /** 商品价格 */
  @ServerName('price')
  goods_price

  /** 库存 */
  @ServerName('quantity')
  quantity

  /** 可用库存 */
  @ServerName('enable_quantity')
  enable_quantity

  /** 创建时间 */
  @ServerName('create_time')
  create_time

  /** 商品上架状态 */
  @ServerName('market_enable')
  market_enable

  // /** 商品品牌 */
  // @ServerName('brand_name')
  // brand_name

  /** 商品编号 货号 */
  @ServerName('sn')
  goods_sn

  /** 待发货数 */
  @ServerName('enable_quantity')
  deliver_goods_quantity
}
