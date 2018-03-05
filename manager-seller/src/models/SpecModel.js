/**
 * 规格模型
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
  /** 规格ID */
  @ServerName('spec_id')
  id

  /** 规格名称 */
  @ServerName('spec_name')
  name

  /** 规格备注 */
  @ServerName('spec_memo')
  memo

  /** 规格类型 */
  @ServerName('spec_type')
  type

  /** 规格排序 */
  @ServerName('spec_order')
  order

  /** 卖家ID */
  @ServerName('seller_id')
  seller_id
}
