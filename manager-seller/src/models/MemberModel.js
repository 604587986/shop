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

export default class MemberModel extends DataModel {
  /** 头像 */
  @ServerName('face')
  avatar

  /** 生日 */
  @ServerName('birthday')
  birthday

  /** 当前会员是否已被禁用 */
  @ServerName('disabled')
  disabled

  /** 电子邮箱 */
  @ServerName('email')
  email

  /** 会员名称 */
  @ServerName('uname')
  username

  /** 是否是卖家 */
  @ServerName('is_store')
  is_seller

  /** 最后登录时间 */
  @ServerName('lastlogin')
  last_login_time

  /** 本月登录次数 tm --> this month */
  @ServerName('logincount')
  login_count_tm

  /** 会员等级ID */
  @ServerName('lv_id')
  lv_id

  /** 会员等级 */
  @ServerName('lv_name')
  lv_name

  /** 会员ID */
  @ServerName('member_id')
  id

  /** 手机号 */
  @ServerName('mobile')
  mobile

  /** 账户名 */
  @ServerName('name')
  name

  /** 昵称 */
  @ServerName('nickname')
  nick_name

  /** 积分 */
  @ServerName('point')
  point

  /** QQ */
  @ServerName('qq')
  qq

  /** QQ开放平台openid */
  @ServerName('qq_id')
  qq_id

  /** 注册时间 */
  @ServerName('regtime')
  register_time

  /** 注册IP */
  @ServerName('registerip')
  register_ip

  /** 会员备注 */
  @ServerName('remark')
  remark

  /** 性别 */
  @ServerName('sex')
  sex = 1

  /** 店铺ID [如果没有店铺 为0] */
  @ServerName('store_id')
  seller_id

  /** 联系方式：固话 */
  @ServerName('tel')
  tel

  /** 微信开放平台openid */
  @ServerName('wechat_id')
  wechat_id

  /** 微博开放平台openid */
  @ServerName('weibo_id')
  weibo_id

  /** 邮编地址 */
  @ServerName('zip')
  zip
}