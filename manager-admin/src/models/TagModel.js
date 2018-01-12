/**
 * 标签模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class SpecModel extends DataModel {
  /** 标签ID */
  @ServerName('tag_id')
  id

  /** 标签名称 */
  @ServerName('tag_name')
  name

  /** 标签类型 */
  @ServerName('type')
  type

  /** 卖家ID */
  @ServerName('store_id')
  seller_id
}
