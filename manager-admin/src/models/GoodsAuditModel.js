/**
 * 商品审核模型
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
  @Check(CheckTypes.Number)
  @ServerName('goods_id')
  id

  /** 商品图片 */
  @ServerName('thumbnail')
  image

  /** 商品编号 */
  @ServerName('sn')
  sn

  /** 卖家名称 */
  @ServerName('seller_name')
  seller_name

  /** 商品分类名称 */
  @ServerName('name')
  category_name

  /** 商品名称 */
  @ServerName('goods_name')
  name

  /** 商品上架状态 */
  @ServerName('market_enable')
  market_enable

  /** 商品品牌 */
  @ServerName('brand_name')
  brand_name

  /** 商品价格 */
  @Check(CheckTypes.Number)
  @ServerName('price')
  price
}
