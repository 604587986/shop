/**
 * 团购分类模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class GroupBuyCategoryModel extends DataModel {
  /** 团购分类ID */
  @ServerName('catid')
  id

  /** 团购分类名称 */
  @ServerName('cat_name')
  name

  /** 团购分类排序 */
  @ServerName('cat_order')
  order

  /** 团购分类路径 */
  @ServerName('cat_path')
  path

  /** 团购分类上级ID */
  @ServerName('parentid')
  parent_id
}
