/**
 * URL映射模型
 */

import {
  DataModel,
  Check,
  CheckTypes,
  ServerName,
  Unit,
  UnitTypes
} from '@/framework'

export default class URLMappingModel extends DataModel {
  /** 删除标记 */
  @ServerName('deleteflag')
  delete_flag

  /** 描述 */
  @ServerName('description')
  description

  /** HTTP缓存 */
  @ServerName('httpcache')
  http_cache

  /** URL映射ID */
  @ServerName('id')
  id

  /** 关键词 */
  @ServerName('keywords')
  keywords

  /** URL映射页面名称 */
  @ServerName('pagename')
  page_name

  /** URL映射路径 */
  @ServerName('path')
  path

  /** URL映射路径正则 */
  @ServerName('pattern')
  @Unit(UnitTypes.BREAK_OFF_BOTH_ENDS)
  path_regexp
}
