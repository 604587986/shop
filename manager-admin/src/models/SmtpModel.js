/**
 * Smtp模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class SmtpModel extends DataModel {
  /** HOST */
  @ServerName('host')
  host

  /** Smtp ID */
  @ServerName('brand_id')
  id

  /** 最后一次发送时间 */
  @ServerName('last_send_time')
  last_send_time

  /**  */
  @ServerName('mail_from')
  mail_from

  /** 最大可发信数 */
  @ServerName('max_count')
  max_count

  /** Open SSL */
  @ServerName('open_ssl')
  open_ssl

  /** 密码 */
  @ServerName('password')
  password

  /** 端口 */
  @ServerName('port')
  port

  /** 已发送数 */
  @ServerName('send_count')
  send_count

  /** 用户名 */
  @ServerName('username')
  username
}
