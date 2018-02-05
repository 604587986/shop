/**
 * 导航菜单模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class SiteMenuModel extends DataModel {
  /** 导航菜单类型 */
  @ServerName('client_type')
  type

  /** 导航菜单图片 */
  @ServerName('image_path')
  image

  /** 导航菜单ID */
  @ServerName('menu_id')
  id

  /** 导航菜单名称 */
  @ServerName('name')
  name

  /** 导航菜单排序 */
  @ServerName('sort')
  order

  /** 导航菜单URL */
  @ServerName('url')
  url
}
