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

export default class BrandModel extends DataModel {
  /**
   * 品牌Id
   */
  @ServerName('brand_id')
  id

  /**
   * 品牌名称
   */
  @ServerName('name')
  name

  /**
   * 品牌图片
   */
  @ServerName('logo')
  image

  /**
   * 品牌URL
   */
  @ServerName('url')
  url

  /**
   * 是否已禁用
   */
  @ServerName('disabled')
  disabled

  /**
   * 品牌概述
   */
  @ServerName('brief')
  brief

  /**
   * 品牌关键字
   */
  @ServerName('keywords')
  keywords

  /**
   * 订单数量
   */
  @ServerName('ordernum')
  order_num
}
