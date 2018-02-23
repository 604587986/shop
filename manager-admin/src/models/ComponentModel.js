/**
 * 组件模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class ComponentModel extends DataModel {
  /** 组件代码 */
  @ServerName('componentid')
  code

  /** 启用状态 */
  @ServerName('enable_state')
  enabled

  /** 组件ID */
  @ServerName('id')
  id

  /** 是否已安装 */
  @ServerName('install_state')
  installed

  /** 组件名称 */
  @ServerName('name')
  name
}
