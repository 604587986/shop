/**
 * 储存方案模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class StorageSolutionModel extends DataModel {
  /** 储存方案配置 */
  @ServerName('config')
  config

  /** 储存方案参数配置项 */
  @ServerName('config_items')
  configItems

  /** 储存方案ID */
  @ServerName('id')
  id

  /** 储存方案码 */
  @ServerName('bean')
  code

  /** 储存方案名称 */
  @ServerName('name')
  name

  /** 储存方案是否已开启 */
  @ServerName('open')
  is_open
}
