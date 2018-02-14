/**
 * 快递平台模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class ExpressPlatformModel extends DataModel {
  /** 快递平台码 */
  @ServerName('code')
  code

  /** 平台配置 */
  @ServerName('config')
  config

  /** 快递平台ID */
  @ServerName('id')
  id

  /** 是否开启 */
  @ServerName('is_open')
  is_open

  /** 快递平台名称 */
  @ServerName('platform_name')
  name
}
