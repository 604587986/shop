/**
 * 消息设置模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class MessageSettingModel extends DataModel {
  /** 站内信内容 */
  @ServerName('content')
  site_content

  /** 邮件内容 */
  @ServerName('email_content')
  email_content

  /** 邮件是否开启 */
  @ServerName('email_state')
  email_is_open

  /** 邮件内容标题 */
  @ServerName('email_title')
  email_title

  /** 消息ID */
  @ServerName('id')
  id

  /** 站内信是否开启 */
  @ServerName('notice_state')
  site_is_open

  /** 短信内容 */
  @ServerName('sms_content')
  sms_content

  /** 短信是否开启 */
  @ServerName('sms_state')
  sms_is_open

  /** 消息代码码 */
  @ServerName('tpl_code')
  code

  /** 消息名称 */
  @ServerName('tpl_name')
  name

  /** 消息类型 */
  @ServerName('type')
  type
}
