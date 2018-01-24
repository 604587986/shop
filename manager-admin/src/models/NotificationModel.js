/**
 * 站内通知模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class NotificationModel extends DataModel {
  /** 通知ID */
  @ServerName('msgid')
  id

  /** 通知标题 */
  @ServerName('title')
  title

  /** 通知内容 */
  @ServerName('content')
  content

  /** 发送时间 */
  @ServerName('sendtime')
  send_time

  /** 发送类型 [全站、指定会员] */
  @ServerName('sendtype')
  send_type

  /** 管理员ID */
  @ServerName('adminid')
  admin_id
}
