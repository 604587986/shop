/**
 * 会员信息模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class MemberInfoModel extends DataModel {
  /** 会员名称 */
  @ServerName('username')
  username

  /** 会员ID */
  @ServerName('member_id')
  member_id

  /** 性别 */
  @ServerName('sex')
  sex = 1

  /** 手机号 */
  @Check(CheckTypes.mobile)
  @ServerName('mobile')
  mobile

  /** 电子邮箱 */
  @ServerName('email')
  email

  /** 注册时间 */
  @ServerName('create_time')
  create_time

  /** 头像 */
  @ServerName('avatar')
  avatar
}
