/**
 * 产品模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class ProductModel extends DataModel {
  /** 产品ID */
  @Check(CheckTypes.Number)
  @ServerName('product_id')
  id

  /** 产品SN */
  @ServerName('product_sn')
  sn

  /** 商品ID */
  @ServerName('goods_id')
  goods_id

  /** 商品名称 */
  @ServerName('name')
  goods_name

  /** 商品图片 */
  @ServerName('goods_image')
  goods_image

  /** 商品重量 */
  @ServerName('goods_weight')
  goods_weight

  /** 购买数量 [在订单中有此参数] */
  @ServerName('num')
  num

  /** 分类ID */
  @ServerName('cat_id')
  category_id

  /** 产品价格 */
  @ServerName('purchase_price')
  price

  /** 小计 [在订单中有此参数] */
  @ServerName('subtotal')
  subtotal
}
