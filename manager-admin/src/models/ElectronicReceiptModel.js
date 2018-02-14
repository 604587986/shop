/**
 * 电子面单模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class ElectronicReceiptModel extends DataModel {
  /** 电子面单码 */
  @ServerName('bill_bean')
  code

  /** 电子面单配置 */
  @ServerName('bill_config')
  config

  /** 电子面单公司名称 */
  @ServerName('bill_name')
  name

  /** 电子面单ID */
  @ServerName('id')
  id

  /** 电子面单是否已启用 */
  @ServerName('is_open')
  is_open
}
