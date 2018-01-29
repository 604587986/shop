/**
 * 店铺模板模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class ShopThemeModel extends DataModel {
  /** 模板ID */
  @ServerName('id')
  id

  /** 模板名称 */
  @ServerName('name')
  name

  /** 模板路径 */
  @ServerName('path')
  path

  /** 是否为默认 */
  @ServerName('is_default')
  is_default
}
