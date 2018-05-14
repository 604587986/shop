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
  /** 所属卖家ID  标签ID*/
  @ServerName('tag_id')
  tag_id

  /** 标签名字 */
  @ServerName('tag_name')
  name

  /** 关键字 */
  @ServerName('mark')
  mark
}

