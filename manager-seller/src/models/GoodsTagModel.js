/**
 * 商品标签模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class GoodsTagModel extends DataModel {
  /** 商品标签ID */
  @ServerName('tag_id')
  id

  /** 商品标签名称 */
  @ServerName('tag_name')
  name
}

