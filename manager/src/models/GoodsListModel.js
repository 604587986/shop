import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class GoodsListModel extends DataModel {
  /**
   * 商品图片
   * @type {string}
   */
  @ServerName('goods_image')
  image = ''

  /**
   * 商品编号
   * @type {string}
   */
  @ServerName('goods_sn')
  sn = ''

  /**
   * 卖家名称
   * @type {string}
   */
  @ServerName('seller_name')
  seller_name = ''

  /**
   * 商品名称
   * @type {string}
   */
  @ServerName('goods_name')
  name = ''

  /**
   * 商品分类名称
   * @type {string}
   */
  @ServerName('category_name')
  category_name = ''

  /**
   * 商品上架状态
   * @type {string}
   */
  @ServerName('market_enable')
  market_enable = ''

  /**
   * 商品品牌
   * @type {string}
   */
  @ServerName('brand_name')
  brand_name = ''

  /**
   * 商品价格
   * @type {number}
   */
  @Unit(UnitTypes.PRICE_UNIT_Y)
  @Check(CheckTypes.Money)
  @ServerName('goods_price')
  price = 0

  /**
   * 商品id
   * @type {number}
   */
  @Check(CheckTypes.Number)
  @ServerName('goods_id')
  id = 0
}
