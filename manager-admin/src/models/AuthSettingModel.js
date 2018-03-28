/**
 * 权限相关模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

/** 管理员模型 */
export class AdministratorModel extends DataModel {
  /**  权限列表 */
  @ServerName('authList')
  authList

  /** dateline */
  @ServerName('dateline')
  dateline

  /** fields */
  @ServerName('fields')
  fields

  /** founder */
  @ServerName('founder')
  founder

  /** password */
  @ServerName('password')
  password

  /** realname */
  @ServerName('realname')
  realname

  /** 备注 */
  @ServerName('remark')
  remark

  /** roleids */
  @ServerName('roleids')
  roleids

  /** siteid */
  @ServerName('siteid')
  siteid

  /** state */
  @ServerName('state')
  state

  /** userdept */
  @ServerName('userdept')
  userdept

  /** userid */
  @ServerName('userid')
  userid

  /** 用户名 */
  @ServerName('username')
  username

  /** userno */
  @ServerName('userno')
  userno
}

/** 角色模型 */
export class RoleModel extends DataModel {
  /** roleid */
  @ServerName('role_id')
  role_id

  /** 角色备注 */
  @ServerName('role_memo')
  role_memo

  /** 角色名称 */
  @ServerName('role_name')
  role_name
}

/** 权限模型 */
export class AuthsModel extends DataModel {
  /** actid */
  @ServerName('actid')
  id

  /** choose */
  @ServerName('choose')
  choose

  /** 权限名称 */
  @ServerName('name')
  name

  /** 具体权限点 */
  @ServerName('objvalue')
  values

  /** 权限类型 */
  @ServerName('type')
  type
}
