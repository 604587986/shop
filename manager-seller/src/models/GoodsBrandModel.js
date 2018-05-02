/**
 * 商品品牌相关模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class GoodsBrandModel extends DataModel {
  /** 商品品牌ID */
  @ServerName('brand_id')
  brand_id

  /** 商品品牌logo */
  @ServerName('logo')
  brand_logo

  /** 商品品牌名称 */
  @ServerName('name')
  brand_name
}
