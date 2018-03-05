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
  /** 储存方案配置项 */
  @ServerName('configItems')
  configItems

  /** 储存方案ID */
  @ServerName('id')
  id

  /** 储存方案码 */
  @ServerName('up_bean_id')
  code

  /** 储存方案名称 */
  @ServerName('up_name')
  name

  /** 储存方案是否已开启 */
  @ServerName('up_open')
  is_open
}
