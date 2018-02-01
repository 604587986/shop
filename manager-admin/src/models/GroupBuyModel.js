/**
 * 团购分类模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class GroupBuyModel extends DataModel {
  /** 团购活动ID */
  @ServerName('act_id')
  id

  /** 团购活动名称 */
  @ServerName('act_name')
  name

  /** 团购活动添加时间 */
  @ServerName('add_time')
 create_time

  /** 团购活动地区ID */
  @ServerName('area_id')
  area_id

  /** 团购活动商品购买量 */
  @ServerName('buy_num')
  buy_num

  /** 团购活动分类ID */
  @ServerName('cat_id')
  cat_id

  /** 团购活动结束时间 */
  @ServerName('end_time')
  end_time

  /** 团购ID */
  @ServerName('gb_id')
  group_buy_id

  /** 团购名称 */
  @ServerName('gb_name')
  group_buy_name

  /** 团购状态 */
  @ServerName('gb_status')
  group_buy_status

  /** 团购标题 */
  @ServerName('gb_title')
  group_buy_title

  /** 商品ID */
  @ServerName('goods_id')
  goods_id

  /** 商品名称 */
  @ServerName('goods_name')
  goods_name

  /** 商品数量 */
  @ServerName('goods_num')
  goods_num

  /** 商品图片 */
  @ServerName('img_url')
  goods_image

  /** 限制购买量 */
  @ServerName('limit_num')
  limit_num

  /** 商品原价 */
  @ServerName('original_price')
  original_price

  /** 商品价格 */
  @ServerName('price')
  price

  /** 商品产品ID */
  @ServerName('product_id')
  product_id

  /** 团购备注 */
  @ServerName('remark')
  group_buy_remark

  /** 商品店铺名称 */
  @ServerName('shop_name')
  shop_name

  /** 团购活动开始时间 */
  @ServerName('start_time')
  start_time

  /** 商品店铺ID */
  @ServerName('store_id')
  shop_id

  /** 商品缩略图 */
  @ServerName('thumbnail')
  goods_image_thumbnail

  /** 商品浏览量 */
  @ServerName('view_num')
  view_num
}
