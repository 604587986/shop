/**
 * 品牌模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class PointGoodsModel extends DataModel {
  /** 品牌名称 */
  @ServerName('brand_name')
  brand_name

  /** 分类名称 */
  @ServerName('category_name')
  category_name

  /** 创建名称 */
  @ServerName('create_time')
  create_time

  /** 商品库存 */
  @ServerName('enable_quantity')
  enable_quantity

  /** 商品ID */
  @ServerName('goods_id')
  goods_id

  /** 商品名称 */
  @ServerName('goods_name')
  goods_name

  /** 商品状态 */
  @ServerName('market_enable')
  goods_status

  /** 商品价格 */
  @ServerName('price')
  goods_price

  /** 商品可用库存 */
  @ServerName('quantity')
  quantity

  /** 店铺名称 */
  @ServerName('seller_name')
  shop_name

  /** 商品编号 */
  @ServerName('sn')
  goods_sn

  /** 排序 */
  @ServerName('sord')
  order

  /** 商品图片 */
  @ServerName('thumbnail')
  goods_image
}
