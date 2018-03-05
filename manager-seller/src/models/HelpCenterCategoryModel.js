/**
 * 帮助中心分类模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class HelpCenterCategoryModel extends DataModel {
  /** 帮助中心分类ID */
  @ServerName('cat_id')
  id

  /** 分类排序 */
  @ServerName('cat_order')
  sort

  /** 分类路径 */
  @ServerName('cat_path')
  cat_path

  /** 子分类 */
  @ServerName('children')
  children

  /** 描述 */
  @ServerName('descript')
  descript

  /** 详情HTML */
  @ServerName('detail_html')
  detail_html

  /** 是否有子分类 */
  @ServerName('hasChildren')
  has_children

  /** HTML */
  @ServerName('html')
  html

  /** 帮助中心名称 */
  @ServerName('name')
  name

  /** 父分类ID */
  @ServerName('parent_id')
  parent_id
}
