/**
 * 短信网关模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class SmsGatewayModel extends DataModel {
  /** 短信网关代码 */
  @ServerName('code')
  code

  /** 短信网关配置 */
  @ServerName('config')
  config

  /** 短信网关ID */
  @ServerName('id')
  id

  /** 短信网关是否开启 */
  @ServerName('is_open')
  is_open

  /** 短信网关名称 */
  @ServerName('platform_name')
  name
}
