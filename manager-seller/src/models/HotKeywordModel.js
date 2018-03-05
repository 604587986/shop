/**
 * 热门关键字模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class HotKeywordModel extends DataModel {
  /** 添加时间 */
  @ServerName('add_time')
  create_time

  /** 分类ID */
  @ServerName('cat_id')
  category_id

  /** 分类名称 */
  @ServerName('cat_name')
  category_name

  /**  */
  @ServerName('hit')
  hit

  /**  */
  @ServerName('hot_searchword')
  hot_search_word

  /** 热门关键字ID */
  @ServerName('id')
  id

  /** 上一次更改时间 */
  @ServerName('lastmodified')
  last_modified

  /** 页面标题 */
  @ServerName('page_title')
  page_title

  /**  */
  @ServerName('site_code')
  site_code

  /** 排序 */
  @ServerName('sort')
  order

  /** 系统锁定 */
  @ServerName('sys_lock')
  sys_lock

  /** 关键字URL */
  @ServerName('url')
  url
}
