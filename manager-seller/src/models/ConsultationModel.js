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
  @ServerName('consultation_id')
  consultation_id

  /** 咨询内容 */
  @ServerName('consultation_content')
  consultation_content

  /** 咨询时间 */
  @ServerName('consultation_time')
  consultation_time

  /** 商品名称 */
  @ServerName('goods_name')
  goods_name

  /** 会员名称 */
  @ServerName('member_name')
  member_name

  /** 回复状态 */
  @ServerName('is_reply')
  is_reply

  /** 回复内容 */
  @ServerName('reply_content')
  reply_content
}
