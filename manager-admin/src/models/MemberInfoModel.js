import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class MemberInfoModel extends DataModel {
  /**
   * 会员名称
   */
  @ServerName('username')
  username

  /**
   * 会员id
   */
  @ServerName('member_id')
  member_id

  /**
   * 性别
   * @type {number}
   */
  @ServerName('sex')
  sex = 1

  /**
   * 手机号
   */
  @Check(CheckTypes.mobile)
  @ServerName('mobile')
  mobile

  /**
   * 电子邮箱
   */
  @ServerName('email')
  email

  /**
   * 注册时间
   */
  @ServerName('create_time')
  create_time

  /**
   * 头像
   */
  @ServerName('avatar')
  avatar
}
