/**
 * 咨询模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class ConsultationModel extends DataModel {
  /** 咨询ID */
  @ServerName('ask_id')
  consultation_id

  /** 咨询内容 */
  @ServerName('content')
  consultation_content

  /** 咨询时间 */
  @ServerName('create_time')
  consultation_time

  /** 商品名称 */
  @ServerName('goods_name')
  goods_name

  /** 会员/卖家名称 */
  @ServerName('member_name')
  member_name

  /** 回复状态 */
  @ServerName('reply_status')
  is_reply

  /** 审核状态 */
  @ServerName('status')
  auth_status

  /** 回复内容 */
  @ServerName('reply')
  reply_content
}
