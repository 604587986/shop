/**
 * 团购商品相关模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

/** 团购商品列表模型 */
export class GroupBuyGoods extends DataModel {
  /** 活动ID */
  @ServerName('act_id')
  activity_id

  /** 活动/团购名称 */
  @ServerName('gb_name')
  activity_name

  /** 活动副标题 */
  @ServerName('gb_title')
  activity_subtitle

  /** 商品ID */
  @ServerName('goods_id')
  goods_id

  /** 商品名称 */
  @ServerName('goods_name')
  goods_name

  /** 团购图片 */
  @ServerName('img_url')
  group_buy_image

  /** 审核状态 */
  @ServerName('examine_status')
  examine_status

  /** 活动时间（开始时间） */
  @ServerName('add_time')
  start_time

  /** 结束时间 */
  @ServerName('end_time')
  end_time

  /** 活动别名 */
  @ServerName('remark')
  alias

  /** 活动状态 */
  @ServerName('gb_status')
  activity_status

  /** 团购状态  1已团购 0未团购*/
  @ServerName('is_signed')
  is_signed
}

/** 团购商品详情模型 */
export class GroupBuyDetails extends DataModel {
  /** 活动ID */
  @ServerName('act_id')
  activity_id

  // /** 活动名称 */
  // @ServerName('gb_name')
  // activity_name

  /** 团购名称 */
  @ServerName('gb_name')
  group_buy_name

  /** 团购副标题 */
  @ServerName('gb_title')
  group_buy_subtitle

  /** 团购商品ID */
  @ServerName('goods_id')
  goods_id

  /** 团购商品名称 */
  @ServerName('goods_name')
  goods_name

  /** 店铺价格 */
  @ServerName('original_price')
  shop_price

  /** 团购价格 */
  @ServerName('price')
  group_buy_price

  /** 团购图片 */
  @ServerName('img_url')
  group_buy_image

  /** 商品库存数 */
  @ServerName('goods_stock')
  goods_stock

  /** 商品总数 */
  @ServerName('goods_num')
  goods_summary

  /** 团购类别id */
  @ServerName('cat_id')
  group_buy_category

  /** 所属区域id */
  @ServerName('area_id')
  the_area

  /** 虚拟数量 */
  @ServerName('visual_num')
  goods_virtual

  /** 限购数量 */
  @ServerName('limit_num')
  goods_limit_buy

  /** 团购介绍 */
  @ServerName('remark')
  group_buy_intro
}

/** 团购活动模型 */
export class GroupBuyActivitys extends DataModel {
  /** 活动ID */
  @ServerName('activity_id')
  activity_id

  /** 活动描述  名称 + 时间段  */
  @ServerName('activity_desc')
  activity_desc
}
