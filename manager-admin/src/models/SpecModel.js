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
}
