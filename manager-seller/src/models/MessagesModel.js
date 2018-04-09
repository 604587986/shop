/**
 * 消息相关模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

/** 消息模型 */
export class Messages extends DataModel {
  /** 消息ID */
  @ServerName('msg_id')
  msg_id

  /** 发送时间 */
  @ServerName('send_time')
  send_time

  /** 消息内容 */
  @ServerName('msg_content')
  msg_content

  /** 是否已读 */
  @ServerName('is_read')
  is_read
}
