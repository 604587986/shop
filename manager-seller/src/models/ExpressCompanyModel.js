/**
 * 快递公司模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class ExpressCompanyModel extends DataModel {
  /** 快递公司ID */
  @ServerName('logistics_id')
  logistics_id

  /** 快递公司名称 */
  @ServerName('logistics_name')
  logistics_name

  /** 快递公司状态 */
  @ServerName('status')
  logistics_status
}
